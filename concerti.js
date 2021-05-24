const desc = []


function onJsonMusic(json) {
    console.log('json ricevuto')
    console.log(json)
    const music_view = document.querySelector('#event-view');
    music_view.innerHTML = '';
    if (json.length > 10) {
        json.length = 10;
    }

    const img_event = json[0].artist.image_url
    const name_event = json[0].artist.name

    for (let i = 0; i < json.length; i++) {
        const results = json[i];
        const image = img_event
        const name = name_event
        const country = results.venue.country
        const city = results.venue.city
        const luogo = results.venue.name
        const data_time = results.datetime
        const status = results.offers[0].status

        const descrizione = results.description
        desc.textContent = descrizione;

        const artist_event = document.createElement('div')
        artist_event.classList.add('music')
        const img = document.createElement('img')
        img.src = image
        const nome = document.createElement('span')
        nome.classList.add('title')
        nome.textContent = name
        const paese = document.createElement('span')
        paese.classList.add('paese');
        paese.textContent = country
        const citta = document.createElement('span')
        citta.classList.add('citta')
        citta.textContent = city
        const location = document.createElement('span')
        location.classList.add('luogo')
        location.textContent = luogo
        const data = document.createElement('span')
        data.classList.add('data')
        data.textContent = data_time
        const stato = document.createElement('span')
        stato.classList.add('event-status')
        stato.textContent = status;

        const des = document.createElement('button')
        des.classList.add('desc')
        des.textContent = 'descrizione'
        img.classList.add('immagine')

        music_view.appendChild(artist_event)
        artist_event.appendChild(img)
        artist_event.appendChild(nome)
        artist_event.appendChild(paese)
        artist_event.appendChild(citta)
        artist_event.appendChild(location)
        artist_event.appendChild(data)
        artist_event.appendChild(des)
        artist_event.appendChild(stato)

        // Aggiungiamo il div alla  sezione eventi

        des.addEventListener('click', ApriDescrizione)
        img.addEventListener('click', ApriModale);

    }
}
const modale = document.querySelector('#modale')

function onResponse(response) {
    console.log('Risposta ricevuta');
    return response.json();
}

function onError(error) {
    console.log('Error:' + error);
}

function search(event) {
    event.preventDefault();
    const evento = document.querySelector('#event');
    const event_value = encodeURIComponent(evento.value);
    console.log(event_value)
    const formData = new FormData();
    formData.append('query', event_value);
    fetch("http://localhost/hw1/curl_bandsintown.php", {
        method: "post",
        body: formData
    }).then(onResponse).then(onJsonMusic);
}




function ApriModale(event) {
    const immagine = document.createElement('img')
    immagine.src = event.target.src
    modale.appendChild(immagine);
    modale.classList.remove('hidden');
    document.body.classList.add('no-scroll');
    modale.addEventListener('click', ChiudiModale)
}

function ApriDescrizione() {
    console.log('descrizione')
    const descrizione = document.createElement('span')
        //const a = []
        //for (let x of q) {
        // if (event.target.parentNode.querySelector('.div-title h1').textContent === x.querySelector('.div-title h1').textContent) {
    descrizione.textContent = desc.textContent
        //} else descrizione.textContent = a.textContent
        //}
    modale.appendChild(descrizione);
    modale.classList.remove('hidden');
    document.body.classList.add('no-scroll');
    modale.addEventListener('click', RimuoviDescrizione);
}

function RimuoviDescrizione() {
    modale.classList.add('hidden')
    modale.querySelector('span').remove();
    document.body.classList.remove('no-scroll');

}

function ChiudiModale() {
    modale.classList.add('hidden')
    modale.querySelector('img').remove();
    document.body.classList.remove('no-scroll');
}



const form = document.querySelector('form');
form.addEventListener('submit', search)