const db = {};
const base_url = "http://www.janelleweiwei.org/aau/wnm618/wordpress/";  // original wordpress website - json resource
const post_url = "http://"+window.location.hostname+"/school/wnm618/wordpressapi/"; // where live site is
const media_image = "media_image-2";



const getData = (url,callback) => {
	$.ajax({
		url:base_url + url,
		dataType:"json"
	})
	.done(callback);
}

const templater = f => a =>
	(Array.isArray(a)?a:[a])
	.reduce((r,o,i,a)=>r+f(o,i,a),'');

const postTemplate = templater(o=>`
<div class="postImage">
	${o.thumbnail}
</div>
<div class="postTitle">
	<a href="${o.url_slug}">${o.title.rendered}</a>
</div>
<div class="postDate">${o.postDate}</div>
<div class="postAuthor">${o.authorname}</div>
<div class="postExcerpt">${o.excerpt.rendered}</div>
`);

const singleTemplate = templater(o=>`
<div class="postImage">
	${o.thumbnail}
</div>
<div class="postTitle">
	<h2>${o.title.rendered}</h2>
</div>
<div class="postDate">${o.postDate}</div>
<div class="postAuthor">${o.authorname}</div>
<div class="postContent">${o.content.rendered}</div>
`);

const sideBarTemplate = templater(o=>`
<div class="postTitle">
	<a href="${o.url_slug}">${o.title.rendered}</a>
</div>
`);

// const templater = (template,data) => {
// 	console.log(data);
//     if(!template || !data) return template||'';
//     for(let key in data){
//         if(data.hasOwnProperty(key) === false) continue;
//         template = template.replace(RegExp('\\<%=\\s*' + key + '\\s*%>', 'g'), data[key]);
//     }
//     return template;
// }


// const showDataList = (a,s,t) =>
// 	$(t).html(
// 		a.reduce((r,o,i,a)=>{
// 			return r+templater(s,o);
// 		},'')
// 	);



const printContentData = (pageId) => {
	// console.log(base_url + pageId);
	getData(pageId,d=>{
		// featured_image = d[0].better_featured_image.source_url; 
		$(".featured-image").html(`<img src="${d[0].better_featured_image.source_url}">`);
		// page_data = d[0].content.rendered;
		$("#pageContent").html(d[0].content.rendered);
		// add_class = d[0].slug; // add a class for each page specific
		$(".container").addClass(d[0].slug);
		
		
	});
}


const printPostsData = (pageUrl, catId) => { // loop through all posts
	
	getData(pageUrl,function(d){
		// console.log(pageUrl);
		let data = d.map(function(o,i,a){ // put info into array (object,index,array)
			
			o.postDate = o.date.substr(0,10); // grab first 10 characters of date/time 
			o.thumbnail = !o.better_featured_image?"":"<img src='"+o.better_featured_image.media_details.sizes.medium.source_url+"'>";
			o.authorname = o._embedded.author[0].name;
			o.url_slug = `${post_url}${"sngle"}/${o.slug}`; // set link url
			category = o.categories[0];
			return o;
		})
		add_class = "posts"; // add a class for each page specific
		$(".container").addClass(add_class);
		
		// showDataList(
		// 	data,
		// 	$("#post-template").html(),
		// 	'#pageContent'
		// )
		$('#pageContent').html(postTemplate(data))

		showSidebarPosts("wp-json/wp/v2/posts/?categories="+category+"&_embed");  // get post data for sidebar
	});
	
}

const printPostData = (pageUrl, catId) => { // single post
	
	getData(pageUrl,function(d){

		let data = d.map(function(o,i,a){
			
			o.postDate = o.date.substr(0,10);
			o.thumbnail = !o.better_featured_image?"":"<img src='"+o.better_featured_image.source_url+"'>";
			o.authorname = o._embedded.author[0].name;
			category = o.categories[0];
			return o;
		})
		add_class = "single-post"; // add a class for each page specific
		$(".container").addClass(add_class);

		// showDataList(
		// 	data,
		// 	$("#single-template").html(),
		// 	'#pageContent'
		// )
		$('#pageContent').html(singleTemplate(data))
		// console.log(category);
		showSidebarPosts("wp-json/wp/v2/posts/?categories="+category+"&_embed");  // get post data for sidebar
	});
	
}

const showSidebarPosts = (pageUrl) => { // loop through all posts
	
	getData(pageUrl,function(d){

		let data = d.map(function(o,i,a){ // put info into array (object,index,array)
			o.url_slug = `${post_url}${"sngle"}/${o.slug}`; // set link url
			return o;
		})
		
		// showDataList(
		// 	data,
		// 	$("#sidebar-template").html(),
		// 	'#sidebarContent'
		// )
		$('#sidebarContent').html(sideBarTemplate(data))
	});
	
}











// When making multiple necessary calls, use a deferred promise to wait until all have finished before running any code.
// Keep the .done() arguments in the same order as the .when() arguments
// $.when(
// 	$.ajax({dataType:"json",url:base_url+"wp-json/"})
// )
// .fail(function(){
// 	console.log("failed",arguments);
// })
// .done(function(header) {
// 	db.header = header[0];

// 	console.log($(".footer"),db.footer.instance.content)

// 	$("#site-title").html(db.header.name);

// });


// Document Ready
$(function(){  //****** start here ******

	let types = [/\/pge\/(.+)/,/\/pst\/(.+)/,/\/category\/(.+)\/(.+)/,/\/sngle\/(.+)/,/\/\#\/(.+)/] // ???????
	// console.log(location.pathname);
	// console.log(types);
	if(types[0].test(location.pathname)) {
		[,slug] = types[0].exec(location.pathname);
		printContentData("wp-json/wp/v2/pages/?slug="+slug);  // get page data

	} else if(types[1].test(location.pathname)) {
		[,slug] = types[1].exec(location.pathname);
		printPostsData("wp-json/wp/v2/posts/?slug="+slug+"&_embed"); // get all post data by category

	} else if(types[2].test(location.pathname)) {
		[,cat,slug] = types[2].exec(location.pathname);
		printPostsData("wp-json/wp/v2/posts/?categories="+slug+"&_embed", slug); // get specific post data by category

	} else if(types[3].test(location.pathname)) {
		[,slug] = types[3].exec(location.pathname);
		printPostData("wp-json/wp/v2/posts/?slug="+slug+"&_embed", slug);  // get single post data

	} else if(types[4].test(location.pathname)) {
	// if dummy page do nothing

	} else {  // if home page is static otherwise need different default
		printContentData("wp-json/wp/v2/pages/?slug=about");
	}
});