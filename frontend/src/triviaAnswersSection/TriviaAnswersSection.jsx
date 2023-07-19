export function TriviaAnswersSection({ answers }){
    return (
        <div>
            <h3>Elige una opcion de entre las siguientes:</h3>
            <ul>
                {answers.map(answer => <li key={answer._id}>{answer.text}</li>)}
            </ul>
        </div>
    );
}
