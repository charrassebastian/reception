import { useQuery } from 'react-query'
import { useEffect, useState } from 'react'
import { TriviaAnswersSection } from '../triviaAnswersSection/TriviaAnswersSection'
import axios from 'axios'
import { baseUrl } from '../api/url/url'

const randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min)
}

export function Trivia() {
    const { data, error, isError, isLoading } = useQuery({
        queryKey: ['trivia'],
        queryFn: () => axios.get(baseUrl + 'trivia').then(res => res.data),
        refetchInterval: 2000
    })
    const [ view, setView ] = useState('showQuestion')
    const [ currentTriviaIndex, setCurrentTriviaIndex ] = useState(0)

    /*
        Al iniciar, espero a que se carguen los datos
        una vez cargados, pongo el timer para ejecutar el siguiente ciclo:

        loop() {
            se elige un indice de forma aleatoria
            semuestra la pregunta
            pasan dos segundos
            se muestra la respuesta
            pasan dos segundos            
        }
    */
    useEffect(() => {
        let interval = null
        if (data?.length) {
            interval = setInterval(() => {
                setView(view => {
                    if (view === 'showExplanation') {
                        return 'showQuestion'
                    }
                    return 'showExplanation'
                })
            }, 10000)
        }
        return () => { clearInterval(interval) }
    }, [data])

    useEffect(() => {
        if (!data?.length) {
            setCurrentTriviaIndex(0)
        } else if (view === 'showQuestion') {
            const newCurrentTriviaIndex = randomNumber(0, data.length)
            setCurrentTriviaIndex(newCurrentTriviaIndex)
        }
        return () => {}
    }, [data, view])

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

    if(currentTriviaIndex >= data.length){
        setCurrentTriviaIndex(randomNumber(0, data.length))
        return (
            <div data-testid="trivia">
                <h1>Cargando trivia</h1>
            </div>
        )
    }

    const trivia = data[currentTriviaIndex]
    if(view === 'showQuestion') {
    return (
        <div data-testid="trivia" className='w-full h-full flex flex-col justify-center bg-slate-800'>
            <div className='h-full flex flex-col align-center justify-center'>
                <p className='bg-white rounded-md p-5 mx-5 text-center text-3xl'>{trivia.question}</p>
            </div>
            <div className='h-full'>
                <TriviaAnswersSection answers={trivia.answers} />
            </div>
        </div>
    );
    }

    return (
        <div data-testid="trivia" className='w-full h-full flex flex-col justify-center bg-slate-800'>
            <div className='h-full flex flex-col align-center justify-center'>
                <p className='bg-white rounded-md p-5 mx-5 text-center text-3xl'>Explicación: {trivia.explanation}</p>
            </div>
            <div className='h-full'>
                <h2 className='text-white text-2xl m-5'>Respuestas correctas:</h2>
                <TriviaAnswersSection answers={trivia.answers.filter(answer => answer.isCorrect)} />
            </div>
        </div>
    )
}