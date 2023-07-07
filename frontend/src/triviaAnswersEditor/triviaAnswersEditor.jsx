export function TriviaAnswersEditor(answer, handleTextChange, handleIsCorrectChange, handleDelete) {
    return (
        <div>
            <input onChange={() => handleTextChange(e, answer.id)}>{answer.text}</input>
            <label>¿Es correcta?
                <input type='checkbox' onChange={() => handleIsCorrectChange(answer.id)} defaultChecked={answer.isCorrect} />
            </label>
            <button onClick={() => handleDelete(answer.id)}>Borrar</button>
        </div>
    );
}