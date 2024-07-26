import { useState } from 'react'
import { ArticlesList } from '../widgets/articlesList/ui/ArticlesList'
import { Header } from '../widgets/header/ui/Header'

const PersonalAccount = () => {
	const [isFiltered, setIsFiltered] = useState(false)

	const onFilterHandler = () => {
		setIsFiltered(!isFiltered)
	}
	return (
		<div className='flex flex-col bg-gray-300 w-full h-screen items-center overflow-x-hidden'>
			<Header onFilterHandler={onFilterHandler} isFiltered={isFiltered} />
			<ArticlesList isFiltered={isFiltered} />
		</div>
	)
}

export default PersonalAccount
