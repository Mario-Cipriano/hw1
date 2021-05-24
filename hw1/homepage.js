const contenuto = document.querySelector('.event-view');

for (let i = 0; i < 9; i++) {
    const divcontent = document.createElement('div');
    const img = document.createElement('img');
    const div = document.createElement('div');
    const h1 = document.createElement('h1')
    const preferiti = document.createElement('img')
    const settore = document.createElement('h3')
    const paragrafo = document.createElement('p')
    const bottone1 = document.createElement('button')
    const bottone2 = document.createElement('button')




    contenuto.appendChild(divcontent)
    divcontent.appendChild(img)
    divcontent.appendChild(div)
    div.appendChild(h1)

    div.appendChild(preferiti)
    divcontent.appendChild(settore)
    divcontent.appendChild(paragrafo)
    divcontent.appendChild(bottone1)
    divcontent.appendChild(bottone2)


    /*classi*/
    divcontent.classList.add('evento')
    preferiti.classList.add('preferiti')
    img.classList.add('section-img')
    div.classList.add('div-titolo')
    settore.classList.add('settore')
    h1.classList.add('title')
    paragrafo.classList.add('paragrafo', 'hidden')
    bottone2.classList.add('second', 'hidden')
    bottone1.classList.add('first')

}

const images = []
const titles = []
const sectors = []

function InsertEvent(json) {
    console.log(json);
    const section = document.querySelectorAll('.evento')
    const SectionImg = document.querySelectorAll('.section-img')
    const path_img = document.querySelectorAll('.section-img');
    const path_titolo = document.querySelectorAll('.title');
    const path_preferiti = document.querySelectorAll('.preferiti');
    const path_settore = document.querySelectorAll('.settore');
    const path_button_first = document.querySelectorAll('.first');
    const path_descrizione = document.querySelectorAll('.paragrafo');
    const path_button_second = document.querySelectorAll('.second');

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < json.length; j++) {
            const docs = json[i];
            const img_event = docs.immagine;
            path_img[i].src = img_event;
            images[i] = docs.immagine;
            titles[i] = docs.titolo;
            sectors[i] = docs.settore;
            const title = docs.titolo;
            path_titolo[i].textContent = title;
            path_preferiti[i].src = 'images/icon-add.png';
            const sector = docs.settore;
            path_settore[i].textContent = sector;
            path_button_first[i].textContent = 'Mostra Più';
            const desc = docs.descrizione;
            path_descrizione[i].textContent = desc;
            path_button_second[i].textContent = 'Mostra Meno';
        }
    }

}

function onResponse(response) {
    return response.json();
}

fetch('http://localhost/hw1/results.php').then(onResponse).then(InsertEvent);
fetch('http://localhost/hw1/estrai_preferiti.php').then(onResponse).then(onJson2);
fetch('http://localhost/hw1/header.php').then(onResponse).then(InserisciHeader);
//Selettori
const favourite = document.querySelectorAll('.preferiti');
const title = document.querySelectorAll('.title');
const article1 = document.querySelector('.article1-preferiti');
const SelezionaMostrapiu = document.querySelectorAll('.first');
const SelezionaParagrafi = document.querySelectorAll('.paragrafo');
const SelezionaMostrameno = document.querySelectorAll('.second');
const modale = document.querySelector('.modale');


function RimuoviMostraPiu(event) {
    for (let i = 0; i < 9; i++) {
        if (SelezionaMostrapiu[i] === event.target) {
            SelezionaMostrapiu[i].classList.add('hidden')
            SelezionaParagrafi[i].classList.remove('hidden')
            SelezionaMostrameno[i].classList.remove('hidden')
        }
    }
}



function RimuoviMostraMeno(event) {
    for (let i = 0; i < 9; i++) {
        if ((SelezionaMostrameno[i] === event.target)) {
            SelezionaMostrapiu[i].classList.remove('hidden')
            SelezionaParagrafi[i].classList.add('hidden')
            SelezionaMostrameno[i].classList.add('hidden')
        }
    }
}



function onJson4(text) {
    console.log(text);
}


let cont = 0;


function RimuoviPreferiti(event) {
    cont--
    if (cont === 0) {
        article1.classList.add('hidden')
    }
    const rimuovi = event.target;
    rimuovi.parentNode.parentNode.classList.add('hidden')
    const titolo = rimuovi.parentNode.querySelector('h1');
    for (let i = 0; i < 9; i++) {
        if (titolo.textContent === title[i].textContent) {
            const img_section = title[i].parentNode.querySelector('.preferiti');
            img_section.src = 'images/icon-add.png'
            img_section.addEventListener('click', AggiungiPreferiti);
            const formData = new FormData();
            formData.append('title', titolo.textContent);
            fetch("http://localhost/hw1/rimuovi_preferiti.php", {
                method: "post",
                body: formData
            }).then(onResponse2).then(onJson4);
            favourite[i].removeEventListener('click', InserisciDB);
        }
    }
}



