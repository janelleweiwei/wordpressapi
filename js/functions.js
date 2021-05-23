const db = {};
const base_url = "https://www.janelleweiwei.org/wordpress/";  // original wordpress website - json resource
const post_url = "https://"+window.location.hostname+"/aau/wnm618/wordpressapi/"; // where live site is
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


const postListTemplate = templater(o=>`
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


const postTemplate = templater(o=>`${o.content}`);


const singleTemplate = templater(o=>`
<div class="postImage">
  ${o.thumbnail}
</div>
<header class="entry-header">
  <h1 class="entry-title postTitle" style="color: #21759b;">
    ${o.title.rendered}
  </h1>
  <div class="postDate">${o.postDate}</div>
</header>
<div class="entry-content postContent">${o.content.rendered}</div>
`);


const sideBarTemplate = templater(o=>`
<div class="postTitle">
  <a href="${o.url_slug}">${o.title.rendered}</a>
</div>
`);


const printContentData = (pageUrl) => {
  
  getData(pageUrl,d=>{
    $(".featured-image").html(!d[0].better_featured_image?"":"<img src='"+d[0].better_featured_image.source_url+"'>");
    $("#content").html(d[0].content.rendered);
    $(".container").addClass(d[0].slug);
  });
}


const printPostsData = (pageUrl, catId) => { // loop through all posts
  
  getData(pageUrl,d=>{
    // console.log(pageUrl);
    let data = d.map(function(o,i,a){ // put info into array (object,index,array)
      o.postDate = o.date.substr(0,10); // grab first 10 characters of date/time 
      o.thumbnail = !o.better_featured_image?"":"<img src='"+o.better_featured_image.media_details.sizes.medium.source_url+"'>";
      o.url_slug = `${post_url}${"sngle"}/${o.slug}`; // set link url
      o.content = o.content.rendered;
      category = o.categories[0];
      return o;
    })
    add_class = "posts"; // add a class for each page specific
    $(".container").addClass(add_class);
    
    $('#content').html(postTemplate(data));

    showSidebarPosts("wp-json/wp/v2/posts/?categories="+category+"&_embed");  // get post data for sidebar
  });
  
}

const printPostData = (pageUrl, catId) => { // single post
  
  getData(pageUrl,d=>{

    let data = d.map(function(o,i,a){
      o.postDate = o.date.substr(0,10);
      o.thumbnail = !o.better_featured_image?"":"<img src='"+o.better_featured_image.source_url+"'>";
      category = o.categories[0];
      return o;
    })
    add_class = "single-post"; // add a class for each page specific
    $(".container").addClass(add_class);

    $('#content').html(singleTemplate(data))
    
    showSidebarPosts("wp-json/wp/v2/posts/?categories="+category+"&_embed");  // get post data for sidebar
  });
  
}

const showSidebarPosts = (pageUrl) => { // loop through all posts
  getData(pageUrl,d=>{
    let data = d.map(function(o,i,a){ // put info into array (object,index,array)
      o.url_slug = `${post_url}${"sngle"}/${o.slug}`; // set link url
      return o;
    })
    $('#sidebarContent').html(sideBarTemplate(data))
  });
  
}


// Document Ready
$(function(){  //****** start here ******
  let types = [/\/pge\/(.+)/, /\/pst\/(.+)/, /\/category\/(.+)\/(.+)/, /\/sngle\/(.+)/, /\/\#\/(.+)/] // check for data type using regular expressions
  if (types[0].test(location.pathname)) {
    [,slug] = types[0].exec(location.pathname);
    if (slug == "posts") {
      printPostsData("wp-json/wp/v2/posts/?_embed"); // get all post data regardless of category
    } else {
      printContentData("wp-json/wp/v2/pages/?slug="+slug);  // get page data
    }
  } else if (types[1].test(location.pathname)) {
    [,slug] = types[1].exec(location.pathname);
    printPostsData("wp-json/wp/v2/posts/?slug="+slug+"&_embed"); // get all post data by category
  } else if (types[2].test(location.pathname)) {
    [,cat,slug] = types[2].exec(location.pathname);
    printPostsData("wp-json/wp/v2/posts/?categories="+slug+"&_embed", slug); // get specific post data by category
  } else if(types[3].test(location.pathname)) {
    [,slug] = types[3].exec(location.pathname);
    printPostData("wp-json/wp/v2/posts/?slug="+slug+"&_embed", slug);  // get single post data
  } else if (types[4].test(location.pathname)) {
    // if dummy page do nothing
  } else {  // if home page is static otherwise need different default
    printContentData("wp-json/wp/v2/pages/?slug=about");
  }
});
