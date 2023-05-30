import { useState, useEffect } from 'react';
import { useFetch } from '../fetch/useFetch';

export function useSpots() {
    const [spots, setSpots] = useState([]);
    const modifySpots = newSpots => useFetch('localhost:8082/api/spots', 'post', newSpots);
    useEffect(() => {
        const interval = setInterval(() => {
            const fetchedSpots = useFetch('localhost:8082/api/spots');
            if(fetchedSpots && !(fetchedSpots instanceof Error)){
                setSpots(() => fetchedSpots);
            }
        }, 1000);
        return () => clearInterval(interval);
    }, []);
    return [spots, modifySpots];
}