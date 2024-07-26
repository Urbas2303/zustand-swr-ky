import ky from 'ky'
import { IArticle } from '../articleStore'

export const createArticle = async (
	userId: string,
	title: string,
	text: string
) => {
	const data: IArticle = await ky
		.post(`https://6628fcdc54afcabd0737bf0d.mockapi.io/api/v1/articles`, {
			json: { userId: userId, title: title, text: text },
		})
		.json()

	return data
}
