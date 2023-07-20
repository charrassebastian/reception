export function TriviaAnswersEditor({ answer, handleTextChange, handleIsCorrectChange, handleDelete, handleAdd }) {
    return (
        <div>
            <label htmlFor={'answerText' + answer._id}>Texto de la respuesta</label>
            <input id={'answerText' + answer._id} onChange={e => handleTextChange(e, answer._id)} value={answer.text}></input>
            <label htmlFor={'isCorrect' + answer._id}>¿Es correcta?</label>
            <input id={'isCorrect' + answer._id} type='checkbox' onChange={() => handleIsCorrectChange(answer._id)} defaultChecked={answer.isCorrect} />
            {handleDelete && <button onClick={() => handleDelete(answer._id)}>Borrar respuesta</button>}
            {handleAdd && <button onClick={() => handleAdd(answer)}>Agregar respuesta</button>}
        </div>
    );
}