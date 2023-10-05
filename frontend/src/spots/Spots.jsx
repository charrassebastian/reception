import { useQuery } from 'react-query'
import axios from 'axios'
import { baseUrl } from '../api/url/url'
import { useState, useEffect } from 'react';
import { Button, Text } from '@fluentui/react-components';
import { Speaker024Regular, SpeakerMute24Regular } from '@fluentui/react-icons';

const freeSpotsTitle = 'Los puestos libres son los siguientes';

const notifyAvailableSpotsWithSpeechSynthesis = availableSpots => {
    const utterance = new SpeechSynthesisUtterance();
    utterance.lang = 'es-AR';
    const availableSpotsText = availableSpots.reduce((acc, e) => acc + ', ' + e.name, '');
    utterance.text = freeSpotsTitle + availableSpotsText;
    speechSynthesis.speak(utterance);
}

export function Spots() {
    const { data, isError, isLoading, error } = useQuery({
        queryKey: ['spots'],
        queryFn: () => axios.get(baseUrl + 'spots').then(res => res.data),
        refetchInterval: 200
    })
    const [shouldSpeak, setShouldSpeak] = useState(false)

    useEffect(() => {
        if (shouldSpeak && data?.length) {
            const availableSpots = data.filter(spot => spot.available);
            if (availableSpots.length) {
                notifyAvailableSpotsWithSpeechSynthesis(availableSpots);
            }
        }
        return () => { }
    }, [shouldSpeak, data])

    if (isLoading) {
        return (
            <div data-testid="spots" className='flex flex-col w-full h-full'>
                <div className='flex flex-row py-5 items-center justify-around'>
                    <Text as="h1" size={800} align="center" className='text-2xl m-5 text-shadow'>{freeSpotsTitle}</Text>
                </div>
                <Text as="h1" size={500} align="center" className='text-2xl m-5 text-shadow'>Cargando los puestos disponibles</Text>
            </div>
        )
    }

    if (isError) {
        return (
            <div data-testid="spots" className='flex flex-col w-full h-full'>
                <div className='flex flex-row py-5 items-center justify-around'>
                    <Text as="h1" size={800} align="center">{freeSpotsTitle}</Text>
                </div>
                <h1></h1>
                <Text as="h1" size={500} align="center">No se pudo cargar los puestos disponibles</Text>
                <Text as="p">Este fue el error: {error}</Text>
            </div>
        )
    }

    const spots = data;
    const availableSpots = spots.filter(spot => spot.available);
    return (
        <div data-testid="spots" className='flex flex-col w-full h-full'>
            <div className='flex flex-row p-5 my-2 items-center justify-around'>
                <Text size={800} as="h1" align="center" className='text-2xl m-5'>{freeSpotsTitle}</Text>
            </div>
            <ul className='overflow-hidden h-full list-none flex flex-col flex-wrap'>{availableSpots?.length ? availableSpots.map(spot => <li key={spot._id} className='m-5 inline-block text-5xl self-center'>{spot.name}</li>) : <li className='m-5 inline-block text-5xl self-center'>Ninguno</li>}</ul>
            <div className='flex flex-row p-5 items-center justify-around'>
                <Button onClick={() => setShouldSpeak(prev => !prev)} icon={shouldSpeak ? <Speaker024Regular /> : <SpeakerMute24Regular />}>
                </Button>
            </div>
        </div>
    )
}
