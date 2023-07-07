export function triviaAnswersEditor(answer, handleChange, handleDelete){
    return (
        <div>
            <input onChange={() => handleChange(e, answer.id)}>{answer.text}</input>
            <button onClick={() => handleDelete(answer.id)}>Borrar</button>
        </div>
    );
}