const BASE_URL = 'https://opentdb.com/api.php?amount=5';

export default async function getApiToken() {
  const recebeAPI = await fetch('https://opentdb.com/api_token.php?command=request');
  const categories = await recebeAPI.json();
  return (categories);
}

export async function fetchQuestion(token) {
  try {
    const fetchGetQuestion = await fetch(`${BASE_URL}&token=${token}`);
    const Questions = await fetchGetQuestion.json();
    return Questions.results;
  } catch (error) {
    return console.log(`Token expirado, efetue novo Login - ${error}`);
  }
}
