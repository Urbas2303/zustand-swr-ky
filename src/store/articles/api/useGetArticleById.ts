import useSWR from 'swr'
import ky from 'ky'

const fetcher = (url: string) => ky.get(url).json()

export const useGetArticleById = (id: string) => {
	const { data, error, isLoading } = useSWR(
		`https://6628fcdc54afcabd0737bf0d.mockapi.io/api/v1/articles/${id}`,
		fetcher
	)

	return { article: data, error, isLoading }
}
