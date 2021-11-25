let btn = document.querySelector("#adicionar");
let tarefa = document.getElementById("tarefa");
let dataCriacao = document.getElementById("dataCriacao");
let data = document.getElementById("data");

dataCriacao.value = new Date().toISOString().slice(0, 10)

// Botão
btn.addEventListener("click", (event) => {
    event.preventDefault();
};
