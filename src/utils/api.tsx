// import type { QueryDataResults } from "../types/QuizTypes";

export const getQuestion = async () => {
    const data = await fetch('https://opentdb.com/api.php?amount=50&type=multiple&category=11');

    if (!data.ok) throw new Error("Error fetching data");

    const response = await data.json();
    return response.results;
}

export const getCategories = async () => {
    const data = await fetch('https://opentdb.com/api_category.php');

    if (!data.ok) throw new Error("Error fetching data");

    const response = await data.json();
    return response.trivia_categories;
}

// export const getQuestion = async ({number} : { number: number }) => {

//     const questions : Array<QueryDataResults> = await getQuestions()
//     return questions[number]
// }