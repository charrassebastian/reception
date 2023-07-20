export function TriviaAnswersEditor({ answer, handleTextChange, handleIsCorrectChange, handleDelete, handleAdd }) {
    return (
        <div>
            <input onChange={e => handleTextChange(e, answer._id)} value={answer.text}></input>
            <label>¿Es correcta?
                <input type='checkbox' onChange={() => handleIsCorrectChange(answer._id)} defaultChecked={answer.isCorrect} />
            </label>
            {handleDelete && <button onClick={() => handleDelete(answer._id)}>Borrar respuesta</button>}
            {handleAdd && <button onClick={() => handleAdd(answer)}>Agregar respuesta</button>}
        </div>
    );
}