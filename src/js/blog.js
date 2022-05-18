import { Api } from "../models/api.js";

const userToken = await localStorage.getItem("token");
const userId = await localStorage.getItem("userid");
const textArea = document.getElementById("textarea-post");
const btnAddPost = document.getElementById("btnAdd");
const postDosUsuarios = document.getElementById("postDosUsuarios");
const textAreaContainer = document.querySelector(".textarea-container");

console.log(userToken);
console.log(userId);

class Blog {
  static async usuario() {
    const user = await Api.listarUsuario(userToken, userId);
    console.log(user);
    const fotoPerfilUsuario = document.getElementById("fotoperfil");
    fotoPerfilUsuario.src = user.avatarUrl;

    const nomeusuario = document.getElementById("usarnameBlog");
    nomeusuario.innerText = user.username;
  }

  static async mostrarPosts(token) {
    const response = await fetch("https://api-blog-m2.herokuapp.com/post", {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    const resposta = response.json();

    return resposta;
  }
}

Blog.usuario();

async function renderizarListadePosts() {
  const database = await Blog.mostrarPosts(userToken);
  const posts = database.data;

  await criarListadePosts(posts);
}

renderizarListadePosts();

function criarListadePosts(listaPost) {
  postDosUsuarios;

  listaPost.forEach((post) => {
    const div = document.createElement("div");
    div.setAttribute("class", "post");

    const divfoto = document.createElement("div");
    divfoto.setAttribute("class", "fotoUsuario");

    const imgUsuario = document.createElement("img");
    imgUsuario.setAttribute("class", "fotoUsuario-Post");
    imgUsuario.src = post.owner.avatarUrl;

    const divPostUsuario = document.createElement("div");
    divPostUsuario.setAttribute("class", "postUsuario");

    const nomeUsuario = document.createElement("h3");
    nomeUsuario.setAttribute("class", "nomeUsuarioPost");
    nomeUsuario.innerText = post.owner.username;

    const postUsuario = document.createElement("p");
    postUsuario.setAttribute("class", "postUsuario-blog");
    postUsuario.innerText = post.post;

    const divData = document.createElement("div");
    divData.setAttribute("class", "postConfig");

    if (post.owner.id == userId) {
      const buttonEditar = document.createElement("button");
      buttonEditar.innerText = "Editar";
      buttonEditar.setAttribute("id", "button-editar");
      buttonEditar.setAttribute("dataset", post.id);

      const buttonApagar = document.createElement("button");
      buttonApagar.innerText = "Apagar";
      buttonApagar.setAttribute("id", "button-apagar");
      buttonApagar.setAttribute("dataset", post.id);

      const dataPost = document.createElement("p");
      dataPost.innerText = post.createdAt;

      divData.appendChild(buttonEditar);
      divData.appendChild(buttonApagar);
      divData.appendChild(dataPost);
    } else {
      const dataPost = document.createElement("p");
      dataPost.innerText = post.createdAt;

      divData.appendChild(dataPost);
    }

    divfoto.appendChild(imgUsuario);
    divPostUsuario.appendChild(nomeUsuario);
    divPostUsuario.appendChild(postUsuario);
    div.appendChild(divfoto);
    div.appendChild(divPostUsuario);
    div.appendChild(divData);
    postDosUsuarios.appendChild(div);

    const botaoEditarPost = document.getElementById("button-editar");
    botaoEditarPost.addEventListener("click", editarpost);

    const botaoPostDelete = document.getElementById("button-apagar");
    botaoPostDelete.addEventListener("click", deletarPostSelecionado);
  });
}

btnAddPost.addEventListener("click", criarPostdoUsuario);
async function criarPostdoUsuario() {
  const post = {
    content: `${textArea.value}`,
  };

  await Api.criarPost(userToken, post);
  window.location = "http://127.0.0.1:5500/src/pages/blog.html";
}

const logoutBotao = document.getElementById("btn-logout");
logoutBotao.addEventListener("click", logout);
function logout(event) {
  event.preventDefault();
  Api.logoutUser();
}

function deletarPostBlog(event) {
  event.preventDefault();
  console.log("12");
}

function editarpost(event) {
  const target = event.target;
  const postIdEditar = target.getAttribute("dataset");

  const modalEditar = document.getElementById("modal-editar");
  modalEditar.classList.toggle("modal-on");

  const botaoFecharModal = document.getElementById("botao-fechar-modal");

  botaoFecharModal.addEventListener("click", fecharMOdal);
  function fecharMOdal(event) {
    event.preventDefault();
    modalEditar.classList.toggle("modal-on");
  }

  const botaoEnviarEditadosModal = document.getElementById("EnviarDadosModal");

  botaoEnviarEditadosModal.addEventListener("click", enviarDadosEditadosModal);

  async function enviarDadosEditadosModal(event) {
    const textAreaModal = document.getElementById("textAreaModal");
    const data = {
      newContent: `${textAreaModal.value}`,
    };

    console.log(postIdEditar, userToken, data);

    await Api.alterarPost(postIdEditar, userToken, data);
    window.location = "http://127.0.0.1:5500/src/pages/blog.html";
  }
}

async function deletarPostSelecionado(event) {
  const target = event.target;
  const postIdDeletar = target.getAttribute("dataset");
  await Api.deletarPost(postIdDeletar, userToken);
  window.location = "http://127.0.0.1:5500/src/pages/blog.html";
}
