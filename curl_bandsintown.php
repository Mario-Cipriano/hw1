<?php
if(isset($_POST['query'])){

    $api_endpoint= 'https://rest.bandsintown.com/artists/';
    $api_key='/events?app_id=foo';
    $curl=curl_init();
     
    curl_setopt($curl, CURLOPT_RETURNTRANSFER,1);
    curl_setopt($curl,CURLOPT_URL,$api_endpoint.$_POST['query'].$api_key);
   
    $result=curl_exec($curl);
    echo $result;
    curl_close($curl);
}
?>