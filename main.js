//Definimos las variables globales que vamos a usar
let numFilas, ronda = 0, vivo = true;



//Una función para generar el tablero inicial
function generarTablero(){
    //Definimos las variables que necesitamos
    let mapaInicial = [], fila = [];

    //Un bucle que genera la matriz
    for(let i=0; i<numFilas; i++){
        //Inicializamos el array de la fila a vacío
        fila = [];
        for(let j=0; j<numFilas; j++){ //Pusheamos a la fila tantas casillas como necesitemos
            fila.push("X");
        }
        //Pusheamos la nueva fila a la matriz
        mapaInicial.push(fila);
    }
    //Devolvemos la matriz creada
    return mapaInicial;
}

//Una función para colocar las minas en el tablero
function colocarMinas(mapa, numBombas){
    //Hacemos una copia del mapa y definimos las variables que necesitamos
    let resultado = [].concat(mapa), temp, x, y;

    //Un bucle que genere un número aleatorio que seleccione una casilla del mapa para colocar bomba,
    //y repita la iteración en caso de encontrarse una 
    for(let i=0; i<numBombas; i++){
        temp = Math.floor(Math.random() * numFilas * numFilas);
        x = parseInt(temp/numFilas);
        y = temp%numFilas;
        (resultado[x][y] == "X")? resultado[x][y] = "*" : i--;
    }
    //Devolvemos la copia del mapa
    return resultado;
}

//Una función para generar márgenes para cursar las casillas adyacentes
function generarMargen(n){
    //Generamos un array vacío
    let margen = [];
    //Diferenciamos el tamaño y valores del array en función del número introducido
    switch(n){
        case 0:
            margen = [n, n+1];
        break;
        case numFilas-1:
            margen = [n-1, n];
        break;
        default:
            margen = [n-1, n, n+1];
        break;
    }
    //Devolvemos el array generado
    return margen;
}

//Una función para contar las minas adyacentes a una casilla
function contarMinasAdyacentes(mapa, x, y){
    //Definimos las variables que necesitamos, y una copia del progreso (lo copio por si acaso, que no quiero más errores)
    let resultado = [].concat(mapa), contador = 0, margenX = [], margenY = [];

    //Generamos márgenes para fila y columna
    margenX = generarMargen(x);
    margenY = generarMargen(y);

    //Recorremos todas las posiciones y vamos contando las bombas
    for(let posX of margenX){
        for(let posY of margenY){
            if(resultado[posX][posY] == "*" && !(posX == x && posY == y)){
                contador++;
            }
        }
    }
    //Devolvemos el valor que hayamos acumulado
    return contador;
}

//Una función para mostrar las casillas adyacentes vacías o numéricas
function mostrarCasillasAdyacentesVaciasONumericas(mapa, progreso, x, y){
    //Hacemos una copia del progreso y generamos márgenes
    let resultado = [].concat(progreso), numero;
    let margenX = generarMargen(x), margenY = generarMargen(y);

    //Como sólo entramos a la función cuando encontramos un 0, sabemos que lo primero es revelar la casilla central
    resultado[x][y] = contarMinasAdyacentes(mapa, x, y);
    casillasRestantes--;

    //Un bucle para comprobar las adyacentes
    for(let posX of margenX){
        for(let posY of margenY){
            //Entramos sólo a casillas sin revelar y que no sean bomba
            if(resultado[posX][posY] == "X" && mapa[posX][posY] != "*"){ 
                numero = contarMinasAdyacentes(mapa, posX, posY);
                if(numero === 0){ //Llamamos recursivamente a la función si encontramos casillas sin revelar que sean 0
                    resultado = mostrarCasillasAdyacentesVaciasONumericas(mapa, resultado, posX, posY);
                } else { //Si no son 0 ni están reveladas, las revelamos y decrementamos el contador para victoria
                    resultado[posX][posY] = numero;
                    casillasRestantes--;
                }
            }
        }
    }
    //Devolvemos la copia del progreso
    return resultado;
}

//Una función para revelar una casilla
function revelarCasilla(mapa, progreso, x, y){
    //Hacemos una copia del progreso para trabajar en ella
    let resultado = [].concat(progreso);

    //Si la casilla a revelar es bomba, se pierde
    if(mapa[x][y] === "*"){
        vivo = false;
    } else if (contarMinasAdyacentes(mapa, x, y) == 0){ //Si es un 0, revelamos las adyacentes
        resultado = mostrarCasillasAdyacentesVaciasONumericas(mapa, resultado, x, y);
    } else { //Si no es 0 ni bomba, revelamos la casilla y decrementamos el contador para la victoria
        resultado[x][y] = contarMinasAdyacentes(mapa, x, y);
        casillasRestantes--; 
    }
    //Devolvemos la copia
    return resultado;
}

//Una función para jugar una ronda
function jugar(){
    //Mostramos el progreso
    console.log("Estás en la ronda " + (++ronda) + ":");
    console.table(progreso);

    //Repetimos las peticiones hasta que sean válidas
    do{
        //Inicializamos la booleana para controlar que la casilla elegida es válida
        casillaValida = true;

        //Pedimos las coordenadas de la casilla a revelar, y repetimos en caso de que no sean válidas
        filaSeleccionada = parseInt(prompt("Introduce la fila que quieres descubrir (0 a " + (numFilas-1) + "): "));
        while(isNaN(filaSeleccionada) || filaSeleccionada < 0 || filaSeleccionada >= numFilas){
            filaSeleccionada = parseInt(prompt("El número de fila debe estar entre 0 y " + (numFilas-1) + ". Introdúcelo de nuevo: "));
        }  
        columnaSeleccionada = parseInt(prompt("Introduce la columna que quieres descubrir (0 a " + (numFilas-1) + "): "));
        while(isNaN(columnaSeleccionada) || columnaSeleccionada < 0 || columnaSeleccionada >= numFilas){
            columnaSeleccionada = parseInt(prompt("El número de columna debe estar entre 0 y " + (numFilas-1) + ". Introdúcelo de nuevo: "));
        }

        //Si la casilla válida ya la hemos revelado, repetimos todo el proceso
        if(progreso[filaSeleccionada][columnaSeleccionada] != "X"){
            console.log("La casilla seleccionada ya ha sido descubierta. Selecciona otra.");
            casillaValida = false;
        }
    } while (!casillaValida);

    //Una vez hayamos recibido una casilla válida, la revelamos
    progreso = revelarCasilla(mapa, progreso, filaSeleccionada, columnaSeleccionada);
}

//Pedimos el tamaño del tablero al usuario
numFilas = parseInt(prompt("Introduce el número de filas del tablero (mínimo 1): "));
while(isNaN(numFilas) || numFilas < 1){
    numFilas = parseInt(prompt("El número de filas del tablero debe ser mayor o igual que 1. Introdúcelo de nuevo: "));
}

//Más variables que vamos a usar
let mapa = generarTablero(), progreso = generarTablero(), filaSeleccionada, columnaSeleccionada, casillaValida, numBombas, casillasRestantes;
numBombas = parseInt((numFilas*numFilas)/5),
casillasRestantes = numFilas * numFilas - numBombas;
mapa = colocarMinas(mapa, numBombas);
console.log("El mapa de minas es:");
console.table(mapa);

while(vivo){
    jugar();
    if(casillasRestantes === 0){
        break;
    }
}

//Mostramos el tablero final
console.log("Estado final del tablero: ");
console.table(progreso);

//Mensaje final
if(vivo){
    console.log("¡Felicidades! ¡Has ganado!");
} else {
    console.log("¡Has perdido! Mejor suerte la próxima vez.");
}