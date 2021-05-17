var db = {};
	var base_url = "http://mioweb-test.com/school/wp.wordpress/";
	var post_url = "http://"+window.location.hostname+"/";
	var media_image = "media_image-2";

	// When making multiple necessary calls, use a deferred promise to wait until all have finished before running any code.
	// Keep the .done() arguments in the same order as the .when() arguments
	$.when(
		$.ajax({dataType:"json",url:base_url+"wp-json/be/v1/widgets/custom_html-2"}),
		$.ajax({dataType:"json",url:base_url+"wp-json/"}),
		// $.ajax({dataType:"json",url:base_url+"wp-json/be/v1/widgets"})
		
	)
	.fail(function(){
		console.log("failed",arguments);
	})
	.done(function(footer,header,logoImage) {
		console.log(arguments)
		db.footer = footer[0];
		db.header = header[0];
		// db.logoImage = logoImage[0];

		console.log($(".footer"),db.footer.instance.content)

		setTimeout(function(){$(".footer").html(db.footer.instance.content);},300)
		$("#site-title").html(db.header.name);
   	 	// $("#site-description").html(db.header.description);

   	 	// $("#site-logo").attr({
   	 	// 	"src":db.logoImage[media_image].instance.url,
   	 	// 	"alt":db.header.name + ": "+ db.header.description
   	 	});



function getData(url,callback){ 
	
		$.ajax({
			url:base_url + url,
			dataType:"json"

		})
		.done(callback);
}

function printContentData(pageId){
	
	getData(pageId,function(d){
		page_data = d[0].content.rendered;
		$("#pageContent").html(page_data);
		add_class = d[0].slug; // add a class for each page specific
		$(".container").addClass(add_class);
		featured_image = d[0].better_featured_image.source_url; 
		$(".featured-image").html("<img src="+featured_image+">");
		
	});
}


$(function(){  //***** start here ******

	if(page=="page") {

		printContentData("wp-json/wp/v2/pages/?slug="+slug);  // get page data

	} else if(page=="category" || page=="post") {

		printPostsData("wp-json/wp/v2/posts/?categories="+catId+"&_embed"); // get all post data by category

	} else if(page=="single") {

		printPostData("wp-json/wp/v2/posts/?slug="+slug+"&_embed");  // get single post data

	}
});


function printPostsData(pageUrl){ // loop through all posts
	
	getData(pageUrl,function(d){

		var data = d.map(function(o,i,a){ // put info into array (object,index,array)
			
			o.postDate = o.date.substr(0,10); // grab first 10 characters of date/time 
			o.thumbnail = !o.better_featured_image?"":"<img src='"+o.better_featured_image.media_details.sizes.medium.source_url+"'>";
			o.authorname = o._embedded.author[0].name;
			o.url_slug = `${post_url}${"sngle"}/${o.slug}`; // set link url
			return o;
		})
		add_class = "posts"; // add a class for each page specific
		$(".container").addClass(add_class);
		showDataList(
			data,
			$("#post-template").html(),
			'#postContent'
		)
	});
	showSidebarPosts("wp-json/wp/v2/posts/?categories="+catId+"&_embed");  // get post data for sidebar
}

function printPostData(pageUrl){ // single post
	
	getData(pageUrl,function(d){

		var data = d.map(function(o,i,a){
			
			o.postDate = o.date.substr(0,10);
			o.thumbnail = !o.better_featured_image?"":"<img src='"+o.better_featured_image.source_url+"'>";
			o.authorname = o._embedded.author[0].name;
			category = o.categories[0];
			return o;
		})
		add_class = "single-post"; // add a class for each page specific
		$(".container").addClass(add_class);
		showDataList(
			data,
			$("#single-template").html(),
			'#singleContent'
		)
		showSidebarPosts("wp-json/wp/v2/posts/?categories="+category+"&_embed");  // get post data for sidebar
	});
	
}

function showSidebarPosts(pageUrl){ // loop through all posts
	
	getData(pageUrl,function(d){

		var data = d.map(function(o,i,a){ // put info into array (object,index,array)
			o.url_slug = `${post_url}${"sngle"}/${o.slug}`; // set link url
			return o;
		})

		showDataList(
			data,
			$("#sidebar-template").html(),
			'#sidebarContent'
		)
	});
	
}