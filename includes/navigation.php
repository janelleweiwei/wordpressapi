<?
//$_SERVER['DOCUMENT_ROOT']
//$_SERVER['HTTP_HOST']
// $data_nav = file_get_contents($base_url."wp-json/wp-api-menus/v2/menus/2");
// $nav_menu = json_decode($data_nav);
$nav_menu = getData("wp-json/wp-api-menus/v2/menus/1");
//$website_url = "/wnm618/WordpressAPI"; // if url path (example)
$website_url = "/aau/wnm618/wordpressapi";
$root_url = "https://".$_SERVER['HTTP_HOST'].$website_url;

$header = "wp-json/";
$hd = getData($header);
  
?>

<header>
  <nav class="navbar nav-pills topnav navbar-expand-sm navbar-light bg-light" id="myTopnav"  style="width: 100% z-index: 50000">
    <div class="container-fluid">
      <a class="navbar-brand" href="">
        <img id="nav-logo" src="<?= getData('/wp-json/be/v1/widgets')->{'media_image-2'}->instance->url;?>">
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent" style="justify-content: center;">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <?
        for($i=0; $i<count($nav_menu->items); $i++) {
          $page_type = "/".$nav_menu->items[$i]->object."/"; // page,post,category,custom
          if($page_type == '/page/') {$page_type = '/pge/';}
          if($page_type == '/custom/') {$page_type = '/#/';}  //change 11-16
          if($page_type == '/post/') {$page_type = '/pst/';}
          if(!isset($nav_menu->items[$i]->object_slug)) {
            $title = $nav_menu->items[$i]->title;
            $page_name = str_replace(" ", "-", strtolower($title));
          } else {
            $page_name = $nav_menu->items[$i]->object_slug;
          }
          if($page_type == '/#/') {$page_name = '';}   //change 11-16
            
          if(!isset($nav_menu->items[$i]->children)) {
            if($page_type=="/category/"){
              echo "<li class='nav-item'><a href='$root_url{$page_type}{$page_name}/{$nav_menu->items[$i]->object_id}'>{$nav_menu->items[$i]->title}</a></li>";
            } else {
              echo "<li class='nav-item'><a href='$root_url{$page_type}{$page_name}'>{$nav_menu->items[$i]->title}</a></li>";
            }
          } else { 
            if($page_type=="/category/"){
              echo "<li class='nav-item'><a href='$root_url{$page_type}{$page_name}/{$nav_menu->items[$i]->object_id}'>{$nav_menu->items[$i]->title}</a>";
            } else {
              echo "<li class='nav-item'><a href='$root_url{$page_type}{$page_name}/{$nav_menu->items[$i]->object_id}'>{$nav_menu->items[$i]->title}</a>";  
            }
            ?>
              <ul class="sub-menu">
            <?  for($e=0; $e<count($nav_menu->items[$i]->children); $e++) {
                $page_type = "/".$nav_menu->items[$i]->children[$e]->object."/"; // page,post,category,custom
                // echo "child page type: ", $page_type;
                if($page_type == '/page/') {$page_type = '/pge/';}
                if($page_type == '/post/') {$page_type = '/pst/';}
                if(!isset($nav_menu->items[$i]->children[$e]->object_slug)) {
                  $page_name = str_replace(" ", "-", $nav_menu->items[$i]->children[$e]->title);
                } else {
                  $page_name = $nav_menu->items[$i]->children[$e]->object_slug;
                }
                  if(!isset($nav_menu->items[$i]->children[$e]->children)){
                    if($page_type=="/category/"){
                        echo "<li class='nav-item'><a href='$root_url{$page_type}{$page_name}/{$nav_menu->items[$i]->children[$e]->object_id}'>{$nav_menu->items[$i]->children[$e]->title}</a></li>";
                      } else {
                        echo "<li class='nav-item'><a href='$root_url{$page_type}{$page_name}'>{$nav_menu->items[$i]->children[$e]->title}</a></li>";
                      }
                    } else { 
                      if($page_type=="/category/"){
                        echo "<li class='nav-item'><a href='$root_url{$page_type}{$page_name}/{$nav_menu->items[$i]->children[$e]->object_id}'>{$nav_menu->items[$i]->children[$e]->title}</a>";
                      } else {
                        echo "<li class='nav-item'><a href='$root_url{$page_type}{$page_name}/{$nav_menu->items[$i]->object_id}'>{$nav_menu->items[$i]->children[$e]->title}</a>";  
                      }
              ?>

                    <ul class="sub-sub-menu">
              <?      for($a=0; $a<count($nav_menu->items[$i]->children[$e]->children); $a++) {
                      $page_type = "/".$nav_menu->items[$i]->children[$e]->children[$a]->object."/"; // page,post,category,custom
                      if($page_type == '/page/') {$page_type = '/pge/';}
                      if($page_type == '/post/') {$page_type = '/pst/';}
                      if(!isset($nav_menu->items[$i]->children[$e]->children[$a]->object_slug)) {
                        $page_name = str_replace(" ", "-", $nav_menu->items[$i]->children[$e]->children[$a]->title);
                      } else {
                        $page_name = $nav_menu->items[$i]->children[$e]->children[$a]->object_slug;
                      }
                        echo "<li class='sub-nav-item'><a href='$root_url{$page_type}{<1page_name></1page_name>}'>{$nav_menu->items[$i]->children[$e]->children[$a]->title}</a></li>"; 
                    } // for 3rd ?>
                    </ul></li>
          <?        } // if  
              } // for 2nd ?>
                </ul></li>
        <?    } // if     

        } // for 1st

          ?>
        </ul>
      </div>
    </div>
  </nav>
</header>
