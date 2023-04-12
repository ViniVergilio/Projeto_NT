const axios = require('axios');
module.exports = {  };


// cadastro de usuário
async function cadastrarUsuario(nome, email, senha) {
  try {
    const response = await axios.post('http://localhost:3335/cadastros', {
      nome,
      email,
      senha
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// login do usuário
async function loginUsuario(email, senha) {
  try {
    const response = await axios.post('http://localhost:3335/login', {
      email,
      senha
    });
    return response.data.token;
  } catch (error) {
    console.error(error);
  }
}

// Uso das funções
cadastrarUsuario('Vini', 'Vini@email.com', '123456')
  .then(response => console.log(response))
  .catch(error => console.error(error));

loginUsuario('Vini@email.com', '123456')
  .then(token => console.log(token))
  .catch(error => console.error(error));

