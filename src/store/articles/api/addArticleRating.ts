import ky from 'ky'
import { IArticle, IMark } from '../articleStore'

export const addArticleRating = async (articleId: string, marks: IMark[]) => {
	try {
		const article: IArticle = await ky
			.put(
				`https://6628fcdc54afcabd0737bf0d.mockapi.io/api/v1/articles/${articleId}`,
				{
					json: { rating: marks },
				}
			)
			.json()
		return article
	} catch (err) {
		throw err
	}
}
