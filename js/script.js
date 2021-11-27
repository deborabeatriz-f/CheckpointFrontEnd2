let btn = document.querySelector("#adicionar");
let tarefa = document.getElementById("tarefa");
let dataCriacao = document.getElementById("dataCriacao");
let data = document.getElementById("data");

//Data Formatada - Inacabado

dataCriacao.value = new Date().toISOString().slice(0, 10);
let dataFormatada = ((data.getDate() )) + "/" + ((data.getMonth() + 1)) + "/" + data.getFullYear(); 
console.log(dataFormatada);




let lista = document.querySelector("ul");

// Botão
btn.addEventListener("click", (event) => {
  event.preventDefault();

  let listaTarefas = document.createElement("li");

  listaTarefas.innerText = `Tarefa: ${tarefa.value}. Criação da tarefa: ${dataCriacao.value}. Previsão de finalização da tarefa: ${data.value}.`;

  lista.appendChild(listaTarefas);
});
