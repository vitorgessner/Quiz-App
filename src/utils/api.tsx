export const getQuestion = async () => {
    try {
        const data = await fetch('https://opentdb.com/api.php?amount=1&difficulty=easy&type=multiple');
        const response = data.json();
        return response;
    } catch (e) {
        return e;
    }
}