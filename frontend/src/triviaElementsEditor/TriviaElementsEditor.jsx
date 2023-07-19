import { TriviaElementEditor } from '../triviaElementEditor/TriviaElementEditor';
import { useQuery, useMutation } from 'react-query';
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

    const initialNewTrivia = {_id: '1', question: 'Pregunta', answers: [], explanation: 'Explicacion'};
    return (
        <div>
            <h3>Puede editar los siguientes puestos</h3>
            {triviaCollection.map(trivia => <TriviaElementEditor trivia={trivia} />)}
            <div>
                <h3>Puede agregar el siguiente puesto</h3>
                <TriviaElementEditor />
            </div>
        </div>
    );
}