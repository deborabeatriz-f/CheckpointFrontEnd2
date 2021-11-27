let formulario = document.querySelector('.nova-tarefa');
let btn = document.querySelector('#adicionar');
let tarefa = document.getElementById('tarefa');
let dataCriacao = document.getElementById('dataCriacao');
let data = document.getElementById('data');
let lista = document.querySelector('ul');
let desc = document.getElementById('desc');
dataCriacao.value = new Date().toISOString().slice(0, 10);

// Dados da aplicação
const estado = {
  tarefas: [],
};

// Função que será chamada sempre que uma tarefa for adicionada ou removida do estado
function renderizarTarefas() {
  if (estado.tarefas.length === 0) {
    lista.innerHTML = '<p>Não há tarefas</p>';
  }
  lista.innerHTML = estado.tarefas.map(
    (tarefa) => `
      <li>
        <div class="card">
          <p>Tarefa: ${tarefa.titulo}</p>
          <p>Data de Criação: ${tarefa.dataCriacao}</p>
          <p>Data Limite: ${tarefa.dataLimite}</p>
          <i class="fas fa-trash"></i>
        </div>
      </li>
    `
  );
}

// Event handler: Envio do formulário
function adicionarTarefa(event) {
  event.preventDefault();

  const novaTarefa = {
    id: Date.now(),
    titulo: tarefa.value,
    dataCriacao: dataCriacao.value,
    dataLimite: data.value,
    descricao: desc.value,
    completado: false,
  };

  estado.tarefas.push(novaTarefa);

  limparFormulario();
  renderizarTarefas();
}

// Função utilitária: Limpa os campos do formulário
function limparFormulario() {
  tarefa.value = '';
  data.value = '';
  desc.value = '';
}

// Função utilitária: Valida os campos do formulário
function validarCampos() {
  if (desc.value.length < 10) {
    return alert('A descrição deve ter no mínimo 10 caracteres');
  } else if (tarefa.value.length == 0) {
    return alert("O campo 'tarefa' não pode ficar vazio.");
  } else if (data.value == '') {
    return alert('Favor, preencher a data');
  }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', renderizarTarefas);
formulario.addEventListener('submit', adicionarTarefa);
