let listaPalabras = ["MARIPOSA", "JIRAFA", "LORO", "AVE", "ALACRAN", "MONO", "GUSANO", "HORMIGA",
 "GUSANO", "LOMBRIZ", "ZORRILLO"]
let paso_General = 0;
let palabraSecreta = [];
let palabraUsuario = [];
let letras = [];
let listaIncorrecta = [];

const menu_principal = document.querySelector("#menu_principal");
const crear_palabra = document.querySelector("#crear_palabra");
const jugar_ahorcado = document.querySelector("#jugar_ahorcado");
const imagenes_ahorcado = document.querySelector("#img_ahorcado");
const palabra_adivinada = document.querySelector("#palabra_adivinada");
const letra_incorrecta = document.querySelector("#incorrecto");
const nueva_palabra = document.querySelector("#nueva_palabra");

//AGREGAR PALABRA//
function onAgregarNuevaPalabra(){
    nueva_palabra.value = "";
    menu_principal.classList.toggle("no_mostrar");
    crear_palabra.classList.toggle("no_mostrar");
}

//GUARDAR Y EMPEZAR//

function onGuardaryEmpezar(){
    GuardarPalabra();
    prepararJuego();
    jugar_ahorcado.classList.toggle("no_mostrar");
    crear_palabra.classList.toggle("no_mostrar");
}

// GUARDAR PALABRA//
function GuardarPalabra(){
    let palabra_temporal = nueva_palabra.value;
    if(!palabra_temporal){
        alert("ERROR. Ingrese palabra de máximo 8 letras");  
    }else{
        if(!listaPalabras.includes(palabra_temporal.toUpperCase())){
             listaPalabras.push(palabra_temporal.toUpperCase());
        }
    }
}

//CANCELAR JUEGO//
function onCancelar (){
    menu_principal.classList.toggle("no_mostrar");
    crear_palabra.classList.toggle("no_mostrar");
}

//JUGAR//
function onIniciarJuego(){
    menu_principal.classList.toggle("no_mostrar");
    jugar_ahorcado.classList.toggle("no_mostrar");
    prepararJuego();
}

//NUEVO JUEGO//
function onNuevoJuego(){
    prepararJuego();
}

//DESISTIR//
function onDesistir(){
    jugar_ahorcado.classList.toggle("no_mostrar");
    menu_principal.classList.toggle("no_mostrar");
    document.removeEventListener('keyup', onKeyDownHandler);
}

//PALABRA PARA ADIVINAR DE LA LISTA DE PALABRAS//
function elegirPalabraSecreta() {
    let palabra = listaPalabras[Math.floor(Math.random() * listaPalabras.length)]
    palabraSecreta = palabra
    console.log(palabra)
    return palabra
} elegirPalabraSecreta();


//PREPARAR JUEGO//
function prepararJuego () {

    palabraSecreta = elegirPalabraSecreta().split('');
    palabraUsuario =  new Array(palabraSecreta.length);
    palabraUsuario.fill("_");
    paso_General = 0;

    // CAMBIAR IMAGENES//
    imagenes_ahorcado.classList.remove("Paso1","Paso2","Paso3","Paso4","Paso5","Paso6");
    imagenes_ahorcado.classList.add("Paso0");
    palabra_adivinada.classList.remove("ganador", "perdedor");
    rellenarGuiones(palabraSecreta);
    letra_incorrecta.innerHTML = "";
    listaIncorrecta = [];
    document.addEventListener('keyup', onKeyDownHandler, false);
}

function rellenarGuiones (secreto){
    palabra_adivinada.innerHTML = "";
    for (let step = 0; step < secreto.length; step++){
        let mySpan = document.createElement("span");
        mySpan.innerHTML = "_";
        palabra_adivinada.append(mySpan); 
    }
}

function onKeyDownHandler(event) {
    var codeValue = event.keyCode;
    console.log("keyup event, codeValue: " + codeValue);
    if(codeValue >= 65 && codeValue <= 90){
        console.log(String.fromCharCode(codeValue).toUpperCase());
        validarLetra(String.fromCharCode(codeValue).toUpperCase());
        pintarPaso();
    }
}

 //VALIDAR PALABRA SECRETA
function validarLetra(letra) {
    let cambiados = 0;
    for (let step = 0; step < palabraSecreta.length; step++) {
        if (letra === palabraSecreta[step]) {
            palabraUsuario[step] = letra;
            cambiados++;
        }
    } 
    if (cambiados == 0){
            paso_General++;
            listaIncorrecta.push(letra);
    }
    console.log(cambiados, palabraUsuario, paso_General);
}
    
function pintarPaso() {
    imagenes_ahorcado.classList.remove("Paso0", "Paso1", "Paso2", "Paso3", "Paso4", "Paso5", "Paso6");
    imagenes_ahorcado.classList.add("Paso" + paso_General);
    palabra_adivinada.innerHTML = "";

    for (let step = 0; step < palabraUsuario.length; step++) {
        let mySpan = document.createElement("span");
        mySpan.innerHTML = palabraUsuario [step];
        palabra_adivinada.append(mySpan);
    }
    letra_incorrecta.innerHTML = listaIncorrecta.join(" ");
    //Si perdí
    if(paso_General===6){
        palabra_adivinada.classList.add("perdedor");
        document.removeEventListener('keyup', onKeyDownHandler);
        letra_incorrecta.innerHTML= "La palabra secreta era: "+ palabraSecreta.join("");
    }    else if(palabraSecreta.join()===palabraUsuario.join()){ 
    //Si gané
        palabra_adivinada.classList.add("ganador");
        document.removeEventListener('keyup', onKeyDownHandler);
        letra_incorrecta.innerHTML= "¡Felicitaciones has ganado!";
    }
}