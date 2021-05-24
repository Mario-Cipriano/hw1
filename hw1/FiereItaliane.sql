create database FiereItaliane;
use FiereItaliane;
Insert into utente(Username,Password) values('Mario','1111111+');
create table utente(
Id Integer Primary Key auto_increment,
Username Varchar(50),
Password Varchar(255)
)Engine='InnoDB';



create table contenuti(
Id Integer Primary Key auto_increment,
immagine Varchar(255),
titolo Varchar(255),
settore Varchar(255),
descrizione Varchar(255)
)Engine='InnoDB';

create table header(
id Integer Primary Key auto_increment,
descrizione Varchar(500),
immagine Varchar(500)
)Engine='InnoDB';

Insert into header(descrizione,immagine) values("FiereItalia è anche un'ente internazionale che permette di partecipare ad eventi esclusivi in ogni parte del Mondo! Cerca l'evento che più ti aggrada , acquista il biglietto ed vivi un'esperienza unica! Diamo anche la possibilità di visualizzare ed partecipare ai concerti più importanti dell'anno!","./images/fiere_internazionali.png");
Insert into header(descrizione,immagine) values("In questa sezione è possibile acquistare un biglietto per partecipare ad una delle fiere in programma. Il nostro obiettivo è quello di far vivere un'esperienza fieristica irripetibile nel suo genere al cliente cercando di soddisfare ogni sua esigenza , stupendo le sue aspettative , tenendo conto di tutte le misure di sicurezza relative al Covid-19.","./images/fiera.jpg");


create table preferiti(
id_utente Integer,
id_contenuto Integer,
Primary Key(id_utente,id_contenuto),
index index_id_utente(id_utente),
index index_id_contatto(id_contenuto),
FOREIGN KEY(id_utente) REFERENCES utente(Id), 
FOREIGN KEY(id_contenuto) REFERENCES contenuti(Id) 
)Engine='InnoDB';

create table carrello(
Id integer ,
immagine Varchar(255),
titolo Varchar(255),
data Varchar(255),
Primary Key(Id,titolo,data),
luogo Varchar(255),
quantita Integer,
index index_id(Id),
Foreign key(Id) references utente(Id)
)Engine='InnoDB';

SELECT immagine,titolo,data,quantita from carrello where Id='2';

select * from carrello;
drop table  carrello;
Insert into carrello(id,titolo,data,quantita) values('2','a','ajjs','1');
UPDATE carrello set quantita='2' where titolo='Lady A';
delete from carrello where id='2';
/*insert into contenuti(contenuto) values('{"images": ["./images/pitti.jpg"]}');*/
insert into contenuti(immagine,titolo,settore,descrizione) values("./images/pitti.jpg","Pitti Uomo","Settore: Moda","Pitti Uomo è una manifestazione dedicata al 'pronto moda maschile.',è una delle più spettacolari sfilate di moda internazionale");
insert into contenuti(immagine,titolo,settore,descrizione) values("./images/roma-image.jpg","International Estetica","Settore: Estetica","La manifestazione, organizzata da Fiera Roma, è un punto di riferimento nel panorama del settore estetico.");
insert into contenuti(immagine,titolo,settore,descrizione) values("./images/made-expo.jpg","Made-Expo","Settore: Edilizia","MADE-expo è la piattaforma di incontro privilegiata tra aziende, architetti, ingegneri, progettisti,imprese ,rivenditori e operatori del settore.");
insert into contenuti(immagine,titolo,settore,descrizione) values("./images/sabo.png","Sabo Roma","Settore: Arredamento","Sabo Roma è il salone italiano dedicato a: home décor, bomboniere, articoli da regalo,bijoux.");
insert into contenuti(immagine,titolo,settore,descrizione) values("./images/mecfor.jpg","Mecfor Expo","Settore: Manufatturiero","MECFOR è l'evento leader  delle fiere internazionali riguardanti le tecnologie per la lavorazione dei metalli.");
insert into contenuti(immagine,titolo,settore,descrizione) values("./images/homi-fashion.png","Homi Fashion&Jewel","Settore: Moda","HOMI Fashion&Jewels è la principale fiera  per quanto riguarda il settore della moda.");
insert into contenuti(immagine,titolo,settore,descrizione) values("./images/motor_bike_expo.jpg","Motor Bike Expo","Settore: Motociclismo","Motor Bike Expo è la fiera più importante dedicata alle moto, comprende tutti i settori: dallo street al racing fino all'adventouring.");
insert into contenuti(immagine,titolo,settore,descrizione) values("./images/cibus.jpg","Cibus Expo","Settore: Alimentare","CIBUS TEC è tra le più innovative manifestazioni di tecnologia alimentare e una vetrina completa delle migliori soluzioni.");
insert into contenuti(immagine,titolo,settore,descrizione) values("./images/vinitaly.png","Vinitaly","Settore: Alimentare","Vinitaly Special Edition è un evento professionale  che permette di scoprire lo scenario del mercato vitivinicolo italiano.");

select * from contenuti;
UPDATE contenuti SET  descrizione="Sabo Roma è il salone italiano dedicato a: home décor, bomboniere, articoli da regalo,bijoux." where id='4'; 
delete from contenuti where Id='11';
SELECT contenuto from contenuti;
select json_object from contenuti;
drop table utente;
select * from utente;
Insert into utente values(1,"Mariocxx99","12345");
delete from utente where id='1';


select * from contenuti;
select Id from contenuti where titolo='cibus expo';
select username from utente;
delete from utente where Username='a';
select * from preferiti;
delete from preferiti where id_utente='2';