let numFilas, mapa1 = [], progreso = [], ronda = 0;

numFilas = parseInt(prompt("Introduce el número de filas del tablero (mínimo 5): "));
while(isNaN(numFilas) || numFilas < 5){
    numFilas = parseInt(prompt("El número de filas del tablero debe ser mayor o igual que 5. Introdúcelo de nuevo: "));
}

function generarTablero(){
    let mapaInicial = [], mapaConMinas = [], fila = [];
    for(let i=0; i<numFilas; i++){
        fila = [];
        for(let j=0; j<numFilas; j++){
            fila.push("X");
        }
        mapaInicial.push(fila);
    }
    mapaConMinas = colocarMinas(mapaInicial);
    return mapaConMinas;
}

function generarProgresoInicial(){

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

function contarMinasAdyacentes(mapa, x, y){
    let resultado = [].concat(mapa), contador = 0, margenX = [], margenY = [];

    switch(x){
        case 0:
            margenX = [x, x+1];
        break;
        case numFilas-1:
            margenX = [x-1, x];
        break;
        default:
            margenX = [x-1, x, x+1];
        break;
    }

    switch(y){
        case 0:
            margenY = [y, y+1];
        break;
        case numFilas-1:
            margenY = [y-1, y];
        break;
        default:
            margenY = [y-1, y, y+1];
        break;
    }

    for(let posX of margenX){
        for(let posY of margenY){
            if(resultado[posX][posY] == "*" && !(posX == x && posY == y)){
                contador++;
            }
        }
    }

    return contador;
}

function asignarNumeroDeBombasAdyacentes(x,y){
    let numero = contarMinasAdyacentes(x,y);
    progreso[x][y] = (numero == 0)? " " : numero;
}

function mostrarCasillasAdyacentesVaciasONumericas(x, y){
    asignarNumeroDeBombasAdyacentes(x,y);
    console.table(progreso);
}

let mapa = generarTablero();
let equisde = contarMinasAdyacentes(mapa, 0, 0);
console.log(`La casilla (0,0) tiene ${equisde} adyacentes`);
equisde = contarMinasAdyacentes(mapa, 4, 4);
console.log(`La casilla (4,4) tiene ${equisde} adyacentes`);




/*let mesas = [], numMesas, numClientes = 0, continuar = true, encontrada;

numMesas = parseInt(prompt("Introduce la cantidad de mesas del restaurante: "));
while (isNaN(numMesas) || numMesas <= 0){
    numMesas = parseInt(prompt("El valor no es válido. Introduce otro: "));
}

for (let i = 0; i<numMesas; i++){
    mesas[i] = Math.floor(Math.random() * 5);
}

document.open();

while(continuar){
    document.writeln(`<p>Mesas: [${mesas}]</p>`);

    numClientes = parseInt(prompt("Introduce la cantidad de clientes que van a cenar: "));
    while (isNaN(numClientes) || numClientes > 4){
        numClientes = parseInt(prompt(`Lo siento, no admitimos grupos de ${numClientes}, haga grupos de 4 personas como máximo e intente de nuevo`));
    }

    if(numClientes < 1){
        continuar = false;
    }else{
        document.writeln(`El usuario pide una mesa para ${numClientes}<br>`);

        encontrada = false;

        for(let i = 0; i < numMesas && !encontrada; i++){
            if(mesas[i] + numClientes <= 4){
                document.writeln(`Por favor, siéntese en la mesa ${i}<br><br>`);
                mesas[i] += numClientes;
                encontrada = true;
            }
        }

        if(!encontrada){
            document.writeln("Lo siento, no queda sitio en el restaurante<br><br>");
        }
    }
}


document.close();*/