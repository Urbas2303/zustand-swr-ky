interface IUserCard {
	name: string
	login: string
	avatar: string
}

const UserCard = ({ name, login, avatar }: IUserCard) => {
	return (
		<div className='flex items-center justify-center'>
			<img
				className='w-10 h-10 object-cover rounded-full mr-4 border-2 border-indigo-700 shadow-lg shadow-gray-500'
				src={avatar}
				alt='img'
			/>
			<div>
				<h3 className='font-semibold mr-4'>{name}</h3>
				<p className='text-gray-600 text-xs'>@{login}</p>
			</div>
		</div>
	)
}

export { UserCard }
