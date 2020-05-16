//VARIABLES GLOBALES////////////////////////////////////////////////////////////
var canvas;
var ctx;
var FPS = 50;

var anchoF = 41;
var altoF = 41;


var mapa;
var suelo;
var fondo;
var puerta;
var bandera;

var jugadorUno;
var jugadorDos;

var imagenJuno;
var imagenJdos;

var musica;
var blueflag;
var redflag;
var capflag;


sonidosalto = new Howl({
	src: ['sounds/salto.mp3'],
	loop: false
});

musica = new Howl({
	src: ['music/musicashadowborn.mp3'],
	loop: true
});

redflag = new Howl({
	src: ['sounds/redflag.mp3'],
	loop: false
});

blueflag = new Howl({
	src: ['sounds/blueflag.mp3'],
	loop: false
});

capflag = new Howl({
	src: ['sounds/capflag.wav'],
	loop: false
});


var tileMap;
////////////////////////////////////////////////////////////////////////////////
//ESCENARIO///////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
var escenario = [  //y20 x20
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[ 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 0, 0],
[ 0, 2, 2, 0, 2, 2, 0, 0, 0, 2, 2, 0, 0, 0, 2, 2, 0, 2, 2, 0],
[ 0, 2, 2, 1, 2, 0, 0, 2, 2, 2, 2, 1, 2, 0, 0, 2, 2, 2, 1, 0],
[ 0, 0, 0, 2, 2, 2, 0, 2, 0, 0, 0, 0, 2, 0, 2, 2, 2, 0, 0, 0],
[ 0, 0, 2, 2, 2, 2, 0, 2, 0, 0, 0, 0, 2, 0, 2, 2, 2, 2, 0, 0],
[ 0, 0, 1, 2, 2, 0, 0, 2, 4, 2, 2, 5, 2, 0, 0, 2, 2, 2, 0, 0],
[ 0, 1, 2, 2, 2, 2, 0, 0, 0, 1, 1, 0, 0, 0, 2, 2, 2, 2, 0, 0],
[ 0, 2, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0],
[ 0, 2, 0, 0, 0, 2, 2, 2, 0, 2, 2, 0, 2, 2, 1, 0, 0, 1, 0, 0],
[ 0, 2, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 2, 2, 2, 0],
[ 0, 2, 2, 2, 2, 1, 2, 1, 0, 0, 0, 0, 2, 2, 0, 3, 2, 1, 3, 0],
[ 0, 2, 2, 1, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 2, 2, 0, 0],
[ 0, 1, 2, 1, 0, 0, 1, 2, 2, 1, 2, 2, 2, 0, 0, 0, 2, 2, 2, 0],
[ 0, 0, 2, 2, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 2, 2, 0],
[ 0, 2, 2, 0, 0, 0, 2, 2, 2, 0, 0, 2, 1, 2, 0, 0, 0, 0, 2, 0],
[ 0, 2, 2, 0, 0, 0, 2, 0, 2, 2, 2, 2, 0, 2, 0, 0, 2, 2, 2, 0],
[ 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0],
[ 0, 2, 2, 2, 2, 2, 2, 1, 2, 2, 1, 2, 2, 2, 2, 2, 2, 0, 0, 0],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

];

function dibujaEscenario(){

	for(y=0; y<20; y++){
	for(x=0; x<20; x++){

					var tile = escenario[y][x];
					ctx.drawImage(tileMap, tile*32,0,32,32, anchoF*x,altoF*y,anchoF,altoF);

			}
		}


};
//FIN DEL ESCENARIO-------------------------------------------------------------
////////////////////////////////////////////////////////////////////////////////
//JUGADOR UNO///////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

