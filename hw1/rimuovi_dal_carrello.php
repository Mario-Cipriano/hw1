<?php
session_start();
$contents=array();
$utenti=array();
$conn=mysqli_connect("localhost","root","","FiereItaliane") or die("Errore: ".mysqli_connect_error());
$username= mysqli_real_escape_string($conn,$_SESSION['username']);
$query1="SELECT Id from utente where Username='".$username."' ";
$res1=mysqli_query($conn,$query1);
$utenti=mysqli_fetch_assoc($res1);
$id_utente=$utenti["Id"];
$titolo= mysqli_real_escape_string($conn,$_POST['title']);
$data=mysqli_real_escape_string($conn,$_POST['data']);
$query2="DELETE from carrello where Id='$id_utente' and titolo='$titolo' and data='$data'";
$res2=mysqli_query($conn,$query2);
if($res2){
    echo 'rimosso';
} else echo 'rimozione non riuscito';
?>