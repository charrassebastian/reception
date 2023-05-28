export function Spots({ spots }) {
    const availableSpots = spots && Array.isArray(spots) ? spots.filter(spot => spot.available) : [];
    return (
        <div data-testid="spots">
            <h1 className="text-xl">A continuación se encuentran los puestos disponibles:</h1>
            {availableSpots?.length ? availableSpots.map(spot => <li key={spot.id}>{spot.number}</li>) : <p>Ninguno</p>}
        </div>
    )
}