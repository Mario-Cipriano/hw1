
<html>

<head>
    <meta charset='utf-8'> 
    <meta http-equiv='X-UA-Compatible' content='IE=edge'>
    <title>FiereItalia Mario Cipriano (O46002221)</title>
    <meta name='viewport' content='width=device-width, initial-scale=1'>
    <title>Login</title>
    <link rel='stylesheet' type='text/css' media='screen' href='login.css'>
    <script src='login.js' defer></script>
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&family=Roboto:ital,wght@0,500;1,300&display=swap" rel="stylesheet">
</head>

<body>


<article class='article-form'>
<div class='sfondo'>
 <img src='images/logo_large.png'>
</div>
<div class='form'>
<h1 class='titolo'>Accedi con il tuo account:</h1>
<form method='Post'>
    <label >Username:</label>
    <input type='text' name='username'></input>
    <label >Password:</label>
    <input type='password' name='password'></input>
    <input class='login' type='submit' name='login' value='Login'></input>
</form>

<label class='no-account'> Non hai un account? <a class='signup' href='signup.php'>Iscriviti</a></label>

<div id='controllo'>
<?php
//avvia sezione
session_start();
//Verifica l'accesso
if(isset($_SESSION["username"])){
    //vai alla homepage
    header("Location: homepage.php");
    exit;
}

//verifica esistenza dati 
if(isset($_POST["username"]) && isset($_POST["password"]))
{
//connessione DATABASE
$conn=mysqli_connect("localhost","root","","FiereItaliane") or die("Errore: ".mysqli_connect_error());
$username=mysqli_real_escape_string($conn,$_POST["username"]);
$password=mysqli_real_escape_string($conn,$_POST["password"]);
$hash_pass=hash('sha256', $password);
$pass_base64=base64_encode($hash_pass);
$query1="SELECT * from utente where username='".$username."' and password='".$pass_base64."'";
$res=mysqli_query($conn,$query1);
if(mysqli_num_rows($res)>0){
 $_SESSION["username"]=$_POST["username"];
 header( "Location: homepage.php");
exit;
}
else echo "credenziali non valide!";
}
?></div>
</div>
</article>



</body>

</html>



