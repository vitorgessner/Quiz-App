import { useQuery, useQueryClient, QueryClientProvider } from '@tanstack/react-query';
import { getQuestion } from '../utils/api'

export const Category = () => {
    const queryClient = useQueryClient();

    const query = useQuery({
        queryKey: ['question'],
        queryFn: getQuestion
    })

    return (
        <QueryClientProvider client={queryClient}>
            <p className="text-center mt-16 text-2xl font-bold">{query.data?.results[0].category}</p>
        </QueryClientProvider>
    )
}