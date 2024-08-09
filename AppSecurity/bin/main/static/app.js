


	
	

window.onload = gestoreLoad;

// creiamo un array vuoto chiamato listaO che ci serve per ottenere tutti gli elementi presenti sul db 
let listaO =  [];


// creiamo la classe prodotto ordinato 
class prodottoOrdinato {
   			
   			  constructor( name, prezzo, qnt, url) {
				
				
				
   				this.name = name;
   						    
   							this.prezzo = prezzo;
   							
   							this.qnt = qnt;
							
							this.url = url;
   					
   			  }
			  visualizza(){
			  		
			  		return "Nome: " + this.name + " Prezzo " +  this.prezzo + " Quantità " +  this.qnt;
			  	  }
			  	}
				
				
				class articolo {
				   			
				   			  constructor(titolo, url, img) {
				   				this.titolo = titolo;
				   						    
				   							this.url = url;
				   							
				   							this.img = img;
											
											
				   					
				   			  }
							  visualizza(){
							  		
							  		return "Nome: " + this.titolo + " Prezzo " +  this.url + " Quantità " +  this.img;
							  	  }
							  	}
			  	

function gestoreLoad(){
	
	
	// la funzione location reload ci permette di avere un refresh automatico della pagina
	// anche quando l'utente utilizza le frecce del browser
	window.addEventListener('pageshow', function(event) {
	            if (event.persisted) {
	                location.reload();
	            }
	        });
	
	
	// effettua una chiamata alla rotta dell'applicazione show
	$.ajax({
	       url: '/show',  // URL dell'endpoint REST
	       type: 'GET',
	       success: function(data) {
			
			// va a iterare sui dati per ogni item all'interno della lista va a instanziare
			// un oggetto di tipo prodottoOrdinato
			   
	           data.forEach(function(item) {
				
				let p1 = new prodottoOrdinato(item.nome, item.prezzo, item.url);
				
				listaO.push(p1);
				 
				
				
	               
	           });
	       },
	       error: function(jqXHR, textStatus, errorThrown) {
	           console.error('Error fetching data:', textStatus, errorThrown);
	           $('#dataList').append('<li>Error loading data</li>');
	       }
	   });
	   
	   let listaArticoli = [];
	   // URL dell'API
	   // URL dell'API
	   const apiUrl = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=music&api-key=FbMqtAk86IKupbQh3b4NVZaw8QOMyjNu';

	   // Funzione per fare la chiamata API e gestire la risposta
	   async function fetchArticles() {
		
		
		
		   
		
		
		
	       try {
	           // Fai la richiesta GET all'API
	           const response = await fetch(apiUrl);
			   
			   var elems = document.querySelectorAll('.slider');
			   	       var instances = M.Slider.init(elems);

	           // Controlla se la risposta è ok (status 200-299)
	           if (!response.ok) {
	               throw new Error(`HTTP error! Status: ${response.status}`);
	           }

	           // Estrai i dati in formato JSON
	           const data = await response.json();

	           // Gestisci i dati ottenuti
	           const articles = data.response.docs;

	           // Estrai e visualizza i campi richiesti
	           articles.forEach(article => {
	               const articleAbstract = article.abstract;
	               const articleWebUrl = article.web_url;
				   

	               // Inizializza l'URL dell'immagine come 'No image URL available'
	               let imageUrl = 'No image URL available';

	               // Verifica se l'articolo ha un array di immagini (multimedia) e se contiene almeno un elemento
	               if (article.multimedia && article.multimedia.length > 0) {
	                   // Se ci sono immagini, prendi l'URL dell'immagine dalla prima voce dell'array
	                   imageUrl = article.multimedia[0].url;
					   let imageUrlOk = "https://www.nytimes.com/" + imageUrl;
					   let a1 = new articolo(articleAbstract,articleWebUrl, imageUrlOk)
					   listaArticoli.push(a1);
					  
					   
	               }

	               // Stampa i dettagli dell'articolo
	               console.log('Abstract:', articleAbstract);
	               console.log('Web URL:', articleWebUrl);
	               console.log('Image URL:', imageUrl);
				   
	               console.log('---');
				   
				   
				   
				   
	           });
			   
			   
			   
			   
			   console.log(listaArticoli);
			      console.log(listaArticoli.length);
			      
			      let nodoLista = document.getElementById("news");
			      //nodoLista.className = "slider teal lighten-4";

			      
				  
				 
							  
				
					


			      for (let i = 0; i < listaArticoli.length; i++) {
					
					
					let card = document.createElement("div");
								      card.classList = "card col s4 m6 l3";
					
					let cardImage = document.createElement("div");
								  		      cardImage.className = "card-image";
			          
					let img = document.createElement("img");
								          img.src = listaArticoli[i].img;
										  
										  
						cardImage.appendChild(img);
						
									  
										  
			         /* let elem = document.createElement("span");
					  elem.className = "card-title";
			          elem.textContent = listaArticoli[i].url;
					  cardImage.appendChild(elem);*/

			          let div = document.createElement("div");
			          div.className = "card-content";
					  
					 

			        

			          let abstract = document.createElement("p");
			          abstract.textContent = listaArticoli[i].titolo;
					  div.appendChild(abstract);

					  
					  card.appendChild(cardImage);
					  card.appendChild(div);
					  nodoLista.appendChild(card);
			          
			      }

			      

			           
			   
			   
			   
			   
	       } catch (error) {
	           // Gestisci eventuali errori
	           console.error('Fetch error:', error);
	       }
	   }

	   // Chiama la funzione per ottenere e gestire gli articoli
	   fetchArticles();
	  

	   
	  
	
	   let nodo = document.getElementById("result");
		  
		
	let btn = document.getElementById("btn");
	btn.onclick = add;
	
	// viene inizializzata una lista che ci servirà per inserire i prodotti ordinati
	let lista =[];
	
	
	// aggiunge uno o più prodotti ordinati al carrello
	function add(){
		
		
		
		
		// per ogni elemento presente nella lista resituita dal database
		for (let i = 0; i < listaO.length; i++) {
			        
			        // recuperiamo la quantià di prodotti dellìevento selezionata dall'utente
					let qnt = document.getElementById(listaO[i].name).value;
					
					
					if (qnt > 0){
						let p1 = new prodottoOrdinato(listaO[i].name, listaO[i].prezzo, qnt);
						lista.push(p1);
					}
					
				}
				
						
		crea();
		lista = [];
		
	}
	
	
	// funzione crea  va a popolare il carrello con gli elementi selezionati dall'utente
	function crea(){
		
		// puliamo il nodo result
		rimuoviFigli(nodo);
		
		// una variabile per ottenere la somma degli acquisti
		let tot = 0;
	  
		// per ogni elemento presente nella lista, creiamo un elemento p
		// settiamo il textcontent dell'elemento p con il visualizza dell'oggetto
		// incrementiamo la variaible tot con il prezzo
		for (let i = 0; i < lista.length; i++){
			
			let nodoP = document.createElement("p");
			nodoP.textContent = lista[i].visualizza();
			nodo.appendChild(nodoP);
			tot += lista[i].prezzo * lista[i].qnt;
			
		}
		
		// creiamo un altro nodo per stampare il totale
		let nodoT = document.createElement("p");
				nodoT.textContent = "Totale : " +  tot;
				nodo.appendChild(nodoT);
	}
	
	function rimuoviFigli (nodo) {
	 while (nodo.childNodes.length > 0) {
	 nodo.removeChild(nodo.firstChild);
	 
	 
	 }}	
	
	 jQuery(document).ready(function ($) {

	   $('#checkbox').change(function(){
	     setInterval(function () {
	         moveRight();
	     }, 3000);
	   });
	   
	 	var slideCount = $('#slider ul li').length;
	 	var slideWidth = $('#slider ul li').width();
	 	var slideHeight = $('#slider ul li').height();
	 	var sliderUlWidth = slideCount * slideWidth;
	 	
	 	$('#slider').css({ width: slideWidth, height: slideHeight });
	 	
	 	$('#slider ul').css({ width: sliderUlWidth, marginLeft: - slideWidth });
	 	
	     $('#slider ul li:last-child').prependTo('#slider ul');

	     function moveLeft() {
	         $('#slider ul').animate({
	             left: + slideWidth
	         }, 200, function () {
	             $('#slider ul li:last-child').prependTo('#slider ul');
	             $('#slider ul').css('left', '');
	         });
	     };

	     function moveRight() {
	         $('#slider ul').animate({
	             left: - slideWidth
	         }, 200, function () {
	             $('#slider ul li:first-child').appendTo('#slider ul');
	             $('#slider ul').css('left', '');
	         });
	     };

	     $('a.control_prev').click(function () {
	         moveLeft();
	     });

	     $('a.control_next').click(function () {
	         moveRight();
	     });

	 });  
	
}	
  
		
		 	         
	

