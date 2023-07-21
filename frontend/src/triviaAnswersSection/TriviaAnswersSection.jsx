export function TriviaAnswersSection({ answers }){
    return (
        <div className="flex flex-col h-full items-center justify-center">
            <ul className="flex flex-row justify-around w-full">
                {answers.map(answer => <li key={answer._id} className="rounded-md py-3 px-6 bg-white text-3xl">{answer.text}</li>)}
            </ul>
        </div>
    );
}
