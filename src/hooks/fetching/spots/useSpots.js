import { useState, useEffect } from 'react';
import { useFetch } from '../fetch/useFetch';
import { useCrud } from '../crud/useCrud';

export function useSpots() {
    return useCrud('spot');
}
