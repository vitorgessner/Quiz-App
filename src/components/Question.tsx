import type { QuizStateProps } from "../types/QuizTypes"
import { decodeHtml } from "../utils/decodeHtml";

export const Question = ({ quizState }: { quizState: QuizStateProps }) => {
    const decodedString = quizState.question && decodeHtml(quizState.question);
    return (
        <h1 className="text-center my-8 px-3 text-xl">{decodedString}</h1>

    )
}