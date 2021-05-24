<?php

session_start();
//verifica se l'utente è loggato
if(!isset($_SESSION["username"])){
//vai al login
header("Location: login.php");
exit;
}

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
$quantita= mysqli_real_escape_string($conn,$_POST['quantita']);
$query2="UPDATE carrello set quantita='$quantita' where Id='$id_utente' and titolo='$titolo' and data='$data'";
$res2=mysqli_query($conn,$query2);
if($res2){
    echo 'quantita aggiornata';
} else echo 'aggiornamento quantita non riuscito';
?>