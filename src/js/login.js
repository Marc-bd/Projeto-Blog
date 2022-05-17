import { Api } from "../models/api.js";

class loginUsuario {
  constructor(email, password) {
    this.email = email;
    this.password = password;
  }
}

const emailLogin = document.querySelector(".emailLogin");
const passwordLogin = document.querySelector(".passwordLogin");
const btnEnviarDadosParaLogin = document.querySelector(".btnLoginusuario");

btnEnviarDadosParaLogin.addEventListener("click", enviarDadosLogin);

function enviarDadosLogin(event) {
  event.preventDefault();
  console.log(emailLogin.value, passwordLogin.value);
  const dadosLogin = new loginUsuario(emailLogin.value, passwordLogin.value);

  Api.logarUsuario(dadosLogin);

  console.log(dadosLogin);
  emailLogin.value = "";
  passwordLogin.value = "";

  //Api.logarUsuario(userTeste);
}
