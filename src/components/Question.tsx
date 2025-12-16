import { useQueryClient, useQuery, QueryClientProvider } from "@tanstack/react-query"
import { getQuestion } from "../utils/api"

export const Question = () => {
    const queryClient = useQueryClient()

    const query = useQuery({
        queryKey: ['question'],
        queryFn: getQuestion
    })

    return (
        <QueryClientProvider client={queryClient}>
            <h1 className="text-center my-8 px-3 text-xl">{query.data?.results[0].question}</h1>
        </QueryClientProvider>
    )
}