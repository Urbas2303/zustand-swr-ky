import { useEffect, useState } from 'react'
import { Button } from '../../../shared/ui/Button'
import { IMark, useArticle } from '../../../store/articles/articleStore'
import { useUser } from '../../../store/users/userStore'
import { StarRating } from '../../../features/starRating/ui/StarRating'
import { addArticleRating } from '../../../store/articles/api/addArticleRating'

interface IArticleRating {
	articleId: string | undefined
	allMarks: IMark[] | undefined
}

const ArticleRating = ({ articleId, allMarks }: IArticleRating) => {
	const [isClicked, setIsClicked] = useState(false)
	const [isRated, setIsRated] = useState(false)
	const [rate, setRate] = useState<number | null>(null)
	const [rating, setRating] = useState<number | null>(null)
	const { user } = useUser()
	const { addMark, getArticleById, getArticleRating } = useArticle()

	useEffect(() => {
		if (user && allMarks) {
			const mark = allMarks.find(mark => mark.userId === user.id)
			if (mark) {
				setIsRated(true)
				setRate(mark.mark)
			}
		}
		const getRate = async () => {
			if (articleId) {
				const rate = await getArticleRating(articleId)
				if (rate) {
					setRating(rate)
				}
			}
		}
		getRate()
	}, [user, allMarks])

	const onClickHandler = () => {
		setIsClicked(!isClicked)
	}
	const onRatingSubmit = (newRating: number) => {
		if (user && articleId) {
			addMark(articleId, user?.id, newRating)
			const rating = getArticleById(articleId)?.rating
			console.log(rating)
			if (rating) {
				addArticleRating(articleId, rating)
			}
		}
		setIsClicked(false)
	}

	return (
		<div>
			<Button onClickHandler={onClickHandler}>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					fill={isRated ? '#6366f1' : '#eef2ff'}
					viewBox='0 0 24 24'
					strokeWidth='1.5'
					stroke='currentColor'
					className='size-6 mr-2'
				>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						d='M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z'
					/>
				</svg>
				{rating}
			</Button>

			<div
				aria-checked={isClicked}
				className={`flex bg-slate-100 p-2 rounded-full shadow-xl shadow-gray-600 border-2 border-black opacity-0 translate-y-10 aria-checked:opacity-100 aria-checked:translate-y-0 transition-all`}
			>
				<StarRating
					key={rate !== null ? rate : 'no-rate'}
					onRatingSubmit={onRatingSubmit}
					initialRating={rate ? rate : 0}
				/>
			</div>
		</div>
	)
}

export { ArticleRating }
