import { decodeHtml } from "../utils/decodeHtml";

export const Category = ({category} : {category : string | undefined}) => {
    const decodedString = category && decodeHtml(category);
    return (
        <p className="textCard mx-auto px-4 text-center mt-25 font-bold md:text-2xl md:w-fit">{decodedString}</p>
    )
}