var playerOne = function(){

	this.x = 616;
	this.y = 478;

	this.vy = 0;
	this.vx = 0;

	this.gravedad = 0.5;
	this.friccion = 1;

	this.salto = 11;
	this.velocidad = 3;
	this.velocidadMax= 5;

	this.suelo = false;

	this.pulsaIzquierda = false;
	this.pulsaDerecha = false;

	imagenJuno = new Image();
	imagenJuno.src = 'img/ninja1.png'

	this.bandera = false;


	this.colision = function(x,y){

		var colisiona = false;
		if(escenario[parseInt(y/altoF)][parseInt(x/anchoF)] == 0 ){
			colisiona = true;

		}

		return(colisiona);
	};





//CORRECION
	this.correccion = function(lugar){
		//ABAJO
		if(lugar == 1){
			this.y = parseInt(this.y/altoF)*altoF;
		}

		//ARRIBA
		if(lugar == 2){
			this.y = parseInt((this.y/altoF) + 1)*altoF;
		}

		// IZQUIERDA
		if(lugar == 3){
			this.x = parseInt(this.x/anchoF)*anchoF;
		}

		//DERECHA
		if(lugar == 4){
			this.x = parseInt((this.x/anchoF) + 1)*altoF;
		}

	}



///FISICA DEL JUGADOR//////////////
	this.fisica = function(){

		//GRAVEDAD//////
		if(this.suelo == false){
			this.vy += this.gravedad;

		}

		//MOVIMIENTO HORIZONTAL
		if(this.pulsaDerecha == true && this.vx <= this.velocidadMax){
			this.vx += this.velocidad;
			this.logicaObjetos();
		}
		if(this.pulsaIzquierda == true && this.vx >= 0- this.velocidadMax){
			this.vx -= this.velocidad;
			this.logicaObjetos();
		}

		//FRICCION
		//FRICCION HACIA LA DERECHA
		if(this.vx > 0){
			this.vx -= this.friccion;

			if(this.vx < 0){
				this.vx = 0;
			}
		}
		//FRICCION HACIA LA IZQUIERDA
		if(this.vx < 0){
			this.vx += this.friccion;

			if(this.vx > 0){
				this.vx = 0;
			}

		}

		//COLISION DERECHA---------------
		if(this.vx > 0){
			if((this.colision(this.x + anchoF + this.vx, this.y +1) == true) || (this.colision(this.x + anchoF + this.vx, this.y + altoF -1) == true)){

				if(this.x != parseInt(this.x/anchoF)*anchoF){
				this.correccion(4);
				}
				this.vx = 0;
			}
		}


		//COLISION IZQUIERDA --------------

		if(this.vx < 0){
			if((this.colision(this.x + this.vx, this.y +1) == true) || (this.colision(this.x + this.vx, this.y + altoF -1) == true)){

				if(this.x != parseInt(this.x/anchoF)*anchoF){
				this.correccion(3);
				}
				this.vx = 0;
			}
		}

		//ASIGNACION DE VALORESS-----------------
		this.y += this.vy;
		this.x += this.vx;

		//COLISIONES////////////////////////////////////////////
		//COLISION TECHO------------------
		if(this.vy <0){
			if((this.colision(this.x +1, this.y) == true) || (this.colision(this.x + anchoF -1, this.y) == true)){
				this.vy= 0;
				this.correccion(2);
			}

		}


		//COLISION SUELO-----------------
		if(this.vy >= 0){
			if((this.colision (this.x +1, this.y + altoF) == true) || (this.colision (this.x + anchoF -1, this.y + altoF) == true)){
				this.suelo = true;
				this.vy = 0;
				this.correccion(1);
				this.logicaObjetos();
			}
			else{
				this.suelo = false;
			}
		}
	};

//FUNCION DIBUJAR JUGADOR////////
	this.dibuja = function(){

		this.fisica();

		ctx.drawImage(imagenJuno,0,17,16,16, this.x,
				this.y, anchoF, altoF);
	}

	//MOVIMIENTO JUGADOR////////
	this.arriba = function(){
			if(this.suelo == true){
				this.vy -= this.salto;
				this.suelo = false;
			}
      sonidosalto.play();
	};

	this.derecha = function(){
		this.pulsaDerecha = true;

	};

	this.izquierda = function(){
		this.pulsaIzquierda = true;

	};


	this.sueltaDerecha = function(){
		this.pulsaDerecha = false;

	};

	this.sueltaIzquierda = function(){
		this.pulsaIzquierda = false;

	};

	this.victoria = function(){

		this.x = 616;
		this.y = 478;
		this.bandera = false;  //el jugador no tiene la bandera
		escenario[6][8] = 4; //la bandera vuelve a su sitio
		this.pulsaIzquierda = false;
		this.pulsaDerecha = false;
		capflag.play();
		window.alert ('Hanzo ha capturado y entregado una bandera rival');
	}

///////////////////////////////////////////////////////////////////////////////
//LOGICA DE OBJETOS////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

	this.logicaObjetos = function(){

		var objeto = escenario[parseInt(this.y/altoF)][parseInt(this.x/anchoF)];
			if (objeto == 4 ){
				this.bandera = true;
				escenario[parseInt(this.y/altoF)][parseInt(this.x/anchoF)] = 2;
				redflag.play();
			}
			//ABRIR PUERTA
			if(objeto == 3){
					if(this.bandera == true)
					this.victoria();


}


	}

}
//FIN OBJETO JUGADOR------------------------------------------------------------
///////////////////////////////////////////////////////////////////////////////
///JUGADOR DOS//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////


