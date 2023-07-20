import { useQuery } from 'react-query'
import { TriviaAnswersSection } from '../triviaAnswersSection/TriviaAnswersSection'
import axios from 'axios'
import { baseUrl } from '../api/url/url'

export function Trivia() {
    const { data, error, isError, isLoading } = useQuery({
        queryKey: ['trivia'],
        queryFn: () => axios.get(baseUrl + 'trivia').then(res => res.data),
        refetchInterval: 200
    })

    if (isError) {
        return (
            <div data-testid="trivia">
                <h1>No se pudo cargar la trivia</h1>
                <p>Este fue el error: {error}</p>
            </div>
        )
    }

    if (isLoading) {
        return (
            <div data-testid="trivia">
                <h1>Cargando trivia</h1>
            </div>
        )
    }

    if (!data?.length) {
        return (
            <div data-testid="trivia">
                <h1>No hay ninguna trivia disponible</h1>
            </div>
        )
    }

    const currentTriviaIndex = Math.floor(Math.random(data.length))
    const trivia = data[currentTriviaIndex]

    return (
        <div data-testid="trivia" className='w-full h-full bg-sky-400'>
            <p>{trivia.question}</p>
            <TriviaAnswersSection answers={trivia.answers} />
            <p>{trivia.explanation}</p>
        </div>
    );
}