import { decodeHtml } from "../utils/decodeHtml";

export const Category = ({category} : {category : string | undefined}) => {
    const decodedString = category && decodeHtml(category);
    return (
        <p className="textCard w-fit mx-auto px-8 text-center mt-16 text-2xl font-bold">{decodedString}</p>
    )
}