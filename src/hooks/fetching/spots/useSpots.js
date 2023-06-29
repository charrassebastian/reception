import { useCrud } from '../crud/useCrud';

export function useSpots() {
    return useCrud('spot');
}
