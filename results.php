<?php 
$results=array();
$conn=mysqli_connect("localhost","root","","FiereItaliane") or die("Errore: ".mysqli_connect_error());
$query="SELECT * from contenuti";
$res=mysqli_query($conn,$query);
while($row=mysqli_fetch_assoc($res)){
$results[]=$row;
}
echo json_encode($results);
mysqli_close($conn);
?>