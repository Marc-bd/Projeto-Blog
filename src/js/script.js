//DIRECIONAR A PAGINA DE CADASTRO OU LOGIN
const btnCadastrar = document.getElementById("btn-cadastro");
const btnLogin = document.getElementById("btn-login");

btnCadastrar.addEventListener("click", direcionarPaginaCadastro);
btnLogin.addEventListener("click", direcionarPaginaLogin);

function direcionarPaginaCadastro(event) {
  window.location = "./src/pages/cadastro.html";
}

function direcionarPaginaLogin(event) {
  window.location = "./src/pages/login.html";
}
/*-------------------------------------------------------------------*/
