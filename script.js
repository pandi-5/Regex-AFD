let form = document.getElementById("formCinta");        // Formulario para obtener el array
let cajaCinta = document.getElementById("tapeBox");     // Div que representa la cinta en el index.html
let oneStep = document.getElementById("stepBtn");       // Boton para avanazar en la cinta una casilla
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
        let cinta = valor.split("");
        renderCinta(cinta, head);
    }else {
        cajaCinta.innerHTML = "<span class=text-muted>Cadena no válida</span>";
    }
})