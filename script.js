const pantalla = document.getElementById("pantalla");
const operacion = document.getElementById("operacion");

let expresion = "";

/* SONIDO */
function reproducirSonido() {

    const audio = new Audio(
        "https://www.soundjay.com/buttons/sounds/button-16.mp3"
    );

    audio.volume = 0.2;

    audio.play();
}

/* VOZ */
function hablar(texto) {

    const voz = new SpeechSynthesisUtterance(texto);

    voz.lang = "es-ES";

    speechSynthesis.speak(voz);
}

/* AGREGAR NUMERO */
function agregarNumero(numero) {

    reproducirSonido();

    if (pantalla.value === "0") {
        pantalla.value = numero;
    } else {
        pantalla.value += numero;
    }

    expresion = pantalla.value;

    hablar(numero);
}

/* OPERADOR */
function agregarOperador(operador) {

    reproducirSonido();

    pantalla.value += operador;

    expresion = pantalla.value;

    hablar(operador);
}

/* LIMPIAR */
function limpiar() {

    reproducirSonido();

    pantalla.value = "0";

    expresion = "";

    operacion.textContent = "0";

    hablar("Pantalla limpiada");
}

/* ELIMINAR */
function eliminarNumero() {

    reproducirSonido();

    pantalla.value = pantalla.value.slice(0, -1);

    if (pantalla.value === "") {
        pantalla.value = "0";
    }

    expresion = pantalla.value;

    hablar("Eliminar");
}

/* CALCULAR */
function calcular() {

    reproducirSonido();

    try {

        const resultado = eval(expresion);

        pantalla.value = resultado;

        operacion.textContent = expresion + " = " + resultado;

        hablar("Resultado " + resultado);

    } catch {

        pantalla.value = "Error";

        hablar("Error");

    }
}

/* TECLADO */
document.addEventListener("keydown", (e) => {

    if (!isNaN(e.key) || e.key === ".") {
        agregarNumero(e.key);
    }

    if (["+", "-", "*", "/", "%"].includes(e.key)) {
        agregarOperador(e.key);
    }

    if (e.key === "Enter") {
        calcular();
    }

    if (e.key === "Backspace") {
        eliminarNumero();
    }

    if (e.key === "Escape") {
        limpiar();
    }
});