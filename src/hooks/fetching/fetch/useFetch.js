import { renderHook } from '@testing-library/react';
import { useEffect, useState } from 'react';

async function updateData (url) {
    const fetched = await fetch(url);
    const res = await fetched.json();
    setData(res);
}

export function useFetch(url) {
<<<<<<< HEAD
    return null;
}
=======
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if(!url){
            setData(null);
        } else {
            // add interval for polling the data
            updateData(url);
        }
        // add clear function for the interval when it is implemented
    }, [url]);
    return { data, error, loading };
}
>>>>>>> fdeb4745a473d03e4230020801d2b85e28ce7be4