var playerTwo = function(){

	this.x = 738;
	this.y = 478;

	this.vy = 0;
	this.vx = 0;

	this.gravedad = 0.5;
	this.friccion = 1;

	this.salto = 11;
	this.velocidad = 3;

	this.velocidadMax= 5;

	this.suelo = false;

	this.pulsaIzquierda = false;
	this.pulsaDerecha = false;

	imagenJdos = new Image();
	imagenJdos.src = 'img/ninja2.png'


	this.colision = function(x,y){

		var colisiona = false;
		if(escenario[parseInt(y/altoF)][parseInt(x/anchoF)] == 0){
			colisiona = true;
		}

		return(colisiona);
	};



//CORRECION
	this.correccion = function(lugar){
		//ABAJO
		if(lugar == 1){
			this.y = parseInt(this.y/altoF)*altoF;
		}

		//ARRIBA
		if(lugar == 2){
			this.y = parseInt((this.y/altoF) + 1)*altoF;
		}

		// IZQUIERDA
		if(lugar == 3){
			this.x = parseInt(this.x/anchoF)*anchoF;
		}

		//DERECHA
		if(lugar == 4){
			this.x = parseInt((this.x/anchoF) + 1)*altoF;
		}

	}



	///FISICA DEL JUGADOR//////////////
		this.fisica = function(){

			//GRAVEDAD//////
			if(this.suelo == false){
				this.vy += this.gravedad;

			}

			//MOVIMIENTO HORIZONTAL
			if(this.pulsaDerecha == true && this.vx <= this.velocidadMax){
				this.vx += this.velocidad;
				this.logicaObjetos();
			}
			if(this.pulsaIzquierda == true && this.vx >= 0- this.velocidadMax){
				this.vx -= this.velocidad;
				this.logicaObjetos();
			}

			//FRICCION
			//FRICCION HACIA LA DERECHA
			if(this.vx > 0){
				this.vx -= this.friccion;

				if(this.vx < 0){
					this.vx = 0;
				}
			}
			//FRICCION HACIA LA IZQUIERDA
			if(this.vx < 0){
				this.vx += this.friccion;

				if(this.vx > 0){
					this.vx = 0;
				}

			}

			//COLISION DERECHA---------------
			if(this.vx > 0){
				if((this.colision(this.x + anchoF + this.vx, this.y +1) == true) || (this.colision(this.x + anchoF + this.vx, this.y + altoF -1) == true)){

					if(this.x != parseInt(this.x/anchoF)*anchoF){
					this.correccion(4);
					}
					this.vx = 0;
				}
			}


			//COLISION IZQUIERDA --------------

			if(this.vx < 0){
				if((this.colision(this.x + this.vx, this.y +1) == true) || (this.colision(this.x + this.vx, this.y + altoF -1) == true)){

					if(this.x != parseInt(this.x/anchoF)*anchoF){
					this.correccion(3);
					}
					this.vx = 0;
				}
			}

			//ASIGNACION DE VALORESS-----------------
			this.y += this.vy;
			this.x += this.vx;

			//COLISIONES////////////////////////////////////////////
			//COLISION TECHO------------------
			if(this.vy <0){
				if((this.colision(this.x +1, this.y) == true) || (this.colision(this.x + anchoF -1, this.y) == true)){
					this.vy= 0;
					this.correccion(2);
				}

			}


			//COLISION SUELO-----------------
			if(this.vy >= 0){
				if((this.colision (this.x +1, this.y + altoF) == true) || (this.colision (this.x + anchoF -1, this.y + altoF) == true)){
					this.suelo = true;
					this.vy = 0;
					this.correccion(1);
					this.logicaObjetos();
				}
				else{
					this.suelo = false;
				}
			}
		};

	//FUNCION DIBUJAR JUGADOR////////
		this.dibuja = function(){

			this.fisica();

			ctx.drawImage(imagenJdos,0,17,16,16, this.x,
					this.y, anchoF, altoF);
		}

		//MOVIMIENTO JUGADOR////////
		this.arriba = function(){
				if(this.suelo == true){
					this.vy -= this.salto;
					this.suelo = false;
				}
	      sonidosalto.play();
		};

		this.derecha = function(){
			this.pulsaDerecha = true;

		};

		this.izquierda = function(){
			this.pulsaIzquierda = true;

		};


		this.sueltaDerecha = function(){
			this.pulsaDerecha = false;

		};

		this.sueltaIzquierda = function(){
			this.pulsaIzquierda = false;

		};

		this.victoria = function(){

			this.x = 738;
			this.y = 478;
			this.bandera = false;  //el jugador no tiene la bandera
			escenario[6][11] = 5; //la bandera vuelve a su sitio
			this.pulsaIzquierda = false;
			this.pulsaDerecha = false;
			capflag.play();
			window.alert ('Yakuro ha capturado y entregado una bandera rival');
		}

	///////////////////////////////////////////////////////////////////////////////
	//LOGICA DE OBJETOS////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////

		this.logicaObjetos = function(){

			var objeto = escenario[parseInt(this.y/altoF)][parseInt(this.x/anchoF)];
				if (objeto == 5 ){
					this.bandera = true;
					escenario[parseInt(this.y/altoF)][parseInt(this.x/anchoF)] = 2;
					blueflag.play();
				}
				//ABRIR PUERTA
				if(objeto == 3){
						if(this.bandera == true)
						this.victoria();

	}


		}

	}
