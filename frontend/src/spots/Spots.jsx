const notifyAvailableSpotsWithSpeechSynthesis = availableSpots => {
    const utterance = new SpeechSynthesisUtterance();
    const strAvailableSpots = availableSpots.reduce((acc, e) => acc + ', ' + e);
    utterance.lang = 'es-AR';
    utterance.text = availableSpots ? 'No hay puestos libres' : 'Los puestos libres son los siguientes' + strAvailableSpots;
    speechSynthesis.speak(utterance);
}

export function Spots({ spots }) {
    const availableSpots = spots && Array.isArray(spots) ? spots.filter(spot => spot.available) : [];
    notifyAvailableSpotsWithSpeechSynthesis(availableSpots);
    return (
        <div data-testid="spots">
            <h1 className="text-xl">A continuación se encuentran los puestos disponibles:</h1>
            {availableSpots?.length ? availableSpots.map(spot => <li key={spot.id}>{spot.number}</li>) : <p>Ninguno</p>}
        </div>
    )
}
