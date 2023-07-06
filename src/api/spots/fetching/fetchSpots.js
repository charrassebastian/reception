export async function fetchSpots(){
    const url = 'https://localhost:8082/api/spots';
    const data = await fetch(url);
    const res = await data.json;
    return res;
}