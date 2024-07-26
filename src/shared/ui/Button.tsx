import { ReactNode } from 'react'

interface IButton {
	onClickHandler: () => void
	children: string | ReactNode
	setClasses?: string
}

const Button = ({ onClickHandler, children, setClasses }: IButton) => {
	return (
		<button
			className={`flex m-2 px-4 py-1 rounded-full border-2 border-indigo-950  text-white shadow-xl shadow-gray-700 active:shadow-md active:shadow-gray-700 active:scale-95 uppercase transition-all ${
				setClasses
					? setClasses
					: 'bg-indigo-800 hover:bg-indigo-700 active:bg-indigo-950'
			}`}
			onClick={onClickHandler}
		>
			{children}
		</button>
	)
}

export { Button }
