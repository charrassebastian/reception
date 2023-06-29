import { useState } from 'react';

export function useTrivia(){
    const [trivia, setTrivia] = useState([]);
    return {trivia: trivia};
}