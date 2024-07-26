import { Link, useNavigate } from 'react-router-dom'
import { UserCard } from '../../../entities/userCard/ui/UserCard'
import { Button } from '../../../shared/ui/Button'
import { useUser } from '../../../store/users/userStore'
import { removeUserAPI } from '../../../store/users/api/removeUserAPI'

interface IHeader {
	onFilterHandler: () => void
	isFiltered: boolean
}

const Header = ({ onFilterHandler, isFiltered }: IHeader) => {
	const { clearUser, user, removeUser } = useUser()
	const navigate = useNavigate()

	const onClickLogoutHandler = () => {
		clearUser()
	}

	const onDeleteAccountHandler = () => {
		if (user) {
			removeUser(user.id)
			clearUser()
			removeUserAPI(user.id)
			navigate('/')
		}
	}

	return (
		<div className='grid-rows-2 w-11/12 items-center max-w-full justify-center rounded-b-full border-b-2 border-x-2 hover:scale-110 hover:p-2 border-indigo-700 bg-indigo-300 transition-all shadow-xl shadow-gray-600 hover:shadow-2xl -translate-y-12 hover:translate-y-0 hover:shadow-gray-600 mb-10 animate-slideUp'>
			<div>
				<div className='flex items-center justify-center'>
					<Button onClickHandler={onClickLogoutHandler}>Logout</Button>
					<Link
						className='m-2 px-4 py-1 rounded-full border-2 border-indigo-950 bg-indigo-800 text-white hover:bg-indigo-700 active:bg-indigo-950 shadow-xl shadow-gray-700 active:shadow-sm active:shadow-gray-700 active:scale-95 uppercase transition-all'
						to='/lk/article/create'
					>
						Create new article
					</Link>
					<Button
						onClickHandler={onFilterHandler}
						setClasses={
							isFiltered
								? 'bg-green-500 hover:bg-green-300 active:bg-green-950'
								: ''
						}
					>
						My Articles
					</Button>
					<Button onClickHandler={onDeleteAccountHandler}>
						Delete Account
					</Button>
				</div>
			</div>
			<div className='flex my-2'>
				<div className='w-2/6'></div>
				<div className='w-2/6 flex items-start justify-center'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						strokeWidth='1.5'
						stroke='currentColor'
						className='size-6'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='m4.5 18.75 7.5-7.5 7.5 7.5'
						/>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='m4.5 12.75 7.5-7.5 7.5 7.5'
						/>
					</svg>
				</div>
				<div className='w-2/6'>
					{user && (
						<UserCard
							name={user?.name}
							login={user?.login}
							avatar={user?.avatar}
						/>
					)}
				</div>
			</div>
		</div>
	)
}

export { Header }
