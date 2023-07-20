import { Trivia } from '../trivia/Trivia';
import { Spots } from '../spots/Spots';

export function ReceptionInformation(){
    return (
        <div className='flex flex-row items-center justify-center w-full h-full'>
            <Trivia></Trivia>
            <Spots></Spots>
        </div>
    );
}