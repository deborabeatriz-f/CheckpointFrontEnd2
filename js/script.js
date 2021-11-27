let formulario = document.querySelector('.nova-tarefa')
let btn = document.querySelector('#adicionar')
let tarefa = document.getElementById('tarefa')
let dataCriacao = document.getElementById('dataCriacao')
let data = document.getElementById('data')
let lista = document.querySelector('ul')
let desc = document.getElementById('desc')
dataCriacao.value = new Date().toISOString().slice(0, 10)

// Dados da aplicação
const estado = {
  tarefas: []
}

// Função que será chamada sempre que uma tarefa for adicionada ou removida do estado
function renderizarTarefas() {
  if (estado.tarefas.length === 0) {
    lista.innerHTML = '<p>Não há tarefas</p>'
  }
  lista.innerHTML = estado.tarefas.map(
    tarefa => `
      <li>
        <div class="card" data-id="${tarefa.id}">
          <p>Tarefa: ${tarefa.titulo}</p>
          <p>Descrição: ${tarefa.descricao}</p>
          <p>Data de Criação: ${tarefa.dataCriacao}</p>
          <p>Data Limite: ${tarefa.dataLimite}</p>
          <button class="remover-tarefa">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </li>
    `
  )
}

// Event handler: Envio do formulário
function adicionarTarefa(event) {
  event.preventDefault()

  if (!validarCampos()) return

  const novaTarefa = {
    id: Date.now(),
    titulo: tarefa.value,
    dataCriacao: dataCriacao.value,
    dataLimite: data.value,
    descricao: desc.value,
    completado: false
  }

  estado.tarefas.push(novaTarefa)
  limparFormulario()
  renderizarTarefas()
}

function removerTarefa(event) {
  if (!event.target.closest('.remover-tarefa')) return

  const confirmarExclusao = confirm('Deseja mesmo excluir a tarefa?')
  if (!confirmarExclusao) return

  const tarefaId = event.target.closest('.card').dataset.id
  const tarefaIndex = estado.tarefas.findIndex(tarefa => tarefa.id == tarefaId)

  estado.tarefas.splice(tarefaIndex)
  renderizarTarefas()
}

// Função utilitária: Limpa os campos do formulário
function limparFormulario() {
  tarefa.value = ''
  data.value = ''
  desc.value = ''
}

// Função utilitária: Valida os campos do formulário
function validarCampos() {
  if (desc.value.length < 10) {
    alert('A descrição deve ter no mínimo 10 caracteres')
    return false
  } else if (tarefa.value.length == 0) {
    alert("O campo 'tarefa' não pode ficar vazio.")
    return false
  } else if (data.value == '') {
    alert('Favor, preencher a data')
    return false
  }
  return true
}

// Event Listeners
document.addEventListener('DOMContentLoaded', renderizarTarefas)
formulario.addEventListener('submit', adicionarTarefa)
lista.addEventListener('click', removerTarefa)

// Temas
let branco = document.getElementById('branco')
let amareloEscuro = document.getElementById('amareloEscuro')
let azulTurquesa = document.getElementById('azulTurquesa')
let dark = document.getElementById('dark')

branco.onclick = function () {
  let tema = document.getElementsByTagName('link')[0]
  tema.setAttribute('href', './css/styleBranco.css')
}

amareloEscuro.onclick = function () {
  let tema = document.getElementsByTagName('link')[0]
  tema.setAttribute('href', './css/styleAmareloEscuro.css')
}

azulTurquesa.onclick = function () {
  let tema = document.getElementsByTagName('link')[0]
  tema.setAttribute('href', './css/styleAzulTurquesa.css')
}

dark.onclick = function () {
  let tema = document.getElementsByTagName('link')[0]
  tema.setAttribute('href', './css/styleDark.css')
}
