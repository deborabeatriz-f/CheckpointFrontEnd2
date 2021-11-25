let btn = document.querySelector("#adicionar");
let tarefa = document.getElementById("tarefa");
let dataCriacao = document.getElementById("dataCriacao");
let data = document.getElementById("data");

dataCriacao.value = new Date().toISOString().slice(0, 10);

let lista = document.querySelector("ul");

// Botão
btn.addEventListener("click", (event) => {
  event.preventDefault();

  let listaTarefas = document.createElement("li");

  listaTarefas.innerText = `Tarefa: ${tarefa.value}. Criação da tarefa: ${dataCriacao}. Previsão de finalização da tarefa: ${data}.`;

  lista.appendChild(listaTarefas);
});
