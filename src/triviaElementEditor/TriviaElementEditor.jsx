import { useMutation } from 'react-query'
import { useState } from 'react';
import { baseUrl } from '../api/url/url';
import { triviaAnswersEditor } from '../triviaAnswersEditor/triviaAnswersEditor';

export function TriviaElementEditor(initialTrivia, isNewTrivia = false){
    const { triviaId: id } = initialTrivia;
    const [question, setQuestion] = useState(initialTrivia.question);
    const [explanation, setExplanation] = useState(initialTrivia.explanation);
    const [answers, setAnswers] = useState(initialTrivia.answers);
    const trivia = { triviaId, question, explanation, answers};
    const saveTrivia = useMutation(trivia => axios[isNewTrivia ? put : post](baseUrl + 'trivia/' + triviaId, trivia));
    
    const handleAnswerChange = (e, answerId) => {
        const filteredAnswers = answers.filter(answer => answer.id !== answerId);
        const newAnswers = [...filteredAnswers, {id: id, text: e.targuet.value}];
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
                    <triviaAnswersEditor trivia={trivia} handleChange={handleAnswerChange} handleDelete={handleAnswerDelete}></triviaAnswersEditor>
                ))}
            </div>
            <button onClick={() => saveTrivia(trivia)}>Guardar</button>
        </div>
    )
}
