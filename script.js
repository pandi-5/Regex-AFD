let form = document.getElementById("formCinta");        // Formulario para obtener el array
let cajaCinta = document.getElementById("tapeBox");     // Div que representa la cinta en el index.html

let oneStep = document.getElementById("stepBtn");       // Boton para avanazar en la cinta una vez
let autoStep = document.getElementById("autoBtn");      // Boton para avance automatico de la cinta
let reset = document.getElementById("resetBtn");        // Boton para reiniciar la cinta

let regex = /^[\d_]*$/;                                    // Expresion regex a validar
let posDecision = null;

cinta = [];                                             // Arreglo global que representa la cinta
let head = 0;                                           // Cabecera de la cinta
let estado = "q0";                                      // Estado inicial de la MT
let alfabeto = ["1","2","3","4","5","6","7","8","9","_"];

const transiciones = {
    "q0"        : {},
    "q1"        : {},
    "q2"        : {},
    "q3"        : {},
    "q4"        : {},
    "q5"        : {},
    "q6"        : {},
    "qaccept"   : {},
    "qreject"   : {},
};

alfabeto.forEach(simbolo => {
    if (simbolo != "_") 
        transiciones["q0"][simbolo] = {escribir : simbolo, mover : "R", sigEstado : "q1"};
    else
        transiciones["q0"][simbolo] = {escribir : simbolo, mover : "S", sigEstado : "qreject"};
});

alfabeto.forEach(simbolo => {
    if (simbolo != "_") 
        transiciones["q1"][simbolo] = {escribir : simbolo, mover : "R", sigEstado : "q2"};
    else
        transiciones["q1"][simbolo] = {escribir : simbolo, mover : "S", sigEstado : "qreject"};
});

alfabeto.forEach(simbolo => {
    if (simbolo != "_") 
        transiciones["q2"][simbolo] = {escribir : simbolo, mover : "R", sigEstado : "q3"};
    else
        transiciones["q2"][simbolo] = {escribir : simbolo, mover : "S", sigEstado : "qreject"};
});

alfabeto.forEach(simbolo => {
    if (simbolo != "_") 
        transiciones["q3"][simbolo] = {escribir : simbolo, mover : "R", sigEstado : "q4"};
    else
        transiciones["q3"][simbolo] = {escribir : simbolo, mover : "S", sigEstado : "qreject"};
});

alfabeto.forEach(simbolo => {
    if (simbolo != "_") 
        transiciones["q4"][simbolo] = {escribir : simbolo, mover : "R", sigEstado : "q5"};
    else
        transiciones["q4"][simbolo] = {escribir : simbolo, mover : "S", sigEstado : "qaccept"};
});

alfabeto.forEach(simbolo => {
    if (simbolo != "_") 
        transiciones["q5"][simbolo] = {escribir : simbolo, mover : "R", sigEstado : "q6"};
    else
        transiciones["q5"][simbolo] = {escribir : simbolo, mover : "S", sigEstado : "qreject"};
});

alfabeto.forEach(simbolo => {
    if (simbolo != "_") 
        transiciones["q6"][simbolo] = {escribir : simbolo, mover : "R", sigEstado : "qreject"};
    else
        transiciones["q6"][simbolo] = {escribir : simbolo, mover : "S", sigEstado : "qaccept"};
});

alfabeto.forEach(simbolo => {
    transiciones["qreject"][simbolo] = {escribir : simbolo, mover : "S", sigEstado : "qreject"};
    transiciones["qaccept"][simbolo] = {escribir : simbolo, mover : "S", sigEstado : "qaccept"};
});

function renderCinta() { 
    cajaCinta.innerHTML = "";

    cinta.forEach((simbolo, index) => {
        // Crear una celda
        const celda = document.createElement("div");
        celda.textContent = simbolo;
        celda.classList.add(
            "border", "p-2", "text-center"
        );
        celda.style.width = "40px";

        // Validar si es la cabecera de la cinta
        if (index === head) {
            celda.style.background = "#cce5ff";    
            celda.style.border = "2px solid #007bff";
            celda.style.fontWeight = "bold";
        }

        // Posicion de decision si es cadena valida o no
        if(index == posDecision){
            if(estado == "qaccept")
                celda.style.background = "#7bfc76ff";
            else
                celda.style.background = "#f58888ff";
        }

        cajaCinta.appendChild(celda);
    });
}

form.addEventListener("submit", (e) =>{

    e.preventDefault();
    const inputCinta = document.getElementById("inputTape");
    const valor = inputCinta.value.trim();

    if(regex.test(valor)){
        head = 0;
        estado = "q0";
        posDecision = null;
        cinta = valor.split("");
        renderCinta();
    }else {
        cinta = [];
        cajaCinta.innerHTML = "<span class=text-muted>Cadena no válida</span>";
    }
})

function step(){

    if (estado === "qaccept" || estado === "qreject") {
        renderCinta(); 
        return;
    }

    console.log(estado);
    let simboloActual = cinta[head];
    let regla = transiciones[estado][simboloActual];

    if (!regla) {
        estado = "qreject"
        return;
    }

    if ((regla.sigEstado == "qaccept") ||(regla.sigEstado == "qreject"))
        posDecision = head;

    // Escribir en cinta
    cinta[head] = regla.escribir;

    // Mover cinta
    if (regla.mover == "R")
        head++;

    // Nuevo estado
    estado = regla.sigEstado;

    renderCinta();
}

oneStep.addEventListener("click", ()=>{
    let tamano = cinta.length;
    if ((tamano > 0) && (head < tamano)) {
        step();    
    }
})

reset.addEventListener("click", ()=>{
    head = 0;
    estado = "q0";
    posDecision = null;
    renderCinta();
})

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function autoRun() {
    while (estado !== "qaccept" && estado !== "qreject") {
        await delay(3000);
        step();
    }
}

autoStep.addEventListener("click", ()=>{
    autoRun();
})