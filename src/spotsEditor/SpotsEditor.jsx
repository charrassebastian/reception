import { useState } from 'react';
import { useSpots } from '../hooks/fetching/spots/useSpots';
import { EditableSpot } from '../editableSpot/EditableSpot';

export function SpotsEditor() {
    
    const {spots, updateSpot, deleteSpot, addSpot} = useSpots();
    const [newSpotNumber,
        setNewSpotNumber] =
        useState(spots.length + 1);

    function handleAdd(){
        const id = spots[spots.length - 1].id + 1;
        addSpot({id: id, number: newSpotNumber, available: false});
    }

    return (
        <div data-testid="spotsEditor">
            <h1>Editor de puestos</h1>
            <h2 className="text-xl">Puede editar los siguientes puestos:</h2>
            {spots?.length ?
                <ul>
                    {spots.map(spot => <EditableSpot key={spot.id.toString()} initialSpot={spot} handleDelete={deleteSpot} handleSave={updateSpot} />)}
                </ul>
                : <p>Ninguno</p>}
            <h2 className="text-xl">Puede agregar un nuevo puesto:</h2>
            <div>
                <label htmlFor="newSpotInput">Número de puesto</label>
                <input id="newSpotInput" type="number" onChange={e => setNewSpotNumber(e.target.value)} value={newSpotNumber}></input>
                <button onClick={handleAdd}>Agregar puesto</button>
            </div>
        </div>
    );
}