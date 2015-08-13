<?php

include "api-key.php";

$url ='http://football-api.com/api/';
$action = $_GET['action'];

$fullUrl = $url . "?Action=$action&APIKey=$key";

if (array_key_exists('comp_id', $_GET)){
	$fullUrl .= '&comp_id=' . $_GET['comp_id'];
}

echo file_get_contents($fullUrl);

