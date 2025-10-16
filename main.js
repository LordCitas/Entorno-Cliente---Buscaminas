let numFilas, ronda = 0, vivo = true;

numFilas = parseInt(prompt("Introduce el número de filas del tablero (mínimo 5): "));
while(isNaN(numFilas) || numFilas < 5){
    numFilas = parseInt(prompt("El número de filas del tablero debe ser mayor o igual que 5. Introdúcelo de nuevo: "));
}

function generarTablero(){
    let mapaInicial = [], fila = [];
    for(let i=0; i<numFilas; i++){
        fila = [];
        for(let j=0; j<numFilas; j++){
            fila.push("X");
        }
        mapaInicial.push(fila);
    }
    return mapaInicial;
}

function colocarMinas(mapa){
    let resultado = [].concat(mapa);
    let numBombas = parseInt((numFilas*numFilas)/5), temp, x, y;
    console.log(`El numero de bombas es ${numBombas}`);
    for(let i=0; i<numBombas; i++){
        temp = Math.floor(Math.random() * numFilas * numFilas);
        console.log(`El numero generado para la ${i+1}ª bomba es ${temp}`);
        x = parseInt(temp/numFilas);
        y = temp%numFilas;
        (resultado[x][y] == "X")? resultado[x][y] = "*" : i--;
        console.table(resultado);
    }
    return resultado;
}

function generarMargen(n){
    let margen = [];
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
    return margen;
}

function contarMinasAdyacentes(mapa, x, y){
    let resultado = [].concat(mapa), contador = 0, margenX = [], margenY = [];

    margenX = generarMargen(x);
    margenY = generarMargen(y);

    for(let posX of margenX){
        for(let posY of margenY){
            if(resultado[posX][posY] == "*" && !(posX == x && posY == y)){
                contador++;
            }
        }
    }

    return contador;
}

function mostrarCasillasAdyacentesVaciasONumericas(mapa, progreso, x, y){
    let resultado = [].concat(progreso), numero;
    let margenX = generarMargen(x), margenY = generarMargen(y);
    resultado[x][y] = contarMinasAdyacentes(mapa, x, y);
    for(let posX of margenX){
        for(let posY of margenY){
            if(resultado[posX][posY] == "X" /*&& !(posX == x && posY == y)*/ && mapa[posX][posY] != "*"){
                numero = contarMinasAdyacentes(mapa, posX, posY);
                if(numero === 0){
                    mostrarCasillasAdyacentesVaciasONumericas(mapa, resultado, posX, posY);
                } else {
                    resultado[posX][posY] = numero;
                }
            }
        }
    }

    return resultado;
}

let mapa = generarTablero(), progreso = generarTablero(), filaSeleccionada, columnaSeleccionada, casillaValida;
mapa = colocarMinas(mapa);
console.log("la casilla (0,0) tiene " + contarMinasAdyacentes(mapa,0,0) + " minas adyacentes.");

/*while(vivo){
    console.log("Estás en la ronda " + (ronda+1) + ":");
    console.table(progreso);
    casillaValida = true;
    do{
        filaSeleccionada = parseInt(prompt("Introduce la fila que quieres descubrir (0 a " + (numFilas-1) + "): "));
        while(isNaN(filaSeleccionada) || filaSeleccionada < 0 || filaSeleccionada >= numFilas){
            filaSeleccionada = parseInt(prompt("El número de fila debe estar entre 0 y " + (numFilas-1) + ". Introdúcelo de nuevo: "));
        }  
        columnaSeleccionada = parseInt(prompt("Introduce la columna que quieres descubrir (0 a " + (numFilas-1) + "): "));
        while(isNaN(columnaSeleccionada) || columnaSeleccionada < 0 || columnaSeleccionada >= numFilas){
            columnaSeleccionada = parseInt(prompt("El número de columna debe estar entre 0 y " + (numFilas-1) + ". Introdúcelo de nuevo: "));
        }
        if(progreso[filaSeleccionada][columnaSeleccionada] != "X"){
            console.log("La casilla seleccionada ya ha sido descubierta. Selecciona otra.");
            casillaValida = false;
        }
    } while (!casillaValida);
    
    if(mapa[filaSeleccionada][columnaSeleccionada] == "*"){
        vivo = false;
        console.log("¡Has perdido! Has dado con una mina en la casilla (" + filaSeleccionada + "," + columnaSeleccionada + ").");
        console.log("El tablero era:");
        console.table(mapa);
    } else {
        mostrarCasillasAdyacentesVaciasONumericas(filaSeleccionada, columnaSeleccionada);
        ronda++;
    }



}*/