//FIN OBJETO JUGADOR DOS--------------------------------------------------------

////////////////////////////////////////////////////////////////////////////////
//LECTURA DEL TECLADO///////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
function inicializaTeclado(){
	document.addEventListener('keydown', function(tecla){

		//SALTO
		if (tecla.keyCode == 38){
			jugadorDos.arriba();
		}
    if (tecla.keyCode == 87){
      jugadorUno.arriba();
    }
		//ABAJO
		if (tecla.keyCode == 40){

		}
		//IZQUIERDA
		if (tecla.keyCode == 37){
			jugadorDos.izquierda();
		}
    if (tecla.keyCode == 65){
			jugadorUno.izquierda();
		}

		//DERECHA
		if (tecla.keyCode == 39){
			jugadorDos.derecha();

		}
    if (tecla.keyCode == 68){
      jugadorUno.derecha();

    }

	});

	document.addEventListener('keyup', function(tecla){

		//IZQUIERDA
		if (tecla.keyCode == 37){
			jugadorDos.sueltaIzquierda();
		}
    if (tecla.keyCode == 65){
			jugadorUno.sueltaIzquierda();
		}
		//DERECHA
		if (tecla.keyCode == 39){
			jugadorDos.sueltaDerecha();
		}

    if (tecla.keyCode == 68){
			jugadorUno.sueltaDerecha();
		}

	});
}
//FIN LECTURA DE TECLADO--------------------------------------------------------
////////////////////////////////////////////////////////////////////////////////
//FUNCION DE INICIALIZAR Y BUCLE PRINCIPAL//////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
function inicializar(){

	canvas = document.getElementById('canvas')
	ctx = canvas.getContext ('2d');

jugadorUno = new playerOne();
jugadorDos = new playerTwo();

tileMap = new Image();
tileMap.src = 'img/texturas.png';

	inicializaTeclado();


	setInterval(function(){
		principal();
	}, 1000/FPS);
  musica.play();
}

function borraCanvas(){
  canvas.width=804;
  canvas.height=804;
}


function principal(){


  borraCanvas();
  dibujaEscenario();
	jugadorUno.dibuja();
  jugadorDos.dibuja();
}
//FIN FUNCION DE INICIALIZAR PRINCIPAL------------------------------------------
