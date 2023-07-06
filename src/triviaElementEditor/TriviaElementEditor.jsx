import { useMutation } from 'react-query'
import { useState } from 'react';
import { baseUrl } from '../api/url/url';

export function TriviaElementEditor(initialTrivia){
    const { triviaId: id } = initialTrivia;
    const [question, setQuestion] = useState(initialTrivia.question);
    const [explanation, setExplanation] = useState(initialTrivia.explanation);
    const [answers, setAnswers] = useState(initialTrivia.answers);
    const trivia = { triviaId, question, explanation, answers};
    const saveTrivia = useMutation(trivia => axios.post(baseUrl + 'trivia/' + triviaId, trivia));
    
    const handleAnswerChange = (e, answerId) => {
        const filteredAnswers = answers.filter(answer => answer.id !== answerId);
        const newAnswers = [...filteredAnswers, {id: id, text: e.targuet.value}];
        setAnswers(newAnswers);
    }
    const handleQuestionChange = e => setQuestion(e.targuet.value);
    const handleExplanationChange = e => setExplanation(e.targuet.value);

    return (
        <div>
            <input onChange={handleQuestionChange}>{question}</input>
            <input onChange={handleExplanationChange}>{explanation}</input>
            <div>
                {trivia.answers.map(answer => 
                    <div>
                        <label for={'answer' + answer.id}>Respuesta:</label>
                        <input id={'answer' + answer.id} onChange={handleAnswerChange(e, answer.id)}>{answer.text}</input>
                    </div>)}
            </div>
            <button onClick={() => saveTrivia(trivia)}>Guardar</button>
        </div>
    )
}
