import { useCrud } from '../crud/useCrud';

export function useTrivia(){
    return useCrud('trivia');
}