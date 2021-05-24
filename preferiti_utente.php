<?php
session_start();
//verifica se l'utente è loggato
if(!isset($_SESSION["username"])){
//vai al login
header("Location: login.php");
exit;
}
if(isset($_POST['title'])){
$contents=array();
$utenti=array();
$conn=mysqli_connect("localhost","root","","FiereItaliane") or die("Errore: ".mysqli_connect_error());
$titolo= mysqli_real_escape_string($conn,$_POST['title']);
$query1="SELECT Id from contenuti where titolo='".$titolo."' ";
$res1=mysqli_query($conn,$query1);
$contents=mysqli_fetch_assoc($res1);
$id_contenuto=$contents["Id"];
$username= mysqli_real_escape_string($conn,$_SESSION['username']);
$query2="SELECT Id from utente where Username='".$username."' ";
$res2=mysqli_query($conn,$query2);
$utenti=mysqli_fetch_assoc($res2);
$id_utente=$utenti["Id"];
$query3="INSERT INTO preferiti VALUES('$id_utente','$id_contenuto')";
$res3=mysqli_query($conn,$query3);
if($res3){
    echo 'caricamento riuscito';
} else echo 'caricamento non riuscito';
}

?>