import { useEffect, useState } from 'react';
import { useMutation, useQuery, QueryClient } from 'react-query';
import axios from 'axios';
import { baseUrl } from '../api/url/url';
import { Button, Dropdown, Label, Option, Text } from '@fluentui/react-components';

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
                <Text as="h1" size={800} align="center">Editor de puesto</Text>
                <Text as="h2">Cargando...</Text>
            </div>
        );
    }

    if (isError) {
        return (
            <div data-testid="simpleSpotEditor">
                <Text as="h1" size={800} align="center">Editor de puesto</Text>
                <Text>Ha ocurrido un error al cargar los puestos, pruebe recargar la pagina</Text>
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

    const onSelectSpot = spotName => {
        console.log(spotName)
        const spot = spotCollection.find(currentSpot => currentSpot.name === spotName)
        setSelectedSpot(spot)
    }

    return (
        <div class="flex flex-col justify-center">
            <div className='p-5 flex flex-row justify-center'>
                <Text as="h1" size={800} align="center">Editor de puesto</Text>
            </div>
            {spotCollection.length
                ? <>
                    <div class="flex flex-row align-center justify-center">
                        <div class="m-5 flex flex-col max-w-sm align-center justify-center">
                            <Label id="dropdownLabel" htmlFor="spotSelect" className='my-3'>Spot</Label>
                            <Dropdown
                                aria-labelledby="dropdownLabel"
                                placeholder="Seleccione un puesto"
                                value={selectedSpot?.name}
                                onOptionSelect={(_, spotId) => onSelectSpot(spotId.optionValue)}
                            >
                                {spotCollection.map((spot) => (
                                    <Option key={spot.name}>
                                        {spot.name}
                                    </Option>
                                ))}
                            </Dropdown>
                        </div>
                    </div>
                    <div class="flex flex-row justify-center m-5">
                        {selectedSpot
                            ? <Button onClick={onToggle} appearance='primary'>{selectedSpot.available ? 'Ocupar puesto' : 'Liberar puesto'}</Button>
                            : <Text as="p" class="flex flex-row justify-center">Por favor seleccione un puesto</Text>
                        }
                    </div>
                    <div class="flex flex-row justify-center m-5">
                        {editSpotProgressMessage && <Text as="p" class="flex flex-row justify-center">{editSpotProgressMessage}</Text>}
                    </div>
                </>
                :
                <div class="flex flex-row justify-center m-5">
                    <Text as="p" class="flex flex-row justify-center">Por favor añada puestos usando el editor de puestos avanzado</Text>
                </div>
            }
        </div>
    )
}