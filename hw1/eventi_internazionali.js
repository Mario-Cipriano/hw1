function onEventJson(json) {
    console.log('Json ricevuto')
    console.log(json)
    const eventview = document.querySelector('#event-view');
    eventview.innerHTML = '';
    let num_results = json.page.totalElements;

    // Mostriamone al massimo 20 elementi
    if (num_results > 20)
        num_results = 20;
    for (let i = 0; i < num_results; i++) {
        //scansiono i risultati del json, max 20 elementi

        /*estraggo informazioni*/
        const doc = json._embedded.events[i]
        const title = doc.name;
        const data = doc.dates.start.dateTime;
        const images = doc.images;
        const country = doc.dates.timezone;
        const classification = doc.classifications[0].segment.name
        const cityname = doc._embedded.venues[0].city.name
            //per le immagini ho un vettore quindi per estrarle scansiono e prendo il primo risultato per ognuno ossia ratio'3_2'*/
        let selected_image = null;
        for (image of images) {
            if (image.ratio == '3_2')
                selected_image = image.url
        }

        // Creiamo il div che conterrà immagine e didascalia
        const event = document.createElement('div');
        event.classList.add('evento');
        // Creiamo l'immagine;
        const img = document.createElement('img');
        img.src = selected_image;
        // Creiamo la Descrizione di ogni evento;
        const span = document.createElement('span');
        span.textContent = title;
        span.classList.add('title')
        const data_time = document.createElement('span')
        data_time.classList.add('data')
        data_time.textContent = data;
        const zone = document.createElement('span')
        zone.classList.add('luogo')
        zone.textContent = country;
        const genere = document.createElement('span')
        genere.classList.add('genere')
        genere.textContent = classification;
        const city = document.createElement('span')
        city.classList.add('citta')
        city.textContent = cityname
        const carrello = document.createElement('img');
        carrello.src = 'images/carrello.png';
        carrello.classList.add('carrello');
        const add = document.createElement('img');
        add.src = 'images/add.png';
        add.classList.add('aggiungi');
        const remove = document.createElement('img');
        remove.src = 'images/remove.png';
        remove.classList.add('rimuovi');
        const div = document.createElement('div');
        div.classList.add('div-contenuto')
            // Aggiungiamo immagine e descrizione al div
        event.appendChild(img);
        event.appendChild(span);
        event.appendChild(div);
        div.appendChild(data_time);
        div.appendChild(remove);
        div.appendChild(carrello);
        div.appendChild(add);
        event.appendChild(zone);
        event.appendChild(genere);
        event.appendChild(city);
        // Aggiungiamo il div alla  sezione eventi
        eventview.appendChild(event);
    }
    const aggiungicarrello = document.querySelectorAll('.aggiungi');
    for (let aggiungo of aggiungicarrello) {
        aggiungo.addEventListener('click', AggiungiCarrello);
        aggiungo.addEventListener('click', InsertCarrello);
    }

    /* const rimuovicarrello = document.querySelectorAll('.rimuovi');
     for (let rimuovi of rimuovicarrello) {
         rimuovi.addEventListener('click', DecrementaQuantita);
     }*/
}


function onJson(text) {
    console.log(text);
}

function onResponse2(response) {
    console.log('Risposta ricevuta');
    return response.text();
}

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
    fetch("http://localhost/hw1/curl_ticketmaster.php", {
        method: "post",
        body: formData
    }).then(onResponse).then(onEventJson);
}


const articlecarrello = document.querySelector('.carrello-view');
const titoli = document.querySelectorAll('.title');
const section_carrello = document.querySelector('.section-carrello');
const div_carrello = document.querySelectorAll('.div-content')
const titolo_carrello = document.querySelector('.titolo_carrello');


let conteggio = 0;
const aggiungi = document.querySelectorAll('.aggiungi');
const cestino = document.querySelectorAll('.cestino');
let cont = 0;

