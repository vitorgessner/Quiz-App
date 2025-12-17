import type { QuizStateProps } from "../types/QuizTypes"

export const Question = ({ quizState }: { quizState: QuizStateProps }) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(quizState.question!, 'text/html');
    const decodedString = doc.body.textContent
    return (
        <h1 className="text-center my-8 px-3 text-xl">{decodedString}</h1>

    )
}