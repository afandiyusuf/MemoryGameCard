<?php
session_start();

$ch = curl_init($base_api_url."/user/getData");
$access_token = "";

if(isset($_GET["access_token"]))
{
  $access_token = $_GET["access_token"];
  $_SESSION["access_token"] = $_GET["access_token"];
}else if(isset($_SESSION["access_token"]))
{
  $access_token = $_SESSION["access_token"];
}else{
  header('Location: '.$base_url);
}

$params = [
  'access_token' => $access_token
];

curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, $params);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$result = curl_exec($ch);
$jsonData = json_decode($result);

if($jsonData->status_code == "200")
{
  if(isset($_GET["access_token"])){
    header('Location: '.$base_url."/page/game.php");
  }
}else{
  header('Location: '.$base_url);
}
curl_close($ch);
?>
