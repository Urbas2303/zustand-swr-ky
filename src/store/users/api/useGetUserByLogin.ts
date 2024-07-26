import useSWR from 'swr'
import ky from 'ky'
import { IUser } from '../userStore'

const fetcher = async (url: string) => {
	const res: IUser[] = await ky.get(url).json()
	if (res.length > 1) {
		const error = new Error('Too many coincidences')
		throw error
	}
	if (res.length < 1) {
		const error = new Error('Not found')
		throw error
	}
	return res[0]
}

export const useGetUserByLogin = (login: string) => {
	const searchParams = new URLSearchParams()
	searchParams.set('login', login)
	const { data, error, isLoading } = useSWR(
		`https://6628fcdc54afcabd0737bf0d.mockapi.io/api/v1/users?${searchParams}`,
		fetcher
	)

	return { user: data, error, isLoading }
}
