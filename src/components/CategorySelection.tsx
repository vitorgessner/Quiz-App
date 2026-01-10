import type { QuizStateProps } from "../types/QuizTypes";
import type { CategoryDataResults } from "../types/ScoreboardTypes"
import { getCategories } from "../utils/api"
import { useQuery, useQueryClient } from '@tanstack/react-query';

export const CategorySelection = ({ quizState, setQuizState }: { quizState: QuizStateProps, setQuizState: React.Dispatch<React.SetStateAction<QuizStateProps>> }) => {
    const queryClient = useQueryClient();
    const { data: categories, error, isLoading, isRefetching } = useQuery<Array<CategoryDataResults>>({
        queryKey: ['categories'],
        queryFn: getCategories
    })

    if (error) {
        return <span></span>
    }

    if (isLoading) {
        return <span></span>
    }

    if (isRefetching) {
        return <span></span>
    }

    categories?.sort((a, b) => {
        return a.name.localeCompare(b.name);
    })

    const handleCategoryChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        await setQuizState(prev => {
            return {
                ...prev,
                categoryId: Number(e.target.value),
                isAnswered: false,
                answers: [],
                category: null,
                correct_answer: null,
                isCorrect: false,
                question: null,
                questionNumber: prev.questionNumber + 1,
                timer: 15,
            }
        })
        await queryClient.invalidateQueries({ queryKey: ['question'], });
    }

    return ( quizState.categoryId && 
        (<label className="flex gap-2 mt-4">Category: <select className="border-2 p-1 rounded-md bg-gray-950 cursor-pointer disabled:opacity-70 disabled:cursor-default w-full"
            onChange={handleCategoryChange}
        value={quizState.categoryId}
        disabled={!quizState.isAnswered}>
            <option value={''}>All Categories</option>
            {categories && categories.map(category => <option value={category.id} key={category.id}>{category.name}</option>)}
        </select></label>)
    )
}