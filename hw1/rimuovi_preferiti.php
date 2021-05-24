<?php 
session_start();
$conn=mysqli_connect("localhost","root","","FiereItaliane") or die("Errore: ".mysqli_connect_error());
$username= mysqli_real_escape_string($conn,$_SESSION['username']);
$query1="SELECT Id from utente where Username='".$username."'";
$res1=mysqli_query($conn,$query1);
$id_utenti=mysqli_fetch_assoc($res1);
$id_utente=$id_utenti['Id'];
$titolo= mysqli_real_escape_string($conn,$_POST['title']);
$query2="SELECT Id from contenuti where titolo='".$titolo."'";
$res2=mysqli_query($conn,$query2);
$id_titoli=mysqli_fetch_assoc($res2);
$id_titolo=$id_titoli['Id'];
$query3="DELETE FROM preferiti where id_utente=$id_utente and id_contenuto=$id_titolo";
$res3=mysqli_query($conn,$query3);
mysqli_close($conn);
?>




