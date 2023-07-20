import { TriviaElementEditor } from '../triviaElementEditor/TriviaElementEditor';
import { useQuery } from 'react-query';
import axios from 'axios';
import { baseUrl } from '../api/url/url';

export function TriviaElementsEditor(){
    const { data, error, isError, isLoading } = useQuery({
        queryKey: ['trivia'],
        queryFn: () => axios.get(baseUrl + 'trivia').then(res => res.data),
        refetchInterval: 200
    })

    if (isError) {
        return (
            <div>
                <h3>No se pudo cargar la trivia</h3>
                <p>Este fue el error: {error}</p>
            </div>
        )
    }

    if (isLoading) {
        return (
            <div>
                <h3>Cargando la trivia</h3>
            </div>
        )
    }

    const triviaCollection = data

    return (
        <div>
            <h3>Puede editar las siguientes trivias</h3>
            {triviaCollection.map(trivia => <TriviaElementEditor key={trivia._id} initialTrivia={trivia} />)}
            <div>
                <h3>Puede agregar la siguiente trivia</h3>
                <TriviaElementEditor />
            </div>
        </div>
    );
}