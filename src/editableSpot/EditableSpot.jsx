import { useState } from 'react';
import { useMutation, QueryClient } from 'react-query';
import axios from 'axios';

const queryClient = new QueryClient();

export function EditableSpot({ initialSpot }){
    const [spot, setSpot] = useState(initialSpot);
    const saveSpot = useMutation(spot => axios.post('https://localhost/spots', spot));
    const deleteSpot = useMutation(spot => axios.delete('https://localhost/spots/' + spot.id));

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

    function handleSave(){
        saveSpot(spot);
    }

    function handleDelete(){
        deleteSpot(spot);
        queryClient.invalidateQueries('spots');
    }

    return (
        <div data-testid='editableSpot'>
            <label htmlFor='editableSpotNumber'>Número de puesto</label>
            <input id='editableSpotNumber' type='number' value={spot.number} onChange={e => handleNumberChange(e)}></input>
            <label htmlFor='editableSpotAvailability'>¿Está libre?</label>
            <input id='editableSpotAvailability' type="checkbox" checked={spot.available} onChange={handleAvailabilityChange}/>
            <button onClick={handleSave}>Guardar</button>
            <button onClick={handleDelete}>Eliminar</button>
        </div>
    );
}
