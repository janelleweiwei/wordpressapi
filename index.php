<!DOCTYPE html>
<html lang="en">
<head>
  <title>Landing Page</title>
  <?php include "includes/meta.php"; ?>
</head>

<body class="blog custom-background wp-embed-responsive ehf-header ehf-footer ehf-template-twentytwelve ehf-stylesheet-twentytwelvechild custom-font-enabled single-author elementor-default elementor-kit-68">
  <?php
  /* 
  route for menu: /wp-json/wp-api-menus/v2/menus/2 
  route for posts: /wp-json/wp/v2/posts
  route for pages: /wp-json/wp/v2/pages 
  route for title and description: /wp-json
  route for widgets: /wp-json/be/v1/widgets
  route for sidebars: /wp-json/be/v1/sidebars
  route for post categories /wp/v2/posts/?categories=

  \n - newline
  \t - tab
  \r - return
  */  
  include('includes/navigation.php');

  ?>

  <div id="page" class="site" style="min-height: 100vh;">
    <div class="featured-image"></div>
    <div class="container">
      <div id="primary" class="site-content">
        <div id="content" role="main"></div>
      </div>
    </div>
    <?
    include("includes/sidebar.php");
    ?>
  </div>


  <?
  include("includes/footer.php"); 
  ?>

</body>
</html>