function onJsonCarrello(json) {
    console.log(json);
    for (let contenuto of json) {

        const sectioncarrello = document.querySelector('.section-carrello');
        const divcontent = document.createElement('div');
        const img = document.createElement('img');
        const titolo = document.createElement('span');
        const data = document.createElement('span');
        const luogo = document.createElement('span')
        const quantita = document.createElement('span');
        const cestino = document.createElement('img')
        sectioncarrello.appendChild(divcontent)
        divcontent.appendChild(img)
        divcontent.appendChild(titolo)
        divcontent.appendChild(data)
        divcontent.appendChild(luogo)
        divcontent.appendChild(quantita)
        divcontent.appendChild(cestino)
        divcontent.classList.add('div-content')
        img.classList.add('img-event')
        quantita.classList.add('quantita')
        titolo.classList.add('titolo_carrello')
        data.classList.add('data_carrello')
        cestino.classList.add('cestino')
        img.src = contenuto.immagine
        titolo.textContent = contenuto.titolo
        data.textContent = contenuto.data
        quantita.textContent = contenuto.quantita;
        luogo.textContent = contenuto.luogo;
        cestino.src = 'images/cestino.png'

        articlecarrello.classList.remove('hidden');
        cestino.addEventListener('click', CestinaCarrello);
        cestino.parentNode.querySelector('.titolo_carrello').removeEventListener('click', AggiungiCarrello)
    }
}





fetch('http://localhost/hw1/estrai_carrello.php').then(onResponse).then(onJsonCarrello);


function CestinaCarrello(event) {
    const quantita = document.querySelectorAll('.quantita');
    const titolo = event.target.parentNode.parentNode.querySelector('.titolo_carrello').textContent;

    const data = event.target.parentNode.querySelector('.data_carrello').textContent;
    event.target.parentNode.classList.add('hidden');
    for (let quantity of quantita) {
        const formData = new FormData();
        formData.append('title', titolo);
        formData.append('data', data);
        formData.append('quantita', quantity.textContent)
        fetch("http://localhost/hw1/rimuovi_dal_carrello.php", {
            method: "post",
            body: formData
        }).then(onResponse2).then(onJson);
    }
}

function RimuoviHiddenDiv(event) {
    const quantita = document.querySelectorAll('.quantita');
    for (let quantity of quantita) {
        if (quantity.parentNode.querySelector('.titolo_carrello').textContent === event.target.parentNode.parentNode.querySelector('.title').textContent && quantity.parentNode.querySelector('.data_carrello').textContent === event.target.parentNode.querySelector('.data').textContent) {
            quantity.parentNode.classList.remove('hidden');

        }
    }
}

function DecrementaQuantita(event) {
    const quantita = document.querySelectorAll('.quantita');
    const titolo = event.target.parentNode.parentNode.querySelector('.title').textContent;
    const data = event.target.parentNode.querySelector('.data').textContent;
    for (let quantity of quantita) {
        if (quantity.parentNode.querySelector('.titolo_carrello').textContent === event.target.parentNode.parentNode.querySelector('.title').textContent && quantity.parentNode.querySelector('.data_carrello').textContent === event.target.parentNode.querySelector('.data').textContent) {
            conteggio = 0;
            quantity.textContent = conteggio;
            const formData = new FormData();
            formData.append('quantita', quantity.textContent);
            formData.append('title', titolo);
            formData.append('data', data);
            fetch("http://localhost/hw1/update_quantita.php", {
                method: "post",
                body: formData
            }).then(onResponse2).then(onJson);

            if (quantity.textContent === '0') {
                const formData = new FormData();
                formData.append('title', titolo);
                formData.append('data', data);
                fetch("http://localhost/hw1/rimuovi_dal_carrello.php", {
                    method: "post",
                    body: formData
                }).then(onResponse2).then(onJson);
                quantity.parentNode.classList.add('hidden');

            }

        }
    }
    event.target.parentNode.querySelector('.aggiungi').addEventListener('click', RimuoviHiddenDiv)
    event.target.parentNode.querySelector('.aggiungi').addEventListener('click', AggiungiCarrello)
}

