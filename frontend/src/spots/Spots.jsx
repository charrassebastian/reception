import { useQuery } from 'react-query'
import axios from 'axios'
import { baseUrl } from '../api/url/url'
import { useEffect } from 'react';

const notifyAvailableSpotsWithSpeechSynthesis = availableSpots => {
    const utterance = new SpeechSynthesisUtterance();
    utterance.lang = 'es-AR';
    const availableSpotsText = availableSpots.reduce((acc, e) => acc + ', ' + e.name, '');
    utterance.text = 'Los puestos libres son los siguientes' + availableSpotsText;
    console.log(utterance.text);
    speechSynthesis.speak(utterance);
}

export function Spots() {
    const { data, isError, isLoading, error } = useQuery({
        queryKey: ['spots'],
        queryFn: () => axios.get(baseUrl + 'spots').then(res => res.data),
        refetchInterval: 200
    })

    useEffect(() => {
        if (data?.length) {
            const availableSpots = data.filter(spot => spot.available);
            if (availableSpots.length) {
                notifyAvailableSpotsWithSpeechSynthesis(availableSpots);
            }
        }
        return () => {}
    }, [data])

    if (isLoading) {
        return (
            <div data-testid="spots">
                <h1>Cargando los puestos disponibles</h1>
            </div>
        )
    }

    if (isError) {
        return (
            <div data-testid="spots">
                <h1>No se pudo cargar los puestos disponibles</h1>
                <p>Este fue el error: {error}</p>
            </div>
        )
    }

    const spots = data;
    const availableSpots = spots.filter(spot => spot.available);
    return (
        <div data-testid="spots">
            <h1 className="text-xl">A continuación se encuentran los puestos disponibles:</h1>
            {availableSpots?.length ? availableSpots.map(spot => <li key={spot._id}>{spot.name}</li>) : <p>Ninguno</p>}
        </div>
    )
}
