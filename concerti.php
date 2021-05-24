<?php
//Avvia la sessione
session_start();
//verifica se l'utente è loggato
if(!isset($_SESSION["username"])){
//vai al login
header("Location: login.php");
exit;
}
?>


<!DOCTYPE html>
<html>

<head>
    <meta charset='utf-8'>
    <meta http-equiv='X-UA-Compatible' content='IE=edge'>
    <title>Concerti</title>
    <meta name='viewport' content='width=device-width, initial-scale=1'>
    <link rel='stylesheet' type='text/css' media='screen' href='concerti.css'>
    <script src='concerti.js' defer></script>
</head>

<body>
    <header>
        <div id='overlay'>

        </div>
        <nav>
            <div id='flex-cont'>
                <img src='images/logo_small.png'>
                <a href='homepage.php'>Home</a>
                <a href='eventi_internazionali.php'>Eventi Internazionali</a>
                <a href='concerti.php'>Concerti</a>
                <div id="menu">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>

        </nav>

        <h1 class='titolo'>Concerti:</h1>
        <h3 class='sottotitolo'>Che aspetti! Cerca il tuo concerto:</h3>

    </header>


    <form>
        <h1>Ricerca Concerti</h1>
        <label>Inserisci nome artista:<input type='text' name='event' id='event'>
        <input type='submit' id='submit' value='Cerca'></label>
    </form>


    <article id="event-view">
    </article>

    <footer>
        <span>Mario Cipriano O46002221</span>
    </footer>

    <article id="modale" class="hidden">
    </article>




</body>

</html>

