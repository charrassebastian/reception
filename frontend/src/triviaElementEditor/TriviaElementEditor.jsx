import { useMutation } from 'react-query'
import { useState } from 'react';
import { baseUrl } from '../api/url/url';
import { TriviaAnswersEditor } from '../TriviaAnswersEditor/TriviaAnswersEditor';

export function TriviaElementEditor(initialTrivia, isNewTrivia = false){
    const triviaId = initialTrivia.id;
    const [question, setQuestion] = useState(initialTrivia.question);
    const [explanation, setExplanation] = useState(initialTrivia.explanation);
    const [answers, setAnswers] = useState(initialTrivia.answers);
    const trivia = { triviaId, question, explanation, answers};
    const saveTrivia = useMutation(trivia => axios[isNewTrivia ? put : post](baseUrl + 'trivia/' + triviaId, trivia));
    
    const handleAnswerTextChange = (e, answerId) => {
        const previousIsCorrect = answers.filter(answer => answer.id === answerId)[0].isCorrect;
        const filteredAnswers = answers.filter(answer => answer.id !== answerId);
        const newAnswers = [...filteredAnswers, {id: answerId, text: e.targuet.value, isCorrect: previousIsCorrect}];
        setAnswers(newAnswers);
    }
    const handleAnswerIsCorrectChange = (e, answerId) => {
        const previousIsCorrect = answers.filter(answer => answer.id === answerId)[0].isCorrect;
        const filteredAnswers = answers.filter(answer => answer.id !== answerId);
        const newAnswers = [...filteredAnswers, {id: answerId, text: e.targuet.value, isCorrect: !previousIsCorrect}];
        setAnswers(newAnswers);
    }
    const handleAnswerDelete = answerId => setAnswers(answers.filter(answer => answer.id !== answerId));
    const handleQuestionChange = e => setQuestion(e.targuet.value);
    const handleExplanationChange = e => setExplanation(e.targuet.value);

    return (
        <div>
            <input onChange={handleQuestionChange}>{question}</input>
            <input onChange={handleExplanationChange}>{explanation}</input>
            <div>
                <h3>Respuestas</h3>
                {trivia.answers.map(answer => (
                    <TriviaAnswersEditor trivia={trivia} handleTextChange={handleAnswerTextChange} handleIsCorrectChange={handleAnswerIsCorrectChange} handleDelete={handleAnswerDelete} />
                ))}
            </div>
            <button onClick={() => saveTrivia(trivia)}>Guardar</button>
        </div>
    )
}