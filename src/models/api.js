class Api {
  static token = "";
  static userId = "";

  static async criarUsuario(data) {
    const response = await fetch(
      "https://api-blog-m2.herokuapp.com/user/register",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      }
    ).then((res) => {
      if (res.status === 201) {
        window.location.replace("/src/pages/login.html");
        alert(`Cadastro Realizado`);
      } else {
        alert(`Erro no cadastro`);
      }
    });

    console.log(response);
    return response;
  }

  static async logarUsuario(data) {
    const response = await fetch(
      "https://api-blog-m2.herokuapp.com/user/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.status !== "error") {
          Api.token = res.token;
          Api.userId = res.userId;
          console.log(Api.token);
          console.log(Api.userId);
          localStorage.setItem("token", Api.token);
          localStorage.setItem("userid", Api.userId);

          window.location.replace("/src/pages/blog.html");
        } else {
          alert("Verifique os dados do cadastro");
        }
      });
    return response;
  }

  static async listarUsuario(token, userId) {
    const response = await fetch(
      `https://api-blog-m2.herokuapp.com/user/${userId}`,
      {
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((res) => res);

    console.log(response);
    return response;
  }

  static async logoutUser() {
    await localStorage.clear();
    window.location.replace("/index.html");
  }

  static async criarPost(token, data) {
    const response = await fetch("https://api-blog-m2.herokuapp.com/post/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => res);
    console.log(response);
    console.log(token);
    console.log(data);
    return response;
  }

  static async alterarPost(idPost, token, data) {
    const response = await fetch(
      `https://api-blog-m2.herokuapp.com/post/${idPost}`,
      {
        method: "PATCH",
        headers: {
          "'Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    )
      .then((res) => res.json())
      .then((res) => res);
    return response;
  }
}

export { Api };

/*

const userTeste = {
  email: "pedro.costa@kenzie.com.br",
  password: "123",
};*/
