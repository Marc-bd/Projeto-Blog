import { Api } from "../models/api.js";

class novoUsuario {
  constructor(username, email, avatarUrl, password) {
    this.username = username;
    this.email = email;
    this.avatarUrl = avatarUrl;
    this.password = password;
  }
}

const userNameCadastro = document.querySelector(".username-cadastro");
const emailCadastro = document.querySelector(".email-cadastro");
const uploadFotoCadastro = document.getElementById("fileupload");
const senhaCadastro = document.querySelector(".senhaCadastro");
const buttonEnvioFormularioCadastro = document.querySelector(".btn-cadastro");

buttonEnvioFormularioCadastro.addEventListener(
  "click",
  enviarDadosFormulariodeCadastro
);
function enviarDadosFormulariodeCadastro(event) {
  event.preventDefault();

  console.log(userNameCadastro.value);
  console.log(emailCadastro.value);
  console.log(uploadFotoCadastro.value);
  console.log(senhaCadastro.value);

  const dadosNovoUsuario = new novoUsuario(
    userNameCadastro.value,
    emailCadastro.value,
    uploadFotoCadastro.value,
    senhaCadastro.value
  );

  console.log(dadosNovoUsuario);

  Api.criarUsuario(dadosNovoUsuario);
  limparFormulário();
}

function limparFormulário() {
  userNameCadastro.value = "";
  emailCadastro.value = "";
  uploadFotoCadastro.value = "";
  senhaCadastro.value = "";
}

/*userNameCadastro
emailCadastro
uploadFotoCadastro
senhaCadastro
*/
