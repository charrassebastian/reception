import { useEffect, useState } from 'react';
import { useMutation, useQuery, QueryClient } from 'react-query';
import axios from 'axios';
import { baseUrl } from '../api/url/url';
import { Button } from '@fluentui/react-components';

const queryClient = new QueryClient();

export const SimpleSpotEditor = () => {
    const { isError, isLoading, data, error } = useQuery({
        queryKey: ['spots'],
        queryFn: () => axios.get(baseUrl + 'spots').then(res => res.data),
        refetchInterval: 200
    });
    const [editSpotProgressMessage, setEditSpotProgressMessage] = useState('')
    const editSpotMutation = useMutation({
        mutationFn: spot => {
            axios.put(baseUrl + 'spots/' + spot._id, spot)
            queryClient.invalidateQueries('spots');
        }
    });
    const editSpot = spot => {
        editSpotMutation.mutate(spot)
    }
    useEffect(() => {
        let interval = null;
        if (editSpotMutation.isError) {
            setEditSpotProgressMessage('Ocurrió un error: ' + editSpotMutation.error.message);
            interval = setInterval(() => {
                setEditSpotProgressMessage('');
            }, 10000)
        } else if (editSpotMutation.isLoading) {
            setEditSpotProgressMessage('Editando...');
        } else if (editSpotMutation.isSuccess) {
            setEditSpotProgressMessage('Editado');
            interval = setInterval(() => {
                setEditSpotProgressMessage('');
            }, 3000)
        }
        return () => {
            setEditSpotProgressMessage('');
            clearInterval(interval)
        }
    }, [editSpotMutation.isLoading, editSpotMutation.isError, editSpotMutation.isSuccess])
    const [selectedSpot,
        setSelectedSpot] =
        useState(null);

    const onToggle = () => {
        const previousAvailability = selectedSpot.available
        const newSelectedSpot = { ...selectedSpot, available: !previousAvailability }
        editSpot(newSelectedSpot)
        setSelectedSpot(newSelectedSpot)
    }

    if (isLoading) {
        return (
            <div data-testid="simpleSpotEditor">
                <h1>Editor de puesto</h1>
                <h2>Cargando...</h2>
            </div>
        );
    }

    if (isError) {
        return (
            <div data-testid="simpleSpotEditor">
                <h1>Editor de puesto</h1>
                <h2>Ha ocurrido un error al cargar los puestos, pruebe recargar la pagina</h2>
            </div>
        );
    }

    const spotCollection = data;

    if (selectedSpot) {
        if (!spotCollection.find(spot => spot._id === selectedSpot._id)) {
            setSelectedSpot(null)
        }
    } else {
        if (spotCollection?.length) {
            setSelectedSpot(spotCollection[0])
        }
    }

    const onSelectSpot = spotId => {
        const spot = spotCollection.find(currentSpot => currentSpot._id === spotId)
        setSelectedSpot(spot)
    }

    return (
        <div class="flex flex-col justify-center">
            <div className='p-5 bg-slate-800'>
                <h1 className='text-2xl p-1 w-full text-center text-white'>Editor de puesto</h1>
            </div>
            {spotCollection.length
                ? <>
                    <div class="m-5 flex flex-row full-width justify-center">
                        <div class="flex flex-col justify-center">
                            <label for="spotSelect" class="h-min">Spot:</label>
                        </div>
                        <select id="spotSelect" value={selectedSpot?._id} onChange={e => onSelectSpot(e.target.value)} class="rounded-md m-5 p-3 bg-slate-800 text-white">
                            {spotCollection.map(spot => <option value={spot._id}>{spot.name}</option>)}
                        </select>
                    </div>
                    {selectedSpot
                        ? <div class="flex flex-row justify-center">
                            <Button onClick={onToggle}>{selectedSpot.available ? 'Ocupar puesto' : 'Liberar puesto'}</Button>
                        </div>
                        : <p class="flex flex-row justify-center">Por favor seleccione un puesto</p>
                    }
                    {editSpotProgressMessage && <p class="flex flex-row justify-center">{editSpotProgressMessage}</p>}
                </>
                : <p class="flex flex-row justify-center">Por favor añada puestos usando el editor de puestos avanzado</p>}
        </div>
    )
}