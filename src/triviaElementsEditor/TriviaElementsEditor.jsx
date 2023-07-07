import { TriviaElementEditor } from '../triviaElementEditor/TriviaElementEditor';

export function TriviaElementsEditor(triviaCollection){
    const initialNewTrivia = {id: 1, question: 'Pregunta', answers: [], explanation: 'Explicacion'};
    return (
        <div>
            <h3>Puede editar los siguientes puestos</h3>
            {triviaCollection.map(trivia => <TriviaElementEditor trivia={trivia}></TriviaElementEditor>)}
            <div>
                <h3>Puede agregar el siguiente puesto</h3>
                <TriviaElementEditor trivia={newTrivia}></TriviaElementEditor>
            </div>
        </div>
    );
}