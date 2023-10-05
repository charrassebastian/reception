import { useMutation, QueryClient } from 'react-query'
import { useEffect, useState, useRef } from 'react';
import { baseUrl } from '../api/url/url';
import { TriviaAnswersEditor } from '../triviaAnswersEditor/TriviaAnswersEditor';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { Button, Label, Text, Textarea } from '@fluentui/react-components'

const queryClient = new QueryClient();

const createNewAnswer = () => { return { _id: uuidv4(), text: 'Respuesta', isCorrect: false } };

export function TriviaElementEditor({ initialTrivia }) {
    const serverTrivia = initialTrivia;
    const isNewTrivia = serverTrivia === undefined;
    const idRef = useRef();
    const [isBeingEdited, setIsBeingEdited] = useState(false);

    const getId = () => {
        if (!idRef.current) {
            idRef.current = isNewTrivia ? uuidv4() : serverTrivia._id;
        }
        return idRef.current;
    };

    const [question, setQuestion] = useState(serverTrivia?.question ? serverTrivia.question : 'Pregunta');
    const [explanation, setExplanation] = useState(serverTrivia?.explanation ? serverTrivia.explanation : 'Explicación');
    const [answers, setAnswers] = useState(serverTrivia?.answers?.length ? serverTrivia.answers : []);
    const [newAnswer, setNewAnswer] = useState(createNewAnswer())
    const [saveTriviaProgressMessage, setSaveTriviaProgressMessage] = useState('')
    const [deleteTriviaProgressMessage, setDeleteTriviaProgressMessage] = useState('')
    const triviaId = getId();
    const trivia = isBeingEdited ? { _id: triviaId, question, explanation, answers } : serverTrivia;
    const saveTriviaMutation = useMutation({
        mutationFn: trivia => {
            if (isNewTrivia) axios.post(baseUrl + 'trivia', trivia)
            else axios.put(baseUrl + 'trivia/' + trivia._id, trivia)
            queryClient.invalidateQueries('trivia');
        }
    });
    const deleteTriviaMutation = useMutation({
        mutationFn: trivia => {
            axios.delete(baseUrl + 'trivia/' + trivia._id)
            queryClient.invalidateQueries('trivia');
        }
    });
    const saveTrivia = () => {
        saveTriviaMutation.mutate(trivia);
        setIsBeingEdited(false);

    }
    const deleteTrivia = () => {
        deleteTriviaMutation.mutate(trivia);
        setIsBeingEdited(false);
    }

    useEffect(() => {
        let interval = null;
        if(saveTriviaMutation.isError){
            setSaveTriviaProgressMessage('Ocurrió un error: ' + saveTriviaMutation.error.message);
            interval = setInterval(() => {
                setSaveTriviaProgressMessage('');
            }, 10000)
        } else if(saveTriviaMutation.isLoading){
            setSaveTriviaProgressMessage('Guardando...');
        } else if(saveTriviaMutation.isSuccess){
            setSaveTriviaProgressMessage('Guardado');
            interval = setInterval(() => {
                setSaveTriviaProgressMessage('');
            }, 3000)
        }
        return () => {
            setSaveTriviaProgressMessage('');
            clearInterval(interval)
        }
    }, [saveTriviaMutation.isError, saveTriviaMutation.isLoading, saveTriviaMutation.isSuccess])

    useEffect(() => {
        let interval = null;
        if(deleteTriviaMutation.isError){
            setDeleteTriviaProgressMessage('Ocurrió un error: ' + deleteTriviaMutation.error.message);
            interval = setInterval(() => {
                setDeleteTriviaProgressMessage('');
            }, 10000)
        } else if(deleteTriviaMutation.isLoading){
            setDeleteTriviaProgressMessage('Eliminando...');
        } else if(deleteTriviaMutation.isSuccess){
            setDeleteTriviaProgressMessage('Eliminado');
            interval = setInterval(() => {
                setDeleteTriviaProgressMessage('');
            }, 3000)
        }
        return () => {
            setDeleteTriviaProgressMessage('');
            clearInterval(interval)
        }
    }, [deleteTriviaMutation.isError, deleteTriviaMutation.isLoading, deleteTriviaMutation.isSuccess])

    const handleAnswerTextChange = (e, answerId) => {
        const previousIsCorrect = answers.filter(answer => answer._id === answerId)[0].isCorrect;
        const newAnswers = answers.map(answer => answer._id === answerId ? { _id: answerId, text: e.target.value, isCorrect: previousIsCorrect } : answer)
        setAnswers(newAnswers);
    }
    const handleAnswerIsCorrectChange = answerId => {
        const answer = answers.filter(answer => answer._id === answerId)[0];
        const previousIsCorrect = answer.isCorrect
        const answerText = answer.text
        const newAnswers = answers.map(answer => answer._id === answerId ? { _id: answerId, text: answerText, isCorrect: !previousIsCorrect } : answer)
        setAnswers(newAnswers);
    }
    const handleAnswerDelete = answerId => setAnswers(answers.filter(answer => answer._id !== answerId));
    const handleQuestionChange = e => setQuestion(e.target.value);
    const handleExplanationChange = e => setExplanation(e.target.value);
    const handleNewAnswerTextChange = (e, answerId) => setNewAnswer(answer => { return { ...answer, text: e.target.value } });
    const handleNewAnswerIsCorrectChange = answerId => setNewAnswer(answer => { return { ...answer, isCorrect: !answer.isCorrect } })
    const handleAddNewAnswer = answer => {
        setNewAnswer(createNewAnswer())
        return setAnswers(answers => [...answers, answer])
    }
    const handleEdit = () => {
        setIsBeingEdited(prev => !prev);
        setQuestion(serverTrivia?.question ? serverTrivia.question : 'Pregunta')
        setExplanation(serverTrivia?.explanation ? serverTrivia.explanation : 'Explicación')
        setAnswers(serverTrivia?.answers?.length ? serverTrivia.answers : [])
    }

    return (
        <div className='my-5'>
            <div className='flex flex-row align-center'>
                <Label htmlFor={'question' + triviaId} className='mr-5 self-center'>Pregunta:</Label>
                <Textarea resize="both" disabled={!isBeingEdited} id={'question' + triviaId} onChange={handleQuestionChange} value={question} className='mx-2 py-1 px-3 rounded-md bg-sky-100' rows={2} />
                <Label htmlFor={'explanation' + triviaId} className='mx-5 self-center'>Explicación:</Label>
                <Textarea resize="both" disabled={!isBeingEdited} id={'explanation' + triviaId} onChange={handleExplanationChange} value={explanation} className='mx-2 py-1 px-3 rounded-md bg-sky-100' rows={2} />
            </div>
            <div>
                <Text as="h3" className='my-3'>Respuestas:</Text>
                {trivia?.answers?.map(answer => (
                    <TriviaAnswersEditor key={answer._id} isBeingEdited={isBeingEdited} answer={answer} handleTextChange={handleAnswerTextChange} handleIsCorrectChange={handleAnswerIsCorrectChange} handleDelete={handleAnswerDelete} />
                ))}

                {isBeingEdited &&
                    <div>
                        <Text as="h3" className='my-3'>Puede agregar una nueva respuesta:</Text>
                        <TriviaAnswersEditor isBeingEdited={isBeingEdited} answer={newAnswer} handleTextChange={handleNewAnswerTextChange} handleIsCorrectChange={handleNewAnswerIsCorrectChange} handleAdd={handleAddNewAnswer} />
                    </div>
                }
            </div>
            
            <Button onClick={handleEdit} appearance='primary'>{isBeingEdited ? 'Dejar de editar trivia' : 'Editar trivia'}</Button>
            {isBeingEdited && <Button onClick={saveTrivia}>Guardar trivia</Button>}
            {(!isNewTrivia && isBeingEdited) && <Button onClick={deleteTrivia}>Borrar trivia</Button>}
            {saveTriviaProgressMessage && <Text as="p" className='my-5'>{saveTriviaProgressMessage}</Text>}
            {deleteTriviaProgressMessage && <Text as="p" className='my-5'>{deleteTriviaProgressMessage}</Text>}
        </div>
    )
}
