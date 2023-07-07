import { baseUrl } from '../../url/url';

export async function fetchTrivia(){
    const url = baseUrl + 'trivia';
    const data = await fetch(url);
    const res = await data.json;
    return res;
}