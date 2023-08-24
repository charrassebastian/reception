export function TriviaAnswersSection({ answers, differentiateCorrectAnswers }) {
    // trivia.answers.filter(answer => answer.isCorrect)
    return (
        <div className="flex flex-col h-full items-center justify-center">
            <ul className="flex flex-row flex-wrap justify-between w-full">
                {answers.map(answer => (
                    differentiateCorrectAnswers && !answer.isCorrect
                        ? <li key={answer._id} className="rounded-md m-5 py-3 px-6 bg-slate-800 text-3xl line-through text-white">{answer.text}</li>
                        : <li key={answer._id} className="rounded-md m-5 py-3 px-6 bg-white text-3xl">{answer.text}</li>
                ))}
            </ul>
        </div>
    );
}
