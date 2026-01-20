import { useQuery } from '@tanstack/react-query';
import { getCategories } from '../utils/api';
import type { CategoryDataResults } from '../types/ScoreboardTypes';
import { useState } from 'react';
import { ArrowDownAZ, ArrowUpAZ } from 'lucide-react'
import { useScore } from '../hooks/useScore';

export const Scoreboard = () => {
    const [filterState, setFilterState] = useState<'filtered' | 'inverted' | null>('filtered');

    const { data: categories, isLoading, error, isRefetching } = useQuery<Array<CategoryDataResults>>({
        queryKey: ['categories'],
        queryFn: getCategories
    });

    const { score } = useScore();

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
            <span className='text-sm opacity-70 ml-1 block mb-1'>Click on the category header to filter alphabetically</span>
            <table>
                <thead>
                    <tr>
                        <th onClick={() => {
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
                            }}
                            className='relative cursor-pointer selection:bg-gray-700 selection:text-white'
                        >{filterState === 'filtered' ? <span><ArrowUpAZ size={20} className='filterIcon' /></span> :
                            filterState === 'inverted' ? <span><ArrowDownAZ size={20} className='filterIcon' /></span> : null}
                            Category
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
                            {score && <><td className="text-green-400 border-white">{score[category.name]?.correct ?? 0}</td>
                                <td className="text-red-400 border-white">{score[category.name]?.incorrect ?? 0}</td>
                                <td>{(score[category.name]?.correct + score[category.name]?.incorrect) || 0}</td></>}
                        </tr>)
                    })}
                </tbody>
            </table>
        </div>
    )
}