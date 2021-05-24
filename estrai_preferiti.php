<?php
session_start();
$id_utenti=array();
$titoli_preferiti=array();
$conn=mysqli_connect("localhost","root","","FiereItaliane") or die("Errore: ".mysqli_connect_error());
$username= mysqli_real_escape_string($conn,$_SESSION['username']);
$query1="SELECT Id from utente where Username='".$username."' ";
$res1=mysqli_query($conn,$query1);
$id_utenti=mysqli_fetch_assoc($res1);
$id_utente=$id_utenti['Id'];
$query2="SELECT id_contenuto FROM preferiti where id_utente=$id_utente ";
$res2=mysqli_query($conn,$query2);
while($row=mysqli_fetch_assoc($res2)){
    $id_query=$row["id_contenuto"];
    $query3="SELECT immagine,titolo,settore FROM contenuti where Id=$id_query ";
    $res3=mysqli_query($conn,$query3);
    while($row2=mysqli_fetch_assoc($res3)){
        $titoli_preferiti[]=$row2;
    }
    }
    echo json_encode($titoli_preferiti);
    mysqli_close($conn);
?>













