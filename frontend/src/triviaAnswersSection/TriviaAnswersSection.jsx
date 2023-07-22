export function TriviaAnswersSection({ answers }){
    return (
        <div className="flex flex-col h-full items-center justify-center">
            <ul className="flex flex-row flex-wrap justify-between w-full">
                {answers.map(answer => <li key={answer._id} className="rounded-md m-5 py-3 px-6 bg-white text-3xl">{answer.text}</li>)}
            </ul>
        </div>
    );
}