function AggiungiPreferiti(event) {
    cont++
    for (let i = 0; i < 9; i++) {
        if ((favourite[i] === event.target)) {
            favourite[i].src = 'images/raccolta-preferiti.png'
            favourite[i].removeEventListener('click', AggiungiPreferiti)
                /*favourite[i].parentNode.parentNode.classList.add('hidden1')*/
            const sectionpreferiti = document.querySelector('.section-preferiti')
            const divcontent = document.createElement('div')
            const img = document.createElement('img')
            const h1 = document.createElement('h1')
            const divtitle = document.createElement('div')
            const imgpreferiti = document.createElement('img')
            const settore = document.createElement('span');

            sectionpreferiti.appendChild(divcontent)
            divcontent.appendChild(img)
            divcontent.appendChild(divtitle)
            divtitle.appendChild(h1)
            divtitle.appendChild(imgpreferiti)
            divcontent.appendChild(settore);

            divcontent.classList.add('div-content')
            divtitle.classList.add('div-title')
            imgpreferiti.src = 'images/icon-remove.png'
            img.src = images[i];
            h1.textContent = titles[i];
            settore.textContent = sectors[i];

            article1.classList.remove('hidden');

            imgpreferiti.addEventListener('click', RimuoviPreferiti)
        }
    }
}

function ApriModale(event) {
    console.log('modale');
    const div = document.createElement('div');
    div.classList.add('modale-content')
    const immagine = document.createElement('img');
    const span = document.createElement('span');
    immagine.src = event.target.src
    span.textContent = event.target.parentNode.querySelector('.paragrafo').textContent;
    modale.appendChild(div);
    div.appendChild(immagine);
    div.appendChild(span);
    modale.classList.remove('hidden');
    document.body.classList.add('no-scroll');
}

function ChiudiModale() {
    modale.classList.add('hidden')
    modale.querySelector('img').remove();
    modale.querySelector('span').remove();
    document.body.classList.remove('no-scroll');
}

function onResponse2(response) {
    return response.text();
}

function onJson(text) {
    console.log(text);
}

function onJson2(json) {
    for (let contenuto of json) {
        cont++;
        for (let i = 0; i < 9; i++) {
            if (favourite[i].parentNode.querySelector('.title').textContent === contenuto.titolo) {
                favourite[i].src = 'images/icon-add.png';
                favourite[i].removeEventListener('click', AggiungiPreferiti);
                favourite[i].removeEventListener('click', InserisciDB);
                const sectionpreferiti = document.querySelector('.section-preferiti')
                const divcontent = document.createElement('div')
                const img = document.createElement('img')
                const h1 = document.createElement('h1')
                const divtitle = document.createElement('div')
                const imgpreferiti = document.createElement('img')
                const settore = document.createElement('span');
                sectionpreferiti.appendChild(divcontent)
                divcontent.appendChild(img)
                divcontent.appendChild(divtitle)
                divtitle.appendChild(h1)
                divtitle.appendChild(imgpreferiti)
                divcontent.appendChild(settore);
                divcontent.classList.add('div-content')
                divtitle.classList.add('div-title')
                imgpreferiti.src = 'images/icon-remove.png'
                img.src = images[i];
                h1.textContent = titles[i];
                settore.textContent = sectors[i];
                article1.classList.remove('hidden');
                imgpreferiti.addEventListener('click', RimuoviPreferiti)
            }
        }
    }
}



function InserisciDB(event) {
    for (let i = 0; i < 9; i++) {
        if (favourite[i] === event.target) {
            const titolo = event.target.parentNode.querySelector('.div-titolo .title').textContent;
            const formData = new FormData();
            formData.append('title', titolo);
            fetch("http://localhost/hw1/preferiti_utente.php", {
                method: "post",
                body: formData
            }).then(onResponse2).then(onJson);
            favourite[i].removeEventListener('click', InserisciDB);
        }
    }
}

function InserisciHeader(json) {
    console.log(json);
    const box1cont = document.querySelector('.box1-cont p');
    const box1img = document.querySelector('.box1-img img');
    const box2cont = document.querySelector('.box2-cont p');
    const box2img = document.querySelector('.box2-img img');
    const descrizione1 = json[0].descrizione
    const img1 = json[0].immagine;
    const descrizione2 = json[1].descrizione
    const img2 = json[1].immagine;
    box1cont.textContent = descrizione1
    box1img.src = img1
    box2cont.textContent = descrizione2
    box2img.src = img2

}


for (let bottone of SelezionaMostrapiu) {
    bottone.addEventListener('click', RimuoviMostraPiu);
}


for (let bottone of SelezionaMostrameno) {
    bottone.addEventListener('click', RimuoviMostraMeno)
}


for (let preferito of favourite) {
    preferito.addEventListener('click', AggiungiPreferiti);
    preferito.addEventListener('click', InserisciDB);
}



const immagine_fiere = document.querySelectorAll('.section-img');
for (let img of immagine_fiere) {
    img.addEventListener('click', ApriModale);
}

const modale_img = document.querySelector('.modale')
modale_img.addEventListener('click', ChiudiModale);