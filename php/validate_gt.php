<?php
session_start();

$total_scores = 0;
if(!isset($_GET["page"]))
{
  $page = $_GET["page"];
}else{
  $page = 0;
}
if(!isset($_GET["game_token"])){
  $gt = "null";
}else{
  $gt = $_GET["game_token"];
}
if(!isset($_SESSION["access_token"])){
  $access_token = "null";
}else{
  $access_token =   $_SESSION["access_token"];
}

if($access_token != "null"){
  $ch = curl_init($base_api_url."/game/getScoreBySession");
  $params = [
    'access_token' => $access_token,
    'game_token' => $gt
  ];

  curl_setopt($ch, CURLOPT_POST, 1);
  curl_setopt($ch, CURLOPT_POSTFIELDS, $params);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  $result = curl_exec($ch);
  $jsonData = json_decode($result);

  if($jsonData->status_code == "200")
  {
    $username = $jsonData->data->user_data->user_name;
    $total_scores  = $jsonData->data->score_data->total_score;
  }else{
  
  }
  curl_close($ch);

}


$ch2 = curl_init($base_api_url."/game/getScore/10/0");
curl_setopt($ch2, CURLOPT_RETURNTRANSFER, true);
$result2 = curl_exec($ch2);
$jsonData2 = json_decode($result2);
$leaderboardData = $jsonData2->data;
curl_close($ch2);

?>
