import { useState } from 'react';
import { useMutation, QueryClient } from 'react-query';
import axios from 'axios';
import { baseUrl } from '../api/url/url';

const queryClient = new QueryClient();

export function EditableSpot({ initialSpot }){
    const [spot, setSpot] = useState(initialSpot);
    const saveSpot = useMutation(spot => axios.put(baseUrl + 'spots' + spot._id, spot));
    const deleteSpot = useMutation(spot => axios.delete(baseUrl + 'spots/' + spot._id));

    function handleNameChange(e){
        setSpot({
            ...spot,
            name: e.target.value
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
            <label htmlFor='editableSpotName'>Número de puesto</label>
            <input id='editableSpotName' value={spot.name} onChange={e => handleNameChange(e)}></input>
            <label htmlFor='editableSpotAvailability'>¿Está libre?</label>
            <input id='editableSpotAvailability' type="checkbox" checked={spot.available} onChange={handleAvailabilityChange}/>
            <button onClick={handleSave}>Guardar</button>
            <button onClick={handleDelete}>Eliminar</button>
        </div>
    );
}
