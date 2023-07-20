import { useQuery } from 'react-query'
import axios from 'axios'
import { baseUrl } from '../api/url/url'
import { useState, useEffect } from 'react';

const freeSpotsTitle = 'Los puestos libres son los siguientes';

const notifyAvailableSpotsWithSpeechSynthesis = availableSpots => {
    const utterance = new SpeechSynthesisUtterance();
    utterance.lang = 'es-AR';
    const availableSpotsText = availableSpots.reduce((acc, e) => acc + ', ' + e.name, '');
    utterance.text = freeSpotsTitle + availableSpotsText;
    speechSynthesis.speak(utterance);
}

export function Spots() {
    const { data, isError, isLoading, error } = useQuery({
        queryKey: ['spots'],
        queryFn: () => axios.get(baseUrl + 'spots').then(res => res.data),
        refetchInterval: 200
    })
    const [shouldSpeak, setShouldSpeak] = useState(false)

    useEffect(() => {
        if (shouldSpeak && data?.length) {
            const availableSpots = data.filter(spot => spot.available);
            if (availableSpots.length) {
                notifyAvailableSpotsWithSpeechSynthesis(availableSpots);
            }
        }
        return () => {}
    }, [shouldSpeak, data])

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
            <h1 className="text-xl">{freeSpotsTitle}</h1>
            <button onClick={() => setShouldSpeak(prev => !prev)}>{shouldSpeak ? 'mutear' : 'desmutear'}</button>
            {availableSpots?.length ? availableSpots.map(spot => <li key={spot._id}>{spot.name}</li>) : <p>Ninguno</p>}
        </div>
    )
}
