<!DOCTYPE html>
<html lang="en">
<head>

  <?php 
  include_once "includes/functions.php";
  
  $header = "wp-json/";
  $hd = getData($header);?>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width"/>
  <title><?= $hd->name;?></title>
  <meta name="description" content="<?= $hd->description;?>"/>
  
  <script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
  <!-- <script src="https://cdn.rawgit.com/miowebdesigns/apptools/master/apptools.js"></script> -->
  <script src="/aau/wnm618/wordpressapi/js/functions.js"></script>

  <link rel="stylesheet" src="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.0/normalize.css">
  <link rel="stylesheet" href="/aau/wnm618/wordpressapi/css/style.css" type="text/css">

</head>
<body>
  <div class="container">
    <header>
      <div class="header-image-wrapper">
        <img class="header-logo" src="<?= getData('/wp-json/be/v1/widgets')->{'media_image-2'}->instance->url;?>" alt="<?= $hd->name;?> logo">
      </div>
      <div id=site-title>
        <h1 class="site-title"><?= $hd->name;?></h1>
        <h3><?= $hd->description;?></h3>
      </div>
      <?
        include_once('includes/navigation.php');
      ?>
    </header>

    <section id="main-content">
    </section>
  </div>
</body>