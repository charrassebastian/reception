import { Trivia } from '../trivia/Trivia';
import { Spots } from '../spots/Spots';

export function ReceptionInformation(){
    return (
        <div className='bg-[#dc2626] flex flex-row'>
            <Trivia></Trivia>
            <Spots></Spots>
        </div>
    );
}