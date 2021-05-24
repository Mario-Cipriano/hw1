<?php
if(isset($_POST['query'])){
    $api_key = 'VAijFBNfbGZNn47m8uXqGVAbZY9g8PEx';
    $api_endpoint= 'https://app.ticketmaster.com/discovery/v2/events.json';
    $curl=curl_init();
    $data=http_build_query(array("apikey"=>$api_key,"keyword"=>$_POST['query']));
    curl_setopt($curl, CURLOPT_RETURNTRANSFER,1);
    curl_setopt($curl,CURLOPT_URL,$api_endpoint."?".$data);
    $result=curl_exec($curl);
    echo $result;
    curl_close($curl);
    
}
?>