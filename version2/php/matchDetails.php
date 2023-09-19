<?php
$sessionID = (isset($_POST['sessionID'])) ? $_POST['sessionID'] : '';
$userInfo = (isset($_POST['userInfo'])) ? $_POST['userInfo'] : '';

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


$matchDatailsArr = fileGetContent('../database/_matchDetails.json');
foreach ($matchDatailsArr as $ele) {
    if ($ele['sessionID'] == $sessionID) {
        print_r(json_encode($ele));
    }
}
