export const getQuestion = async (category? : number) => {
    const data = category ? await fetch(`https://opentdb.com/api.php?amount=50&type=multiple&category=${category}`) : 
    await fetch(`https://opentdb.com/api.php?amount=50&type=multiple`)

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