import { TriviaElementEditor } from '../triviaElementEditor/TriviaElementEditor';
import { useQuery } from 'react-query';
import axios from 'axios';
import { baseUrl } from '../api/url/url';
import { Text } from '@fluentui/react-components';

export function TriviaElementsEditor() {
    const { data, error, isError, isLoading } = useQuery({
        queryKey: ['trivia'],
        queryFn: () => axios.get(baseUrl + 'trivia').then(res => res.data),
        refetchInterval: 200
    })

    if (isError) {
        return (
            <div>
                <Text as="h3" size={800}>No se pudo cargar la trivia</Text>
                <Text as="p">Este fue el error: {error}</Text>
            </div>
        )
    }

    if (isLoading) {
        return (
            <div>
                <Text as="h3" size={800}>Cargando la trivia</Text>
            </div>
        )
    }

    const triviaCollection = data

    return (
        <div className='overflow-x-hidden'>
            <div className='p-5 w-full flex flex-row justify-center'>
                <Text as="h1" size={800} align="center">Editor de trivias</Text>
            </div>
            <div className='pl-5 pt-5'>
                <Text as="h2" className="my-5 text-lg">Puede editar las siguientes trivias:</Text>
                {triviaCollection.map(trivia => <TriviaElementEditor key={trivia._id} initialTrivia={trivia} />)}
                <Text as="h2" className="my-2 text-lg">Puede agregar la siguiente trivia:</Text>
                <TriviaElementEditor />
            </div>
        </div>
    );
}