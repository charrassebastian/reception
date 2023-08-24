import { useEffect, useState } from 'react';
import { EditableSpot } from '../editableSpot/EditableSpot';
import { useQuery, QueryClient, useMutation } from 'react-query';
import axios from 'axios'
import { baseUrl } from '../api/url/url';

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
        addSpot({ name: newSpotName, available: false });
    }

    return (
        <div data-testid="spotsEditor" className='overflow-x-hidden'>
            <div className='p-5 bg-slate-800'>
                <h1 className='text-2xl p-1 w-full text-center text-white'>Editor de puestos</h1>
            </div>
            <div className='pl-5 pt-5'>
                <h2 className="my-5 text-lg">Puede editar los siguientes puestos:</h2>
                {spotCollection?.length ?
                    <ul>
                        {spotCollection.map(spot => <EditableSpot key={spot._id} initialSpot={spot} />)}
                    </ul>
                    : <p>Ninguno</p>}
                <h2 className="my-2 text-lg">Puede agregar un nuevo puesto:</h2>
                <div className='my-5'>
                    <label htmlFor="newSpotInput" className='mr-5'>Nombre del puesto</label>
                    <input id="newSpotInput" onChange={e => setNewSpotName(e.target.value)} value={newSpotName} className='mx-2 py-1 px-3 rounded-md bg-sky-100'></input>
                    <button onClick={handleAdd} className='bg-green-500 text-white rounded-md py-1 px-3 mx-2'>Agregar puesto</button>
                    {addSpotProgressMessage && <p className='my-5'>{addSpotProgressMessage}</p>}
                </div>
            </div>
        </div>
    )
}
