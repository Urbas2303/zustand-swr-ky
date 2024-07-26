import { Link } from 'react-router-dom'
import { Card } from '../../../shared/ui/Card'

const StartingCard = () => {
	return (
		<Card>
			<section className='flex items-center justify-center flex-col  min-w-80 min-h-52'>
				<Link
					className='m-2 px-4 py-1 rounded-full border-2 border-indigo-950 bg-indigo-800 text-white hover:bg-indigo-700 active:bg-indigo-950 shadow-xl shadow-gray-700 active:shadow-sm active:shadow-gray-700 active:scale-95 uppercase transition-all'
					to='/login'
				>
					Login
				</Link>
				<Link
					className='m-2 px-4 py-1 rounded-full border-2 border-indigo-950 bg-indigo-800 text-white hover:bg-indigo-700 active:bg-indigo-950 shadow-xl shadow-gray-700 active:shadow-sm active:shadow-gray-700 active:scale-95 uppercase transition-all'
					to='/registration'
				>
					Registration
				</Link>
			</section>
		</Card>
	)
}

export { StartingCard }
