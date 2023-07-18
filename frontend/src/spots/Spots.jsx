import { useQuery } from 'react-query'
import { fetchSpots } from '../api/spots/fetching/fetchSpots'

const notifyAvailableSpotsWithSpeechSynthesis = availableSpots => {
    const utterance = new SpeechSynthesisUtterance();
    const strAvailableSpots = availableSpots.reduce((acc, e) => acc + ', ' + e);
    utterance.lang = 'es-AR';
    utterance.text = availableSpots ? 'No hay puestos libres' : 'Los puestos libres son los siguientes' + strAvailableSpots;
    speechSynthesis.speak(utterance);
}

export function Spots() {
    const { data, isError, isLoading, error} = useQuery('spots', fetchSpots, { refetchInterval: 200})

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
    notifyAvailableSpotsWithSpeechSynthesis(availableSpots);
    return (
        <div data-testid="spots">
            <h1 className="text-xl">A continuación se encuentran los puestos disponibles:</h1>
            {availableSpots?.length ? availableSpots.map(spot => <li key={spot._id}>{spot.name}</li>) : <p>Ninguno</p>}
        </div>
    )
}
