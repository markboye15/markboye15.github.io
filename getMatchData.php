<?php

$sessionID = (isset($_POST['sessionID'])) ? $_POST['sessionID'] : '';
$player = (isset($_POST['player'])) ? $_POST['player'] : '';
$piece = (isset($_POST['piece'])) ? $_POST['piece'] : '';

function fileGetContent($url, $isDecode = true)
{
  $data = @file_get_contents($url);
  return json_decode($data, $isDecode);
  // return $data;
}

function filePutContent($url, $arr)
{
  file_put_contents($url, json_encode($arr));
  return true;
}

$matchDatails = fileGetContent('./_matchData.json');

foreach ($matchDatails as $data) {
  if ($data['sessionID'] == $sessionID) {
    if ($data['player1']['name'] == $player) {
      print_r($data['player1']['currentMove']) ;
    } else {
      print_r($data['player2']['currentMove']) ;
    }
  }
}
