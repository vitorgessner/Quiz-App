import type { CategorySelectionProps } from "../types/QuizTypes";
import type { CategoryDataResults } from "../types/ScoreboardTypes"
import { getCategories } from "../utils/api"
import { useQuery } from '@tanstack/react-query';

export const CategorySelection = ({ selectedCategory, onCategoryChange, disabled}: CategorySelectionProps) => {
    const { data: categories, error, isLoading, isRefetching } = useQuery<Array<CategoryDataResults>>({
        queryKey: ['categories'],
        queryFn: getCategories
    })

    if (error) {
        return <span>teste</span>
    }

    if (isLoading) {
        return <span>testeeee</span>
    }

    if (isRefetching) {
        return <span>tesese</span>
    }

    categories?.sort((a, b) => {
        return a.name.localeCompare(b.name);
    })

    const handleCategoryChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        onCategoryChange(Number(e.target.value));
    }

    return (
        <label className="flex gap-2 mt-4 absolute bottom-3 left-35">Category: <select className="border-2 p-1 rounded-md bg-gray-950 cursor-pointer disabled:opacity-70 disabled:cursor-default w-full"
            onChange={handleCategoryChange}
            value={selectedCategory ?? ''}
            disabled={disabled}>
            <option value={''}>All Categories</option>
            {categories && categories.map(category => <option value={category.id} key={category.id}>{category.name}</option>)}
        </select>
        </label>
    )
}