function IncrementaQuantita(event) {
    const quantita = document.querySelectorAll('.quantita');
    const titolo = event.target.parentNode.parentNode.querySelector('.title').textContent;
    const data = event.target.parentNode.querySelector('.data').textContent;
    for (let quant of quantita) {
        if (quant.parentNode.querySelector('.titolo_carrello').textContent === event.target.parentNode.parentNode.querySelector('.title').textContent && quant.parentNode.querySelector('.data_carrello').textContent === event.target.parentNode.querySelector('.data').textContent) {

            quant.textContent = conteggio;
            const formData = new FormData();
            formData.append('quantita', quant.textContent);
            formData.append('title', titolo);
            formData.append('data', data);
            fetch("http://localhost/hw1/update_quantita.php", {
                method: "post",
                body: formData
            }).then(onResponse2).then(onJson);
        }
    }

}


function RimuoviEventListener(event) {
    conteggio++
    event.target.removeEventListener('click', AggiungiCarrello);
}

function AggiungiCarrello(event) {
    articlecarrello.classList.remove('hidden');
    for (let divcar of div_carrello) {
        console.log('ok')
        if (event.target.parentNode.parentNode.querySelector('.title').textContent === divcar.querySelector('.titolo_carrello').textContent && event.target.parentNode.querySelector('.data').textContent === divcar.querySelector('.data_carrello').textContent) {
            console.log('ok')
            event.target.removeEventListener('click', AggiungiCarrello);
        }
    }
    cont++;
    event.target.removeEventListener('click', AggiungiCarrello);
    conteggio = 1;
    /*for (let title of titoli) {
        if (title.textContent === event.target.parentNode.parentNode.querySelector('.title').textContent) {
            conteggio++;
        }
    }*/
    const sectioncarrello = document.querySelector('.section-carrello');
    const divcontent = document.createElement('div');
    const img = document.createElement('img');
    const titolo = document.createElement('span');
    const data = document.createElement('span');
    const luogo = document.createElement('span')
    const quantita = document.createElement('span');

    sectioncarrello.appendChild(divcontent)
    divcontent.appendChild(img)
    divcontent.appendChild(titolo)
    divcontent.appendChild(data)
    divcontent.appendChild(luogo)
    divcontent.appendChild(quantita)

    divcontent.classList.add('div-content')
    img.classList.add('img-event')
    quantita.classList.add('quantita')
    titolo.classList.add('titolo_carrello')
    data.classList.add('data_carrello')
    luogo.classList.add('luogo_carrello')
    img.src = event.target.parentNode.parentNode.querySelector('img').src
    titolo.textContent = event.target.parentNode.parentNode.querySelector('.title').textContent
    data.textContent = event.target.parentNode.querySelector('.data ').textContent
    luogo.textContent = event.target.parentNode.parentNode.querySelector('.luogo').textContent;
    quantita.textContent = conteggio;
    articlecarrello.classList.remove('hidden');
    event.target.addEventListener('click', RimuoviEventListener);
    event.target.addEventListener('click', IncrementaQuantita);
    event.target.parentNode.querySelector('.rimuovi').addEventListener('click', DecrementaQuantita);
}



function InsertCarrello(event) {
    const immagine = event.target.parentNode.parentNode.querySelector('img').src;
    const titolo = event.target.parentNode.parentNode.querySelector('.title').textContent;
    const quantita = conteggio;
    const data = event.target.parentNode.querySelector('.data').textContent;
    const luogo = event.target.parentNode.parentNode.querySelector('.luogo').textContent;
    const formData = new FormData();
    formData.append('immagine', immagine)
    formData.append('title', titolo);
    formData.append('data', data);
    formData.append('quantita', quantita);
    formData.append('luogo', luogo);
    fetch("http://localhost/hw1/carrello_utente.php", {
        method: "post",
        body: formData
    }).then(onResponse2).then(onJson);
    for (let aggiungo of aggiungi) {
        aggiungo.removeEventListener('click', InsertCarrello);
    }
}



/*event listener barra ricerca */
const form = document.querySelector('form');
form.addEventListener('submit', search)