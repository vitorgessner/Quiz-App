import { useQuery } from '@tanstack/react-query';
import { getCategories } from '../utils/api';
import type { CategoryDataResults, ScoreboardProps } from '../types/ScoreboardTypes';
import { useEffect } from 'react';

export const Scoreboard = ({ quizState, setQuizState }: ScoreboardProps) => {
    const { data: categories, isLoading, error, isRefetching } = useQuery<Array<CategoryDataResults>>({
        queryKey: ['categories'],
        queryFn: getCategories
    });

    useEffect(() => {
        if (!categories) return;
    
        setQuizState(prev => {
            if (prev.score !== null) return prev;
    
            const initialScore = categories.reduce((acc, category) => {
                acc[category.name] = { correct: 0, incorrect: 0 };
                return acc;
            }, {} as Record<string, { correct: number; incorrect: number }>);
    
            return {
                ...prev,
                score: initialScore,
            };
        });
    }, [categories, setQuizState]);

    if (error) {
        return <span>Error fetching categories: {error.message}</span>
    }

    if (isLoading) {
        return <span>Loading categories...</span>
    }

    if (isRefetching) {
        return <span>Refetching categories...</span>
    }

    return (
        <div className="p-2 my-4 rounded-md">
            <table>
                <thead>
                    <tr>
                        <th>Category</th>
                        <th>Correct Answers</th>
                        <th>Wrong Answers</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {categories && categories?.map((category) => {
                        return (<tr key={category.id}>
                            <td>{category.name}</td>
                            <td className="text-green-400 border-white">{quizState.score && quizState.score[category.name].correct}</td>
                            <td className="text-red-400 border-white">{quizState.score && quizState.score[category.name].incorrect}</td>
                            <td>{quizState.score && quizState.score[category.name].correct + quizState.score[category.name].incorrect}</td>
                        </tr>)
                    })}
                </tbody>
            </table>
        </div>
    )
}