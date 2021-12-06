const btnBranco = document.getElementById('branco');
const btnAmareloEscuro = document.getElementById('amareloEscuro');
const btnAzulTurquesa = document.getElementById('azulTurquesa');
const btnDark = document.getElementById('dark');

btnBranco.addEventListener('click', () => mudarTema('styleBranco'));
btnAmareloEscuro.addEventListener('click', () => mudarTema('styleAmareloEscuro'));
btnAzulTurquesa.addEventListener('click', () => mudarTema('styleAzulTurquesa'));
btnDark.addEventListener('click', () => mudarTema('styleDark'));

function mudarTema(nomeArquivo) {
  const tagLink = document.querySelector('link');
  tagLink.setAttribute('href', `./css/${nomeArquivo}.css`);
}
