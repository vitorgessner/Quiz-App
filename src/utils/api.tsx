// import type { QueryDataResults } from "../types/QuizTypes";

export const getQuestion = async () => {
    const data = await fetch('https://opentdb.com/api.php?amount=50&type=multiple');

    if (!data.ok) throw new Error("Error fetching data");

    const response = await data.json();
    return response.results
}

// export const getQuestion = async ({number} : { number: number }) => {

//     const questions : Array<QueryDataResults> = await getQuestions()
//     return questions[number]
// }