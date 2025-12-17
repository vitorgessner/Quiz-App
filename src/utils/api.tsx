export const getQuestion = async () => {
    const data = await fetch('https://opentdb.com/api.php?amount=1&type=multiple');

    if (!data.ok) throw new Error("Error fetching data");

    const response = await data.json();
    return response.results[0]
}