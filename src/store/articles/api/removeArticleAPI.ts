import ky from 'ky'

export const removeArticleAPI = async (articleId: string, userId: string) => {
	const article = await ky
		.delete(
			`https://6628fcdc54afcabd0737bf0d.mockapi.io/api/v1/users/${userId}/articles/${articleId}`
		)
		.json()

	return { article }
}
