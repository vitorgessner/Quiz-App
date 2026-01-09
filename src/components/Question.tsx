import type { QuizStateProps } from "../types/QuizTypes"
import { decodeHtml } from "../utils/decodeHtml";

export const Question = ({ quizState }: { quizState: QuizStateProps }) => {
    const decodedString = quizState.question && decodeHtml(quizState.question);
    return (
        <h1 className="textCard w-fit mx-auto px-8 text-center my-8 text-xl">{decodedString}</h1>

    )
}