//VARIABLES GLOBALES////////////////////////////////////////////////////////////
var canvas;
var ctx;
var FPS = 50;

var anchoF = 41;
var altoF = 41;

var pared;
var suelo;
var puerta;
var llave;


var protagonista;
var imagenprota;

var enemigo=[];
var imagenmalo;


var sonido1, sonido2, sonido3, sonido4;
var musica;

sonido1 = new Howl({
	src: ['sounds/victoria.mp3'],
	loop: false
});

sonido2 = new Howl({
	src: ['sounds/muerte.mp3'],
	loop: false
});

sonido3 = new Howl({
	src: ['sounds/puerta.flac'],
	loop: false
});

sonido4 = new Howl({
	src: ['sounds/objeto.mp3'],
	loop: false
});


musica = new Howl({
	src: ['music/banda_sonora.ogg'],
	loop: true
});







var tileMap;
////////////////////////////////////////////////////////////////////////////////
//MAPA//////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
var escenario = [
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] ,
	[0, 2, 2, 2, 2, 2, 2, 2, 0, 0, 2, 2, 2, 2, 2, 2, 0, 2, 2, 0] ,
	[0, 2, 2, 2, 0, 0, 0, 2, 0, 0, 2, 2, 2, 0, 0, 2, 2, 2, 2, 0] ,
	[0, 2, 0, 0, 0, 0, 2, 2, 2, 0, 2, 2, 2, 2, 0, 2, 0, 2, 2, 0] ,
	[0, 2, 0, 0, 1, 0, 2, 2, 2, 0, 0, 0, 0, 2, 0, 2, 0, 0, 0, 0] ,
	[0, 2, 2, 2, 2, 0, 2, 0, 2, 0, 2, 2, 0, 2, 0, 2, 0, 2, 3, 0] ,
	[0, 2, 0, 2, 2, 0, 2, 0, 2, 0, 2, 2, 0, 2, 0, 2, 0, 2, 2, 0] ,
	[0, 2, 0, 0, 0, 0, 2, 2, 2, 0, 0, 2, 2, 2, 0, 2, 0, 0, 2, 0] ,
	[0, 2, 2, 2, 2, 0, 2, 2, 2, 0, 0, 0, 0, 2, 0, 2, 2, 0, 2, 0] ,
	[0, 0, 0, 0, 2, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 2, 0] ,
	[0, 0, 0, 0, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 2, 0] ,
	[0, 2, 2, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0] ,
	[0, 2, 2, 2, 2, 0, 2, 2, 2, 0, 0, 2, 2, 2, 0, 2, 2, 2, 2, 0] ,
	[0, 2, 2, 0, 2, 0, 2, 0, 2, 0, 0, 2, 0, 2, 0, 0, 0, 2, 0, 0] ,
	[0, 0, 0, 0, 2, 0, 2, 0, 2, 0, 0, 2, 0, 2, 0, 2, 2, 2, 0, 0] ,
	[0, 2, 2, 2, 2, 0, 2, 2, 2, 0, 0, 2, 0, 2, 0, 2, 0, 0, 0, 0] ,
	[0, 2, 0, 0, 0, 0, 2, 0, 2, 0, 0, 2, 0, 2, 0, 2, 0, 2, 2, 0] ,
	[0, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 2, 0, 2, 0, 2, 2, 2, 2, 0] ,
	[0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 2, 0] ,
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] ,
];



function dibujaEscenario(){


for(y=0; y<20; y++){
for(x=0; x<20; x++){

				var tile = escenario[y][x];
				ctx.drawImage(tileMap, tile*32,0,32,32, anchoF*x,altoF*y,anchoF,altoF);

		}
	}
}


///////////////////////////////////////////////////////////////////////////////
///OBJETO ENEMIGO//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
var malo = function(x,y){
	this.x = x;
	this.y = y;

	imagenmalo = new Image();
	imagenmalo.src = 'img/malo.png'

	this.direccion = Math.floor(Math.random()*4);

	this.retraso = 20;
	this.fotograma = 0;


	this.dibuja = function(){
		ctx.drawImage(imagenmalo,0,0,32,32, this.y*anchoF,
			this.x*altoF, anchoF, altoF);

	}
////MOVIMIENTO ENEMIGO
this.compruebaColision = function(x,y){
	var colisiona = false;
	if(escenario[x][y] == 0){
		colisiona = true;
	}

	return colisiona;
}


	this.mueve = function(){
		protagonista.colisionEnemigo(this.x, this.y);
		if(this.contador < this.retraso){
			this.contador ++;
		}
		else{
			this.contador = 0;

		//ARRIBA
		if(this.direccion == 0){
			if(this.compruebaColision(this.x - 1, this.y) == false){
				this.x --;
			}
			else {
				this.direccion = Math.floor(Math.random()*4);
			}
		}
		//ABAJO
		if(this.direccion == 1){
			if(this.compruebaColision(this.x + 1, this.y) == false){
				this.x ++;
			}
			else{
				this.direccion = Math.floor(Math.random()*4);
			}
		}
		//izquierda
		if(this.direccion == 2){
			if(this.compruebaColision(this.x, this.y- 1) == false){
				this.y --;
			}
			else{
				this.direccion = Math.floor(Math.random()*4);
			}
		}
		//DERECHA
		if(this.direccion == 3){
			if(this.compruebaColision(this.x, this.y + 1) == false){
				this.y ++;
			}
			else{
				this.direccion = Math.floor(Math.random()*4);
			}
		}
}
	}
}

