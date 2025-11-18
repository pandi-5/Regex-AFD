let form = document.getElementById("formCinta");        // Formulario para obtener el array
let cajaCinta = document.getElementById("tapeBox");     // Div que representa la cinta en el index.html

let oneStep = document.getElementById("stepBtn");       // Boton para avanazar en la cinta una vez
let autoStep = document.getElementById("autoBtn");     // Boton para avance automatico de la cinta
let reset = document.getElementById("resetBtn");        // Boton para reiniciar la cinta

let regex = /^(\d{4}|\d{6})$/;                          // Expresion regex a validar

cinta = [];                                             // Arreglo global que representa la cinta
let head = 0;                                           // Cabecera de la cinta

function renderCinta(cinta, head) {
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

        cajaCinta.appendChild(celda);
    });
}

form.addEventListener("submit", (e) =>{

    e.preventDefault();
    const inputCinta = document.getElementById("inputTape");
    const valor = inputCinta.value.trim();

    if(regex.test(valor)){
        head = 0;
        cinta = valor.split("");
        renderCinta(cinta, head);
    }else {
        cinta = [];
        cajaCinta.innerHTML = "<span class=text-muted>Cadena no válida</span>";
    }
})

oneStep.addEventListener("click", ()=>{
    let tamano = cinta.length;
    if ((tamano > 0) && (head < tamano-1)) {
        head++;
        renderCinta(cinta, head);
    }
})

reset.addEventListener("click", ()=>{
    let tamano = cinta.length;
    if (tamano > 0) {
        head = 0;
        renderCinta(cinta, head);
    }
})

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function autoRun() {
    let tamano = cinta.length;
    while ((tamano > 0) && (head < tamano - 1)) {
        await delay(3000); // 3 segundo entre pasos
        head++;
        renderCinta(cinta, head);
    }
}

autoStep.addEventListener("click", ()=>{
    autoRun();
})