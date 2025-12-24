import type { QuizStateProps } from "../types/QuizTypes"

export const Category = ({quizState} : {quizState : QuizStateProps}) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(quizState.category!, 'text/html');
    const decodedString = doc.body.textContent
    return (
        <p className="text-center mt-16 text-2xl font-bold">{decodedString}</p>
    )
}