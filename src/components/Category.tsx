import type { QuizStateProps } from "../types/QuizTypes"
import { decodeHtml } from "../utils/decodeHtml";

export const Category = ({quizState} : {quizState : QuizStateProps}) => {
    const decodedString = quizState.category && decodeHtml(quizState.category);
    return (
        <p className="textCard w-fit mx-auto px-8 text-center mt-16 text-2xl font-bold">{decodedString}</p>
    )
}