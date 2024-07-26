import ky from 'ky'
import { IUser } from '../userStore'

export const createUser = async (
	login: string,
	password: string
): Promise<IUser> => {
	try {
		const user: IUser = await ky
			.post('https://6628fcdc54afcabd0737bf0d.mockapi.io/api/v1/users', {
				json: { login: login, password: password },
			})
			.json()
		return user
	} catch (err) {
		throw err
	}
}
