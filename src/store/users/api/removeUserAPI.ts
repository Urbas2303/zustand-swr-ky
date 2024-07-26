import ky from 'ky'

export const removeUserAPI = (id: string) => {
	const user = ky
		.delete(`https://6628fcdc54afcabd0737bf0d.mockapi.io/api/v1/users/${id}`)
		.json()

	return { user }
}