////////////////////////////////////////////////////////////////////////////////
//OBJETO JUGADOR///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
var jugador = function(){
	this.x = 12;
	this.y = 1;
	this.llave = false;

	imagenprota = new Image();
	imagenprota.src = 'img/prota.png'

	this.dibuja = function(){

		ctx.drawImage(imagenprota,32,0,32,32, this.y*anchoF,
			this.x*altoF, anchoF, altoF);
	}

	this.colisionEnemigo = function(x,y){
		if(this.x == x && this.y == y){
			this.muerte();
		}
	}


	this.margenes = function(x,y){
		var colision = false;
		if(escenario[x][y] == 0){
			colision = true;
		}
		return(colision);
	}
	this.arriba = function(){
		if(this.margenes(this.x-1, this.y)==false){
		this.x --;
		this.logicaObjetos();
		}
	}
	this.abajo = function(){
		if(this.margenes(this.x+1, this.y)==false){
		this.x ++;
		this.logicaObjetos();
		}
	}
	this.izquierda = function(){
		if(this.margenes(this.x, this.y-1)==false){
		this.y --;
		this.logicaObjetos();
		}
	}
	this.derecha = function(){
		if(this.margenes(this.x, this.y+1)==false){
		this.y ++;
		this.logicaObjetos();
		}
	}
this.victoria = function(){
	sonido3.play();
	alert('Has conseguido escapar');
	sonido1.play();
	this.x = 12;
	this.y = 1;
	this.llave = false;  //el jugador no tiene la llave
	escenario[5][18] = 3; //la llave vuelve a su sitio

}

this.muerte = function(){
	sonido2.play();
	this.x = 12;
	this.y = 1;
	this.llave = false;
	escenario[5][18] = 3;

alert("Te han atrapado los custodios, vuelves a tu celda");



}
///////////////////////////////////////////////////////////////////////////////
//LOGICA DE OBJETOS////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
this.logicaObjetos = function(){
		var objeto = escenario[this.x][this.y];
		//OBTENER LLAVE
		if(objeto == 3){
			this.llave = true;
			escenario[this.x][this.y] = 2;
			sonido4.play();
			alert('Has conseguido una llave, quizas consigas la libertad.');
		}

		//ABRIR PUERTA
		if(objeto == 1){
			if(this.llave == true)
				this.victoria();
			else {
				sonido3.play();
				alert('La puerta esta cerrada con llave');
			}
		}

}

}
////////////////////////////////////////////////////////////////////////////////
///CANVAS///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
function inicializar(){
	canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');



	tileMap = new Image();
	tileMap.src = 'img/texturas.png';

	//CREAMOS AL JUGADOR
	protagonista = new jugador();

	//CREAMOS ENEMIGO
	enemigo.push(new malo(2,4));
	enemigo.push(new malo(2,1));
	enemigo.push(new malo(15,7));
	enemigo.push(new malo(10,7));
	enemigo.push(new malo(10,15));
	enemigo.push(new malo(1,4));
	enemigo.push(new malo(3,8));
	enemigo.push(new malo(3,12));
	enemigo.push(new malo(1,15));
	enemigo.push(new malo(18,18));
	enemigo.push(new malo(16,19));

	//////////////////////////////////////////////////////////////////////////////
	//LECTURA DE TECLADO//////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////
	document.addEventListener('keydown', function(tecla){
		//ARRIBA
		if(tecla.keyCode == 38){
	protagonista.arriba();
		}

		//ABAJO
		if(tecla.keyCode == 40){
	protagonista.abajo();

		}
		//IZQUIERDA
		if(tecla.keyCode == 37){
	protagonista.izquierda();

		}
		//DERECHA
		if(tecla.keyCode == 39){
	protagonista.derecha();
		}

	})
	setInterval(function(){
		principal();
	},1000/FPS);

musica.play();
}


function borraCanvas(){
  canvas.width=804;
  canvas.height=804;
}
////////////////////////////////////////////////////////////////////////////////
//bucle principal///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
	function principal(){
		borraCanvas();
		dibujaEscenario();
		protagonista.dibuja();

		for(c=0; c<enemigo.length; c++){
			enemigo[c].mueve();
			enemigo[c].dibuja();
		}
	}
