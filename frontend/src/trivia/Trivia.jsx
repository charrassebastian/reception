import { useQuery } from 'react-query'
import { useEffect, useState } from 'react'
import { TriviaAnswersSection } from '../triviaAnswersSection/TriviaAnswersSection'
import axios from 'axios'
import { baseUrl } from '../api/url/url'
import Fade from 'react-reveal/Fade'
import { Text } from '@fluentui/react-components'

const randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min)
}

export function Trivia() {
    const { data, error, isError, isLoading } = useQuery({
        queryKey: ['trivia'],
        queryFn: () => axios.get(baseUrl + 'trivia').then(res => res.data),
        refetchInterval: 2000
    })
    const [view, setView] = useState('showQuestion')
    const [currentTriviaIndex, setCurrentTriviaIndex] = useState(0)

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
            setView('showQuestion')
            interval = setInterval(() => {
                setView(view => {
                    if (view === 'showExplanation') {
                        return 'showQuestion'
                    }
                    return 'showExplanation'
                })
            }, 5000)
        }
        return () => { clearInterval(interval) }
    }, [data])

    const length = data?.length ? data.length : 0;

    useEffect(() => {
        if (!data?.length) {
            setCurrentTriviaIndex(0)
        } else if (view === 'showQuestion') {
            const newCurrentTriviaIndex = randomNumber(0, data.length)
            setCurrentTriviaIndex(newCurrentTriviaIndex)
        }
        return () => { }
    }, [length, view])

    if (isError) {
        return (
            <div data-testid="trivia" className='w-full h-full flex flex-col justify-center'>
                <div className='h-full flex flex-col align-center justify-center'>
                    <Text as="p" className='bg-white rounded-md p-5 mx-5 text-center text-3xl'>No se pudo cargar la trivia, este fue el error: {error}</Text>
                </div>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div data-testid="trivia" className='w-full h-full flex flex-col justify-center'>
                <div className='h-full flex flex-col align-center justify-center'>
                    <Text as="p" className='bg-white rounded-md p-5 mx-5 text-center text-3xl'>Cargando trivia</Text>
                </div>
            </div>
        );
    }

    if (!data?.length) {
        return (
            <div data-testid="trivia" className='w-full h-full flex flex-col justify-center'>
                <div className='h-full flex flex-col align-center justify-center'>
                    <Text as="p" className='bg-white rounded-md p-5 mx-5 text-center text-3xl'>No hay ninguna trivia disponible</Text>
                </div>
            </div>
        );
    }

    if (currentTriviaIndex >= data.length) {
        setCurrentTriviaIndex(randomNumber(0, data.length))
        setView('showQuestion')
        return (
            <div data-testid="trivia" className='w-full h-full flex flex-col justify-center'>
                <div className='h-full flex flex-col align-center justify-center'>
                    <Text as="p" className='bg-white rounded-md p-5 mx-5 text-center text-3xl'>Cargando trivia</Text>
                </div>
            </div>
        );

    }

    const trivia = data[currentTriviaIndex]
    return (
        <div data-testid="trivia" className='w-full h-full flex flex-col justify-center'>
            <Fade left spy={currentTriviaIndex}>
                <div className='h-full flex flex-col align-center justify-center'>
                    <Text size={600} as="p" className='text-2xl m-5'>{trivia.question}</Text>
                </div>
                <div className={'h-full'}>
                    <Text size={500} as="h2" className='text-2xl m-5'>Respuestas:</Text>
                    <TriviaAnswersSection answers={trivia.answers} differentiateCorrectAnswers={view === 'showExplanation'} />
                </div>
                <div className={'h-full flex flex-col align-center justify-center' + (view === 'showQuestion' ? ' invisible' : '')}>
                    <Text size={500} as="p" className='text-2xl m-5'>Explicación: {trivia.explanation}</Text>
                </div>
            </Fade>
        </div>
    );
}
