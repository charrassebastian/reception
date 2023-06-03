import { useState } from 'react';

export function EditableSpot({ initialSpot, handleDelete, handleSave }){
    const [spot, setSpot] = useState(initialSpot);

    function handleNumberChange(e){
        setSpot({
            ...spot,
            number: e.target.value
        });
    }

    function handleAvailabilityChange(){
        setSpot({
            ...spot,
            available: !spot.available
        })
    }

    return (
        <div data-testid='editableSpot'>
            <label htmlFor='editableSpotNumber'>Número de puesto</label>
            <input id='editableSpotNumber' type='number' value={spot.number} onChange={e => handleNumberChange(e)}></input>
            <label htmlFor='editableSpotAvailability'>¿Está libre?</label>
            <input id='editableSpotAvailability' type="checkbox" checked={spot.available} onChange={handleAvailabilityChange}/>
            <button onClick={() => handleSave(spot)}>Guardar</button>
            <button onClick={() => handleDelete(spot.id)}>Eliminar</button>
        </div>
    );
}
