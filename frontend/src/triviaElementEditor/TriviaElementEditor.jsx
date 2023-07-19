import { useMutation } from 'react-query'
import { useState, useRef } from 'react';
import { baseUrl } from '../api/url/url';
import { TriviaAnswersEditor } from '../triviaAnswersEditor/TriviaAnswersEditor';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

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
    const [newAnswer, setNewAnswer] = useState({ _id: uuidv4(), text: 'Respuesta', isCorrect: false })
    const triviaId = getId();
    const trivia = { _id: triviaId, question, explanation, answers };
    const saveTrivia = useMutation({
        mutationFn: trivia => {
            console.log(trivia)
            if (isNewTrivia) axios.post(baseUrl + 'trivia', trivia)
            else axios.put(baseUrl + 'trivia/' + trivia._id, trivia)
        }
    }).mutate;
    const deleteTrivia = useMutation({
        mutationFn: trivia => {
            axios.delete(baseUrl + 'trivia/' + trivia._id)
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
    return (
        <div>
            <h3>ID: {triviaId}</h3>
            <label>
                Pregunta:
                <input id={'' + question + triviaId} onChange={handleQuestionChange} value={question}></input>
            </label>
            <label>
                Explicacion:
                <input id={'' + explanation + triviaId} onChange={handleExplanationChange} value={explanation}></input>
            </label>
            <div>
                <h3>Respuestas</h3>
                {trivia?.answers?.map(answer => (
                    <TriviaAnswersEditor answer={answer} handleTextChange={handleAnswerTextChange} handleIsCorrectChange={handleAnswerIsCorrectChange} handleDelete={handleAnswerDelete} />
                ))}
                <h3>Puede agregar una nueva respuesta</h3>
                <TriviaAnswersEditor answer={newAnswer} handleTextChange={handleNewAnswerTextChange} handleIsCorrectChange={handleNewAnswerIsCorrectChange} />
            </div>
            <button onClick={() => saveTrivia(trivia)}>Guardar trivia</button>
            {isNewTrivia || <button onClick={() => deleteTrivia(trivia)}>Borrar trivia</button>}
        </div>
    )
}
