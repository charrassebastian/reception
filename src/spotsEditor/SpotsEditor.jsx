import { useState } from 'react';
import { EditableSpot } from '../editableSpot/EditableSpot';
import { useQuery, QueryClient, useMutation } from 'react-query';
import { fetchSpots } from '../api/spots/fetching/fetchSpots';
import { baseUrl } from '../api/url/url';

const queryClient = new QueryClient();

export function SpotsEditor() {
    const { isError, isLoading, data, error } = useQuery('spots', fetchSpots, {
        refetchInterval: 200
    });
    const addSpot = useMutation(spot => axios.post(baseUrl + 'spots'));
    
    const [newSpotNumber,
        setNewSpotNumber] =
        useState(1);

    if (isLoading) {
        return (
            <div data-testid="spotsEditor">
                <h1>Editor de puestos</h1>
                <h2>Cargando...</h2>
            </div>
        );
    }

    if (isError) {
        return (
            <div data-testid="spotsEditor">
                <h1>Editor de puestos</h1>
                <h2>Ha ocurrido un error al cargar los puestos, pruebe recargar la pagina</h2>
            </div>
        );
    }

    const spotCollection = data;

    function handleAdd() {
        const id = spotCollection[spotCollection.length - 1].id + 1;
        addSpot({ id: id, number: newSpotNumber, available: false });
    }

    return (
        <div data-testid="spotsEditor">
            <h1>Editor de puestos</h1>
            <h2 className="text-xl">Puede editar los siguientes puestos:</h2>
            {spotCollection?.length ?
                <ul>
                    {spotCollection.map(spot => <EditableSpot key={spot.id.toString()} initialSpot={spot}/>)}
                </ul>
                : <p>Ninguno</p>}
            <h2 className="text-xl">Puede agregar un nuevo puesto:</h2>
            <div>
                <label htmlFor="newSpotInput">Número de puesto</label>
                <input id="newSpotInput" type="number" onChange={e => setNewSpotNumber(e.target.value)} value={newSpotNumber}></input>
                <button onClick={handleAdd}>Agregar puesto</button>
            </div>
        </div>
    )
}
