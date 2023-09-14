import { Button } from '@fluentui/react-components'

export function TriviaAnswersEditor({ isBeingEdited, answer, handleTextChange, handleIsCorrectChange, handleDelete, handleAdd }) {
    return (
        <div className="m-3">
            <label htmlFor={'answerText' + answer._id} className="mr-5">Texto de la respuesta:</label>
            <input disabled={!isBeingEdited} id={'answerText' + answer._id} onChange={e => handleTextChange(e, answer._id)} value={answer.text} className='mx-2 py-1 px-3 rounded-md bg-sky-100'></input>
            <label htmlFor={'isCorrect' + answer._id} className="mx-5">¿Es correcta?</label>
            <input disabled={!isBeingEdited} id={'isCorrect' + answer._id} type='checkbox' onChange={() => handleIsCorrectChange(answer._id)} defaultChecked={answer.isCorrect} className="mx-2"/>
            {(handleDelete && isBeingEdited) && <Button onClick={() => handleDelete(answer._id)}>Borrar respuesta</Button>}
            {(handleAdd && isBeingEdited) && <Button onClick={() => handleAdd(answer)}>Agregar respuesta</Button>}
        </div>
    );
}