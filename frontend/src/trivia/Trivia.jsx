import { useQuery } from 'react-query'
import { fetchTrivia } from '../api/trivia/fetching/fetchTrivia'
import { TriviaAnswersSection } from '../triviaAnswersSection/TriviaAnswersSection'

export function Trivia(){
    const { data, error, isError, isLoading } = useQuery('trivia', fetchTrivia)

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

    const currentTriviaIndex = Math.floor(data.length)
    const trivia = data[currentTriviaIndex]
 
    return (
        <div data-testid="trivia">
            <p>{trivia.question}</p>
            <TriviaAnswersSection answers={trivia.answers}/>
            <p>{trivia.explanation}</p>
        </div>
    );
}