import { useEffect, useState } from 'react';
import { EditableSpot } from '../editableSpot/EditableSpot';
import { useQuery, QueryClient, useMutation } from 'react-query';
import axios from 'axios'
import { baseUrl } from '../api/url/url';
import { Button, Input, Label, Text } from '@fluentui/react-components';

const queryClient = new QueryClient();

export function SpotsEditor() {
    const { isError, isLoading, data, error } = useQuery({
        queryKey: ['spots'],
        queryFn: () => axios.get(baseUrl + 'spots').then(res => res.data),
        refetchInterval: 200
    });
    const [addSpotProgressMessage, setAddSpotProgressMessage] = useState('')
    const addSpotMutation = useMutation({
        mutationFn: spot => {
            axios.post(baseUrl + 'spots', spot)
            queryClient.invalidateQueries('spots');
        }
    });
    const addSpot = spot => {
        addSpotMutation.mutate(spot)
    }
    useEffect(() => {
        let interval = null;
        if (addSpotMutation.isError) {
            setAddSpotProgressMessage('Ocurrió un error: ' + addSpotMutation.error.message);
            interval = setInterval(() => {
                setAddSpotProgressMessage('');
            }, 10000)
        } else if (addSpotMutation.isLoading) {
            setAddSpotProgressMessage('Agregando...');
        } else if (addSpotMutation.isSuccess) {
            setAddSpotProgressMessage('Agregado');
            interval = setInterval(() => {
                setAddSpotProgressMessage('');
            }, 3000)
        }
        return () => {
            setAddSpotProgressMessage('');
            clearInterval(interval)
        }
    }, [addSpotMutation.isLoading, addSpotMutation.isError, addSpotMutation.isSuccess])
    const [newSpotName,
        setNewSpotName] =
        useState(1);

    if (isLoading) {
        return (
            <div className='p-5 flex flex-col justify-center'>
                <Text as="h1" size={800} align="center">Editor de puestos</Text>
                <Text as="h2" size={500} align="center">Cargando...</Text>
            </div>
        );
    }

    if (isError) {
        return (
            <div className='p-5 flex flex-col justify-center'>
                <Text as="h1" size={800} align="center">Editor de puestos</Text>
                <Text as="h2" size={500} align="center">Ha ocurrido un error al cargar los puestos, pruebe recargar la pagina</Text>
            </div>
        );
    }

    const spotCollection = data;

    function handleAdd() {
        addSpot({ name: newSpotName, available: false });
    }

    return (
        <div data-testid="spotsEditor" className='overflow-x-hidden'>
            <div className='p-5 flex flex-row justify-center'>
                <Text as="h1" size={800} align="center">Editor de puestos</Text>
            </div>
            <div className='pl-5 pt-5'>
                <Text as="h2" size={500} align="center">Puede editar los siguientes puestos:</Text>
                {spotCollection?.length ?
                    <ul>
                        {spotCollection.map(spot => <EditableSpot key={spot._id} initialSpot={spot} />)}
                    </ul>
                    : <Text as="p">Ninguno</Text>}
                <Text as="h2" size={500} align="center">Puede agregar un nuevo puesto:</Text>
                <div className='my-5'>
                    <Label htmlFor="newSpotInput" className='mr-5'>Nombre del puesto</Label>
                    <Input id="newSpotInput" onChange={e => setNewSpotName(e.target.value)} value={newSpotName} className="mr-5"/>
                    <Button onClick={handleAdd} appearance='primary'>Agregar puesto</Button>
                    {addSpotProgressMessage && <Text as="p" className='my-5'>{addSpotProgressMessage}</Text>}
                </div>
            </div>
        </div>
    )
}
