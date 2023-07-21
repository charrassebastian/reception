import { useMutation, QueryClient } from 'react-query'
import { useState, useRef } from 'react';
import { baseUrl } from '../api/url/url';
import { TriviaAnswersEditor } from '../triviaAnswersEditor/TriviaAnswersEditor';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

const queryClient = new QueryClient();

const createNewAnswer = () => {return { _id: uuidv4(), text: 'Respuesta', isCorrect: false }};

export function TriviaElementEditor({ initialTrivia }) {
    const isNewTrivia = initialTrivia === undefined;
    const idRef = useRef();

    const getId = () => {
        if (!idRef.current) {
            idRef.current = isNewTrivia ? uuidv4() : initialTrivia._id;
        }
        return idRef.current;
    };

    const [question, setQuestion] = useState(initialTrivia?.question ? initialTrivia.question : 'Pregunta');
    const [explanation, setExplanation] = useState(initialTrivia?.explanation ? initialTrivia.explanation : 'Explicacion');
    const [answers, setAnswers] = useState(initialTrivia?.answers?.length ? initialTrivia.answers : []);
    const [newAnswer, setNewAnswer] = useState(createNewAnswer())
    const triviaId = getId();
    const trivia = { _id: triviaId, question, explanation, answers };
    const saveTrivia = useMutation({
        mutationFn: trivia => {
            if (isNewTrivia) axios.post(baseUrl + 'trivia', trivia)
            else axios.put(baseUrl + 'trivia/' + trivia._id, trivia)
            queryClient.invalidateQueries('trivia');
        }
    }).mutate;
    const deleteTrivia = useMutation({
        mutationFn: trivia => {
            axios.delete(baseUrl + 'trivia/' + trivia._id)
            queryClient.invalidateQueries('trivia');
        }
    }).mutate;
    const handleAnswerTextChange = (e, answerId) => {
        const previousIsCorrect = answers.filter(answer => answer._id === answerId)[0].isCorrect;
        const filteredAnswers = answers.filter(answer => answer._id !== answerId);
        const newAnswers = [...filteredAnswers, { _id: answerId, text: e.target.value, isCorrect: previousIsCorrect }];
        setAnswers(newAnswers);
    }
    const handleAnswerIsCorrectChange = (e, answerId) => {
        const previousIsCorrect = answers.filter(answer => answer._id === answerId)[0].isCorrect;
        const filteredAnswers = answers.filter(answer => answer._id !== answerId);
        const newAnswers = [...filteredAnswers, { _id: answerId, text: e.target.value, isCorrect: !previousIsCorrect }];
        setAnswers(newAnswers);
    }
    const handleAnswerDelete = answerId => setAnswers(answers.filter(answer => answer._id !== answerId));
    const handleQuestionChange = e => setQuestion(e.target.value);
    const handleExplanationChange = e => setExplanation(e.target.value);
    const handleNewAnswerTextChange = (e, answerId) => setNewAnswer(answer => { return { ...answer, text: e.target.value } });
    const handleNewAnswerIsCorrectChange = (e, answerId) => setNewAnswer(answer => { return { ...answer, isCorrect: !answer.isCorrect } })
    const handleAddNewAnswer = answer => { 
        setNewAnswer(createNewAnswer())
        return setAnswers(answers => [...answers, answer]) }
    return (
        <div className='my-5'>
            <div className='flex flex-row align-center'>
                <label htmlFor={'question' + triviaId} className='mr-5 self-center'>Pregunta:</label>
                <textarea id={'question' + triviaId} onChange={handleQuestionChange} value={question} className='mx-2 py-1 px-3 rounded-md bg-sky-100' rows={2} />
                <label htmlFor={'explanation' + triviaId} className='mx-5 self-center'>Explicacion:</label>
                <textarea id={'explanation' + triviaId} onChange={handleExplanationChange} value={explanation} className='mx-2 py-1 px-3 rounded-md bg-sky-100' rows={2} />
            </div>
            <div>
                <h3 className='my-3'>Respuestas:</h3>
                {trivia?.answers?.map(answer => (
                    <TriviaAnswersEditor key={answer._id} answer={answer} handleTextChange={handleAnswerTextChange} handleIsCorrectChange={handleAnswerIsCorrectChange} handleDelete={handleAnswerDelete} />
                ))}
                <h3 className='my-3'>Puede agregar una nueva respuesta:</h3>
                <TriviaAnswersEditor answer={newAnswer} handleTextChange={handleNewAnswerTextChange} handleIsCorrectChange={handleNewAnswerIsCorrectChange} handleAdd={handleAddNewAnswer} />
            </div>
            <button onClick={() => saveTrivia(trivia)} className='bg-green-500 text-white rounded-md py-1 px-3 my-5 mx-2'>Guardar trivia</button>
            {isNewTrivia || <button onClick={() => deleteTrivia(trivia)} className='bg-red-500 text-white rounded-md py-1 px-3 my-5 mx-2'>Borrar trivia</button>}
        </div>
    )
}
