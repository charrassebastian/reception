import { useState } from 'react';
import { useSpots } from '../hooks/fetching/spots/useSpots';

export function SpotsEditor() {
    const [spots, updateSpot, deleteSpot, addSpot] = useSpots();
    const [newSpotNumber, setNewSpotNumber] = useState(spots?.length + 1 || 1);
    return (
        <div data-testid="spotsEditor">
            <h1>Editor de puestos</h1>
            <h2 className="text-xl">Puede editar los siguientes puestos:</h2>
            {spots?.length ?
                <ul>
                    {spots.map(spot => spot?.id ? <li key={spot.id.toString()}>{spot.number}<button>Guardar</button></li> : undefined)}
                </ul>
                : <p>Ninguno</p>}
            <h2 className="text-xl">Puede agregar un nuevo puesto:</h2>
            <div>
                <label htmlFor="newSpotNumber">Número de puesto</label>
                <input id="newSpotNumber" type="number" onChange={e => setNewSpotNumber(e.target.value)} value={newSpotNumber}></input>
                <button onClick={() => addSpot(newSpotNumber)}>Agregar puesto</button>
            </div>
        </div>
    );
}