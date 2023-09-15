import Flash from 'react-reveal/Flash'

export function TriviaAnswersSection({ answers, differentiateCorrectAnswers }) {
    const answerElements = () => {
        if (!differentiateCorrectAnswers) {
            return answers.map(answer => <li key={answer._id} className="rounded-md m-5 py-3 px-6 text-3xl">{answer.text}</li>)

        } else {
            return answers.map(answer => (
                    !answer.isCorrect
                    ? <li key={answer._id} className="rounded-md m-5 py-3 px-6 text-3xl line-through">{answer.text}</li>
                    : <Flash><li key={answer._id} className="rounded-md m-5 py-3 px-6 bg-white text-[#292929] text-3xl">{answer.text}</li></Flash>
                )) 
        }
    }
    return (
        <div className="flex flex-col h-full items-center justify-center">
            <ul className="flex flex-row flex-wrap justify-between w-full">
                {answerElements()}
            </ul>
        </div>
    );
}
