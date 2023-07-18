export function TriviaAnswersEditor(answer, handleTextChange, handleIsCorrectChange, handleDelete) {
    return (
        <div>
            <input onChange={() => handleTextChange(e, answer._id)}>{answer.text}</input>
            <label>¿Es correcta?
                <input type='checkbox' onChange={() => handleIsCorrectChange(answer._id)} defaultChecked={answer.isCorrect} />
            </label>
            {handleDelete && <button onClick={() => handleDelete(answer._id)}>Borrar</button>}
        </div>
    );
}