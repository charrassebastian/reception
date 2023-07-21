export function TriviaAnswersEditor({ answer, handleTextChange, handleIsCorrectChange, handleDelete, handleAdd }) {
    return (
        <div className="m-3">
            <label htmlFor={'answerText' + answer._id} className="mr-5">Texto de la respuesta:</label>
            <input id={'answerText' + answer._id} onChange={e => handleTextChange(e, answer._id)} value={answer.text} className='mx-2 py-1 px-3 rounded-md bg-sky-100'></input>
            <label htmlFor={'isCorrect' + answer._id} className="mx-5">¿Es correcta?</label>
            <input id={'isCorrect' + answer._id} type='checkbox' onChange={() => handleIsCorrectChange(answer._id)} defaultChecked={answer.isCorrect} className="mx-2"/>
            {handleDelete && <button onClick={() => handleDelete(answer._id)} className='bg-red-500 text-white rounded-md py-1 px-3 mx-2'>Borrar respuesta</button>}
            {handleAdd && <button onClick={() => handleAdd(answer)} className='bg-green-500 text-white rounded-md py-1 px-3 mx-2'>Agregar respuesta</button>}
        </div>
    );
}