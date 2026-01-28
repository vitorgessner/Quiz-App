import { decodeHtml } from "../utils/decodeHtml";

export const Question = ({ question }: { question: string | undefined }) => {
    const decodedString = question && decodeHtml(question);
    return (
        <h1 className="textCard w-fit mx-auto px-8 text-center my-8 text-xl md:text-2xl">{decodedString}</h1>

    )
}