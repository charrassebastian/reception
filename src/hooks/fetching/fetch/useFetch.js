import { useEffect, useState } from 'react';

export function useFetch(url) {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if(!url){
            setData(null);
        } else {
            setInterval(async () => {
                const res = await fetch(url);
                setData(res);
            }, 1000);
        }
    }, [url]);
    return { data, error, loading };
}
