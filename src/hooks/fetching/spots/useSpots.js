import { useState, useEffect } from 'react';
import { useFetch } from '../fetch/useFetch';

export function useSpots() {
    const [spots, setSpots] = useState([]);
    const updateSpot = updatedSpot => useFetch('localhost:8082/api/spots', 'patch', updatedSpot);
    const deleteSpot = spotId => useFetch('localhost:8082/api/spots', 'delete', spotId);
    const addSpot = newSpot => useFetch('localhost:8082/api/spots', 'post', newSpot);
    useEffect(() => {
        const interval = setInterval(() => {
            const fetchedSpots = useFetch('localhost:8082/api/spots');
            if (fetchedSpots && !(fetchedSpots instanceof Error)) {
                setSpots(() => fetchedSpots);
            }
        }, 1000);
        return () => clearInterval(interval);
    }, []);
    return [spots, updateSpot, deleteSpot, addSpot];
}