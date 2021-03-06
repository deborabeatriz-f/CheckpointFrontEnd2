let formulario = document.querySelector('.nova-tarefa');
let btn = document.querySelector('#adicionar');
let tarefa = document.getElementById('tarefa');
let dataCriacao = document.getElementById('dataCriacao');
let data = document.getElementById('data');
let lista = document.querySelector('ul');
let desc = document.getElementById('desc');
dataCriacao.value = new Date().toISOString().slice(0, 10);

let dateOptions = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };

// Dados da aplicação
const estado = {
  tarefas: [],
};

// Função que será chamada sempre que uma tarefa for adicionada ou removida do estado
function renderizarTarefas() {
  if (estado.tarefas.length === 0) {
    lista.innerHTML = '<p>Não há tarefas</p>';
    return;
  }
  lista.innerHTML = estado.tarefas
    .map((tarefa) => {
      const dataCriacao = new Date(tarefa.dataCriacao);
      const dataLimite = new Date(tarefa.dataLimite);

      return `
        <li>
          <div class="card" data-id="${tarefa.id}">
            <input type="checkbox" id="tarefa${tarefa.id}" ${tarefa.completada ? 'checked' : ''} />
            <label for="tarefa${tarefa.id}">
              ${tarefa.titulo}
            </label>
            <p>Descrição: ${tarefa.descricao}</p>
            <p>Data de Criação: ${dataCriacao.toLocaleDateString('PT-BR', dateOptions)}</p>
            <p>Data Limite: ${dataLimite.toLocaleDateString('PT-BR', dateOptions)}</p>
            <button class="remover-tarefa">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </li>
      `;
    })
    .join('');
}

// Verificar se há terefas no localStorage e guardar no estado
function carregarLocalStorag() {
  const tarefasLocalStorage = localStorage.getItem('tarefas');
  if (tarefasLocalStorage) {
    estado.tarefas = JSON.parse(tarefasLocalStorage);
  }
}

// Event handler: Envio do formulário
function adicionarTarefa(event) {
  event.preventDefault();

  if (!validarCampos()) return;

  let dateTimeNow = new Date();
  let hourNow = ('0' + dateTimeNow.getHours()).slice(-2);
  let minuteNow = ('0' + dateTimeNow.getMinutes()).slice(-2);
  let secondNow = ('0' + dateTimeNow.getSeconds()).slice(-2);

  let timeStrNow = hourNow + ':' + minuteNow + ':' + secondNow;

  let dataCriacaoNow = new Date(dataCriacao.value + 'T' + timeStrNow);
  let dataUTCNow = new Date(data.value + 'T' + timeStrNow);

  const novaTarefa = {
    id: Date.now(),
    titulo: tarefa.value,
    dataCriacao: dataCriacaoNow,
    dataLimite: dataUTCNow,
    descricao: desc.value,
    completada: false,
  };

  limparFormulario();

  estado.tarefas.push(novaTarefa);
  localStorage.setItem('tarefas', JSON.stringify(estado.tarefas));
  renderizarTarefas();

  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: 'Tarefa adicionada!',
    showConfirmButton: false,
    timer: 2000,
    width: 300
  });
}

// Event handler: Clique no botão de excluir
function removerTarefa(event) {
  if (!event.target.closest('.remover-tarefa')) return;

  Swal.fire({
    title: 'Deseja mesmo excluir a tarefa?',
    text: "Esta ação não poderá ser revertida!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sim, excluir!',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      const tarefaId = event.target.closest('.card').dataset.id;
      const tarefaIndex = estado.tarefas.findIndex((tarefa) => tarefa.id == tarefaId);

      console.log(tarefaIndex);

      estado.tarefas.splice(tarefaIndex, 1);
      localStorage.setItem('tarefas', JSON.stringify(estado.tarefas));

      renderizarTarefas();

      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Tarefa excluída!',
        showConfirmButton: false,
        timer: 2000,
        width: 300
      })
    }
  })

  
}

// Event handler: Marcar / Desmarcar tarefa
function atualizarTarefa(event) {
  if (!event.target.matches('input[type="checkbox"]')) return;

  const tarefaId = event.target.closest('.card').dataset.id;
  const tarefaSelecionada = estado.tarefas.find((tarefa) => tarefa.id == tarefaId);

  tarefaSelecionada.completada = event.target.checked;
  localStorage.setItem('tarefas', JSON.stringify(estado.tarefas));
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
    alert('A descrição deve ter no mínimo 10 caracteres');
    return false;
  } else if (tarefa.value.length == 0) {
    alert("O campo 'tarefa' não pode ficar vazio.");
    return false;
  } else if (data.value == '') {
    alert('Favor, preencher a data');
    return false;
  }
  return true;
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  carregarLocalStorag();
  renderizarTarefas();
});
formulario.addEventListener('submit', adicionarTarefa);
lista.addEventListener('click', removerTarefa);
lista.addEventListener('change', atualizarTarefa);
