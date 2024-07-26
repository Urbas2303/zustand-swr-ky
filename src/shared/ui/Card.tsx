import { ReactNode } from 'react'

interface ICard {
	children: ReactNode
}

const Card = ({ children }: ICard) => {
	return (
		<div className='m-2 p-4 flex items-center justify-center border-2 border-indigo-950 hover:border-indigo-700 rounded-3xl shadow-2xl hover:shadow-lg hover:shadow-black hover:scale-95 shadow-black bg-gray-400 transition-all'>
			{children}
		</div>
	)
}

export { Card }
