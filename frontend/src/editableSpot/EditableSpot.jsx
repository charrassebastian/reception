import { useState } from 'react';
import { useMutation, QueryClient } from 'react-query';
import axios from 'axios';
import { baseUrl } from '../api/url/url';

const queryClient = new QueryClient();

export function EditableSpot({ initialSpot }) {
    const serverSpot = initialSpot
    const [localSpot, setLocalSpot] = useState(serverSpot)
    const [isBeingEdited, setIsBeingEdited] = useState(false)
    const spot = isBeingEdited ? localSpot : serverSpot
    const saveSpot = useMutation({
        mutationFn: spot => {
            axios.put(baseUrl + 'spots/' + spot._id, spot)
            queryClient.invalidateQueries('spots');
        }
    }).mutate;
    const deleteSpot = useMutation({
        mutationFn: spot => {
            axios.delete(baseUrl + 'spots/' + spot._id)
            queryClient.invalidateQueries('spots');
        }
    }).mutate;

    function handleNameChange(e) {
        setLocalSpot({
            ...spot,
            name: e.target.value
        });
    }

    function handleAvailabilityChange() {
        setLocalSpot({
            ...spot,
            available: !spot.available
        })
    }

    function handleEdit() {
        setIsBeingEdited(prev => !prev);
        setLocalSpot(serverSpot);
    }

    function handleSave() {
        saveSpot(spot);
        setIsBeingEdited(false);
    }

    function handleDelete() {
        deleteSpot(spot);
        setIsBeingEdited(false);
    }

    return (
        <div data-testid='editableSpot' className='my-5'>
            <label htmlFor={'name' + spot._id} className='mr-5'>Número de puesto:</label>
            <input disabled={!isBeingEdited} id={'name' + spot._id} value={spot.name} onChange={e => handleNameChange(e)} className='mx-2 py-1 px-3 rounded-md bg-sky-100'></input>
            <label htmlFor={'availability' + spot._id} className='mx-5'>¿Está libre?</label>
            <input disabled={!isBeingEdited} id={'availability' + spot._id} type="checkbox" checked={spot.available} onChange={handleAvailabilityChange} className='mx-2'/>
            <button onClick={handleEdit} className='bg-sky-500 text-white rounded-md py-1 px-3 mx-2'>{isBeingEdited ? 'Dejar de editar' : 'Editar'}</button>
            {isBeingEdited && <button onClick={handleSave} className='bg-green-500 text-white rounded-md py-1 px-3 mx-2'>Guardar</button>}
            {isBeingEdited && <button onClick={handleDelete} className='bg-red-500 text-white rounded-md py-1 px-3 mx-2'>Eliminar</button>}
        </div>
    );
}
