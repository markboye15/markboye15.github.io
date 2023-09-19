<?php
$lobbyDetails = (isset($_POST['lobbyDetails'])) ? $_POST['lobbyDetails'] : '';
$sessionID = (isset($_POST['sessionID'])) ? $_POST['sessionID'] : '';

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

$matchDatails = fileGetContent('../database/_matchDetails.json');


foreach ($matchDatails as $ele) {
  if ($ele['sessionID'] == $sessionID) {
    array_push($matchDatails, $lobbyDetails);
    filePutContent('../database/_matchDetails.json', $matchDatails);
    print_r(json_encode($lobbyDetails));
  }
}
