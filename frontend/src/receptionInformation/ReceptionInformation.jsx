import { Trivia } from '../trivia/Trivia';
import { Spots } from '../spots/Spots';
import { Divider } from '@fluentui/react-components';

export function ReceptionInformation(){
    return (
        <div className="flex flex-row items-center justify-center w-full h-full overflow-hidden">
            <Trivia />
            <Spots />
        </div>
    );
}