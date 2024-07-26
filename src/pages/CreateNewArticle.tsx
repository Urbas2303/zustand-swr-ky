import { useId, useState } from 'react'
import { Button } from '../shared/ui/Button'
import { createArticle } from '../store/articles/api/createArticle'
import { useUser } from '../store/users/userStore'
import { useArticle } from '../store/articles/articleStore'
import { useNavigate } from 'react-router-dom'

const CreateNewArticle = () => {
	const titleId = useId()
	const textId = useId()
	const [title, setTitle] = useState('')
	const [text, setText] = useState('')
	const { user } = useUser()
	const { addArticle } = useArticle()
	const navigate = useNavigate()

	const onClickHandler = async () => {
		if (user) {
			const newArticle = await createArticle(user.id, title, text)
			addArticle(newArticle)
			navigate('/lk')
		}
	}

	const titleOnChangeHandler = (
		e: React.ChangeEvent<HTMLInputElement>
	): void => {
		setTitle(e.target.value)
	}

	const textOnChangeHandler = (
		e: React.ChangeEvent<HTMLTextAreaElement>
	): void => {
		setText(e.target.value)
	}

	return (
		<div className='flex flex-col bg-gray-300 w-full h-screen items-center justify-center'>
			<div className='flex flex-col w-2/3'>
				<label className='font-semibold' htmlFor={titleId}>
					Title
				</label>
				<input
					className='mb-4 rounded-xl  px-4 py-2'
					type='text'
					name='title'
					id={titleId}
					value={title}
					onChange={titleOnChangeHandler}
				/>
				<label className='text-sm' htmlFor={textId}>
					Text
				</label>
				<textarea
					className='rounded-xl px-4 py-2 h-72'
					name='text'
					id={textId}
					value={text}
					onChange={textOnChangeHandler}
				/>
				<div className='flex items-center justify-end'>
					<Button onClickHandler={onClickHandler}>Save</Button>
				</div>
			</div>
		</div>
	)
}

export default CreateNewArticle
