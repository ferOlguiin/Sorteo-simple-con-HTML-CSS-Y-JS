const participantes = document.getElementById("inputParticipantes");
const numeroDeGanadores = document.getElementById("inputNumeros");
const boton = document.getElementById("btn");
const btnParticipantes = document.getElementById("btnParticipantes");

const listaDePremios = document.getElementById("listaDePremios");
const botonPremios = document.getElementById("btnPremios");
const template = document.getElementById("template");
const fragment = document.createDocumentFragment();
const tituloPremio = document.getElementById("tituloPremios");

const divGanadores = document.getElementById("sorteoGanadores");
const templateGanadores = document.getElementById("templateGanadores");
const titulo = document.getElementById("titulo");
const ganadores = document.getElementById("ganadores");
const pintarGanadores = document.getElementById("pintarGanadores");
const volverAsortear = document.getElementById("reset");

btnParticipantes.addEventListener('click', () => {
    const lista = participantes.value;
    const listaLimpia = lista.replaceAll(" ", " 🌵 ");
    return Swal.fire({
        title: 'Participantes',
        text: `${listaLimpia}`,
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
})


botonPremios.addEventListener("click", (e) => {
    e.preventDefault();
    const valorG = numeroDeGanadores.value;
    const identif = 0;
    if(valorG > 0){
        tituloPremio.classList.remove("d-none");
        for(let i = 0; i < valorG; i++){
            const clone = template.content.cloneNode(true);
            clone.querySelector('input').setAttribute("id", identif+i);
            fragment.appendChild(clone);
            listaDePremios.appendChild(fragment);
        }
    } else {
        return (Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se permiten números negativos, coloca un número superior a cero en el formulario de "Nº de ganadores"',
          }))
    }
});

boton.addEventListener("click", () => {
    if(participantes.value === "" || numeroDeGanadores.value === ""){
        return (Swal.fire({
            icon: 'error',
            title: 'Campos incompletos',
            text: 'Primero debes completar los dos campos para poder sortear',
          })) 
    }
    const framgentoGanadores = document.createDocumentFragment();
    const valorWin = numeroDeGanadores.value;
    const valorP = participantes.value;
    const ordenados = valorP.split(" ");
    
    titulo.classList.remove("d-none");
    ganadores.classList.remove("d-none");
    volverAsortear.classList.remove("d-none");
    
    for(let i = 0; i < valorWin; i++){
        const elemento = document.createElement('h5');
        elemento.classList.add("fw-bold");
        const medallas = ["🥇", "🥈", "🥉", "🔹", "🔹", "🔹", "🔹", "🔹", "🔹", "🔹"];
        const longitudArr = ordenados.length - 1;
        const aleatorio = Math.random()*1.5;
        
        if(document.getElementById(i) === null){
            elemento.textContent = medallas[i] + ordenados.splice(Math.round(Math.random() * (longitudArr - aleatorio) +aleatorio),1);
        } else {
            elemento.textContent = medallas[i] + ordenados.splice(Math.round(Math.random() * (longitudArr - aleatorio) +aleatorio),1) + " ganó " + document.getElementById(i).value.toLowerCase();
        }
        framgentoGanadores.appendChild(elemento);
        pintarGanadores.appendChild(framgentoGanadores);

    }    
    boton.setAttribute("disabled", "true");
})
