let btn = document.querySelector("#adicionar");
let tarefa = document.getElementById("tarefa");
let dataCriacao = document.getElementById("dataCriacao");
let data = document.getElementById("data");
let lista = document.querySelector("ul");
let desc = document.getElementById('desc')
dataCriacao.value = new Date().toISOString().slice(0, 10);


// Adicionando tarefas
btn.addEventListener("click", (event) => {
  event.preventDefault();

  // validando os campos
  if (desc.value.length < 10) {
    return alert('A descrição deve ter no mínimo 10 caracteres')
  } else if (tarefa.value.length == 0) {
    return alert("O campo 'tarefa' não pode ficar vazio.")
  } else if (data.value == "") {
    return alert('Favor, preencher a data')
  } else {

    let listaTarefas = document.createElement("li");
    //mudei de innerText pra innerHTML
    listaTarefas.innerHTML = `Tarefa: ${tarefa.value}. Criação da tarefa: ${dataCriacao.value}. Previsão de finalização da tarefa: ${data.value}. <i class="fas fa-trash"></i>`;

    lista.appendChild(listaTarefas);
  }
})


