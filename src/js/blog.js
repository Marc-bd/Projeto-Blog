import { Api } from "../models/api.js";

const userToken = await localStorage.getItem("token");
const userId = await localStorage.getItem("userid");
const textArea = document.getElementById("textarea-post");
const btnAddPost = document.getElementById("btnAdd");
const postDosUsuarios = document.getElementById("postDosUsuarios");
const textAreaContainer = document.querySelector(".textarea-container");

console.log(userToken);
console.log(userId);

const bancodeDados = [];

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
    const response = await fetch("https://api-blog-m2.herokuapp.com/post/", {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => bancodeDados.push(...res.data));
  }
}

Blog.usuario();
Blog.mostrarPosts(userToken);

console.log(bancodeDados);

function teste(arr) {
  console.log(arr);
  return arr.forEach((post) => console.log(post));
}

console.log(teste(bancodeDados));
