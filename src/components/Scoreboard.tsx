import { useQuery } from '@tanstack/react-query';
import { getCategories } from '../utils/api';
import type { CategoryDataResults, ScoreboardProps } from '../types/ScoreboardTypes';
import { useEffect, useState } from 'react';
import { decodeHtml } from '../utils/decodeHtml';
import { ArrowDownAZ, ArrowUpAZ } from 'lucide-react'

export const Scoreboard = ({ quizState, setQuizState }: ScoreboardProps) => {
    const [filterState, setFilterState] = useState<'filtered' | 'inverted' | null>(null);

    const { data: categories, isLoading, error, isRefetching } = useQuery<Array<CategoryDataResults>>({
        queryKey: ['categories'],
        queryFn: getCategories
    });

    useEffect(() => {
        if (!categories) return;

        setQuizState(prev => {
            let score = prev.score;

            if (!score) {
                score = localStorage.getItem('score')
                    ? JSON.parse(localStorage.getItem('score')!)
                    : {};
            }

            if (score) {
                categories.forEach(category => {
                    const decodedCategory = decodeHtml(category.name);
                    if (!score[decodedCategory]) {
                        score[decodedCategory] = { correct: 0, incorrect: 0 };
                    }
                });
            }

            return {
                ...prev,
                score: score
            };
        });
    }, [categories, setQuizState]);

    useEffect(() => {
        if (quizState.score) {
            localStorage.setItem('score', JSON.stringify(quizState.score))
        }
    }, [quizState.score])

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
        <div className="my-4 w-fit rounded-md md:grow">
            <span className='text-sm opacity-70 ml-1 block mb-1'>Click on the category header to filter</span>
            <table>
                <thead>
                    <tr>
                        <th onClick={
                            () => {
                                if (!filterState) {
                                    categories?.sort((a, b) => {
                                        return a.name.localeCompare(b.name);
                                    })
                                    return setFilterState('filtered');
                                }
                                if (filterState === 'filtered') {
                                    categories?.sort((a, b) => {
                                        return b.name.localeCompare(a.name);
                                    })
                                    return setFilterState('inverted');
                                }
                                categories?.sort((a, b) => a.id - b.id);
                                return setFilterState(null);
                            }
                        }
                            className='relative cursor-pointer selection:bg-gray-700 selection:text-white'
                        >
                            {filterState === 'filtered' ? <span><ArrowUpAZ size={20} className='filterIcon' /></span> : 
                            filterState === 'inverted' ? <span><ArrowDownAZ size={20} className='filterIcon' /></span> : null}Category
                        </th>
                        <th>Correct Answers</th>
                        <th>Wrong Answers</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {categories && categories?.map((category) => {
                        return (<tr key={category.id}>
                            <td>{category.name}</td>
                            {quizState.score && <><td className="text-green-400 border-white">{quizState.score[category.name].correct}</td>
                                <td className="text-red-400 border-white">{quizState.score[category.name].incorrect}</td>
                                <td>{quizState.score[category.name].correct + quizState.score[category.name].incorrect}</td></>}
                        </tr>)
                    })}
                </tbody>
            </table>
        </div>
    )
}