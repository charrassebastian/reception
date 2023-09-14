import { Button, Input, Label, Switch } from '@fluentui/react-components'

export function TriviaAnswersEditor({ isBeingEdited, answer, handleTextChange, handleIsCorrectChange, handleDelete, handleAdd }) {
    return (
        <div className="m-3">
            <Label htmlFor={'answerText' + answer._id} className="mr-5">Texto de la respuesta:</Label>
            <Input disabled={!isBeingEdited} id={'answerText' + answer._id} onChange={e => handleTextChange(e, answer._id)} value={answer.text} />
            <Switch label="¿Es correcta?" labelPosition='before' disabled={!isBeingEdited}  id={'isCorrect' + answer._id}  onChange={() => handleIsCorrectChange(answer._id)} checked={answer.isCorrect} />
            {(handleDelete && isBeingEdited) && <Button onClick={() => handleDelete(answer._id)}>Borrar respuesta</Button>}
            {(handleAdd && isBeingEdited) && <Button onClick={() => handleAdd(answer)}>Agregar respuesta</Button>}
        </div>
    );
}