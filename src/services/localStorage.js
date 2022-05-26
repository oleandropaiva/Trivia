const TOKEN = 'token';

if (!localStorage.getItem(TOKEN)) { // Verificando se existe a key Token -- EM STRING
// if (!JSON.parse(localStorage.getItem(TOKEN))) { // Verificando se existe a key Token - EM JS
  localStorage.setItem(TOKEN, JSON.stringify([])); // Cria a key Token com o array vazio
}

const saveTokenUser = (token) => localStorage
  .setItem(TOKEN, (token));

// const readTokenUser = () => JSON.parse(localStorage.getItem(TOKEN)); // Recebe em JS
const readTokenUser = () => localStorage.getItem(TOKEN); // Recebe em String

/* _______________________________________________________________ */

// escrita - Grava no Storage
export const addTokenLocalStorage = (token) /* => new Promise((resolve) */ => {
  if (token) {
    // const tokenAccess = readTokenUser(); // MÉTODO LISTA -- Converte em JS
    // saveTokenUser([...tokenAccess, token]); // MÉTODO LISTA - Armazena

    saveTokenUser(token); // MÉTODO ÚNICO
  }
};

// leitura - Recebe do Storage
export const getTokenLocalStorage = () /* => new Promise((resolve) */ => {
  const tokenAccess = readTokenUser();
  return tokenAccess;
};

export const resetLocalStorage = () => {
  localStorage.setItem(TOKEN, JSON.stringify([]));
};
