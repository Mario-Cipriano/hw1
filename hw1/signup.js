function validazione(event) {
    const compilacampi = document.querySelector('#compilacampi');
    const pass1 = document.querySelector('#pass-corta');
    const pass2 = document.querySelector('#special-char');
    const confermapassword = document.querySelector('#confermapassword');
    compilacampi.classList.add('hidden');
    pass1.classList.add('hidden');
    pass2.classList.add('hidden');
    confermapassword.classList.add('hidden');
    if (form.username.value.length === 0 || form.password.value.length === 0) {
        compilacampi.classList.remove('hidden')
        event.preventDefault();
    }
    if (form.password.value.length < 8) {
        pass1.classList.remove('hidden');
        event.preventDefault();
    }

    if (!ck_pass.test(form.password.value)) {
        pass2.classList.remove('hidden');
        event.preventDefault();
    }

    if (form.confermapassword.value !== form.password.value) {
        confermapassword.classList.remove('hidden');
        event.preventDefault();
    }

    if (presente === true) {
        event.preventDefault();
    }
}


function fetchDB() {
    fetch("http://localhost/hw1/controllouser.php").then(onResponse).then(controlloUser);
}



function onResponse(response) {
    return response.json();
}



function controlloUser(json) {
    console.log(json);

    const usr = document.querySelector('#usrinuso');
    usr.classList.add('hidden');
    for (let nome of json) {
        if (form.username.value === nome.username) {
            presente = true;
            usr.classList.remove('hidden');
        }
    }
}

/*
function ErrorSignup(json) {
    fetch("http://localhost/hw1/controllouser.php").then(onResponse).then(ControlloErrori)
}

function ControlloErrori(json) {
    console.log(json);

}*/

let presente;
const form = document.querySelector('form')
    //form.addEventListener('submit', fetchDB)
    //form.addEventListener('submit', ErrorSignup)
const username = document.querySelector('.username')
username.addEventListener('keyup', fetchDB)



// Riferimento al form
const ck_pass = /[\,\#\@\%\&\!\£\=\-\_\+\-\.]/

// Aggiungi listener
form.addEventListener('submit', validazione);