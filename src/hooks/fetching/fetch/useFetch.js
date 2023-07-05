import { renderHook } from '@testing-library/react';
import { useEffect, useState } from 'react';

async function updateData (url) {
    const fetched = await fetch(url);
    const res = await fetched.json();
    setData(res);
}

export function useFetch(url) {
    return null;
}