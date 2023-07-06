export async function fetchTrivia(){
    const url = 'https://localhost:8082/api/trivia';
    const data = await fetch(url);
    const res = await data.json;
    return res;
}