<? // DOCUMENT_ROOT

$base_url = "https://www.janelleweiwei.org/wordpress/";

function getData($pageId){ //posts and pages
  global $base_url;
  $file = file_get_contents($base_url.$pageId);
  $data = json_decode($file);
  return $data;
}

function printData($pageId){
  $page_data = getData($pageId)->content->rendered;
  echo $page_data;
}

//this is a heredoc - it allows you to include .js in .php

// echo <<<EOT
// <script>
// let page = "$template_type";
// let slug = "$slug";
// let catId = "$catId";
// </script>
// EOT;

?>
