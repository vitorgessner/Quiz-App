import type { QueryDataResults } from "../types/QuizTypes";
import { decodeHtml } from "./decodeHtml";

export const transfromQuestion = (raw: QueryDataResults) => {
    return {
        ...raw,
        category: decodeHtml(raw.category),
        question: decodeHtml(raw.question),
        correct_answer: decodeHtml(raw.correct_answer),
        incorrect_answer: raw.incorrect_answers.map(decodeHtml),
    }
}