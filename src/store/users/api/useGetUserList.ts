import useSWR from 'swr'
import ky from 'ky'
import { IUser } from '../userStore'

const fetcher = async (url: string): Promise<IUser[]> =>
	await ky.get(url).json()

export const useGetUserList = () => {
	const { data, error, isLoading } = useSWR(
		`https://6628fcdc54afcabd0737bf0d.mockapi.io/api/v1/users`,
		fetcher,
		{ refreshInterval: 5000 }
	)

	return { userList: data, error, isLoading }
}
