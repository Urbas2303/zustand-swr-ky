import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export interface IUser {
	id: string
	name: string
	login: string
	password: string
	avatar: string
	createdAt: Date
}

interface IUserStore {
	user: IUser | null
	userList: IUser[]
	setUser: (user: IUser) => void
	setUserList: (user: IUser[]) => void
	clearUser: () => void
	getUserById: (id: string) => IUser | undefined
	removeUser: (id: string) => void
}

export const useUser = create<IUserStore>()(
	devtools(
		persist(
			(set, get) => ({
				user: null,
				userList: [],
				setUser: user => set({ user: user }),
				setUserList: (userList: IUser[]) => set({ userList: userList }),
				getUserById: (id: string) =>
					get().userList.find(user => user.id === id),
				clearUser: () => set({ user: null }),
				removeUser: (id: string) => {
					const newList = get().userList.filter(user => user.id !== id)
					set({ userList: newList })
				},
			}),
			{ name: 'user-store' }
		)
	)
)
