import useSWR from 'swr'
import ky from 'ky'
import { IArticle } from '../articleStore'

const fetcher = async (url: string): Promise<IArticle[]> =>
	await ky.get(url).json()

export const useGetArticleList = () => {
	const { data, error, isLoading } = useSWR(
		`https://6628fcdc54afcabd0737bf0d.mockapi.io/api/v1/articles`,
		fetcher,
		{ refreshInterval: 5000 }
	)

	return { articleList: data, error, isLoading }
}
