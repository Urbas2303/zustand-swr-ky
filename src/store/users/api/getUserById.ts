import ky from 'ky'
import { IUser } from '../userStore'

export const getUserById = async (id: string): Promise<IUser> => {
	try {
		const user: IUser = await ky
			.get(`https://6628fcdc54afcabd0737bf0d.mockapi.io/api/v1/users/${id}`)
			.json()
		return user
	} catch (error) {
		throw error
	}
}
