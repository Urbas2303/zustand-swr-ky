import { useEffect, useState } from 'react'
import { Star } from '../../../entities/star/ui/Star'

interface IStarRating {
	onRatingSubmit: (newRating: number) => void
	initialRating: number
}

const StarRating = ({ initialRating, onRatingSubmit }: IStarRating) => {
	const [rating, setRating] = useState(initialRating)
	const [hoveredRating, setHoveredRating] = useState(0)

	const mouseEnterHandler = (index: number) => {
		setHoveredRating(index + 1)
	}

	const mouseLeaveHandler = () => {
		setHoveredRating(0)
	}

	const clickHandler = (index: number) => {
		const newRating = index + 1
		setRating(newRating)
		onRatingSubmit(newRating)
	}

	useEffect(() => {
		if (rating === null) {
			setRating(0)
		}
	}, [rating])

	return (
		<div className='flex'>
			{[...Array(5)].map((_, index) => {
				const isFilled = hoveredRating ? index < hoveredRating : index < rating
				return (
					<Star
						key={index}
						filled={isFilled}
						onMouseEnter={() => mouseEnterHandler(index)}
						onMouseLeave={mouseLeaveHandler}
						onClick={() => clickHandler(index)}
					/>
				)
			})}
		</div>
	)
}

export { StarRating }
