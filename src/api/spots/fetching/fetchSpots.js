import { baseUrl } from '../../url/url';

export async function fetchSpots(){
    const url = baseUrl + 'spots';
    const data = await fetch(url);
    const res = await data.json;
    return res;
}