export default async function getApiToken() {
  const recebeAPI = await fetch('https://opentdb.com/api_token.php?command=request');
  const categories = await recebeAPI.json();
  return (categories);
}
