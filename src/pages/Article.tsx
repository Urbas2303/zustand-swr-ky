import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { IUser, useUser } from '../store/users/userStore'
import { IArticle, useArticle } from '../store/articles/articleStore'
import { ArticleRating } from '../widgets/articleRating/ui/ArticleRating'
import { Button } from '../shared/ui/Button'
import { removeArticleAPI } from '../store/articles/api/removeArticleAPI'

const Article = () => {
	const { id } = useParams()
	const { getUserById, user: thisUser } = useUser()
	const { getArticleById, getArticleRating, removeArticle } = useArticle()
	const [isMyArticle, setIsMyArticle] = useState(false)
	const [article, setArticle] = useState<IArticle>()
	const [user, setUser] = useState<IUser>()
	const navigate = useNavigate()

	const articleId = id ? id : '1'

	useEffect(() => {
		const getAtr = getArticleById(articleId)
		if (getAtr) {
			setArticle(getAtr)
		}
		if (article) {
			const getU = getUserById(article.userId)
			if (getU) {
				setUser(getU)
			}
		}
		if (thisUser && user && thisUser.id === user.id) {
			setIsMyArticle(true)
		}
	}, [
		getArticleById,
		articleId,
		article,
		thisUser,
		user,
		getUserById,
		id,
		getArticleRating,
	])
	const onClickHandler = () => {
		if (id && user) {
			removeArticle(id)
			removeArticleAPI(id, user.id)
			navigate('/lk')
		}
	}

	return (
		<div className='flex bg-gray-300 w-full h-full items-center justify-center pb-10'>
			<div className='w-2/3'>
				<h2 className='text-2xl mx-4 my-2 font-semibold'>{article?.title}</h2>
				<p className='p-2 border-b-2'>{article?.text}</p>
				<div className='m-4 flex items-center justify-between'>
					<div>
						<ArticleRating articleId={article?.id} allMarks={article?.rating} />
					</div>
					<div className='flex items-center justify-end'>
						<img
							className='w-12 h-12 rounded-full border-2'
							src={user?.avatar}
							alt='img'
						/>
						<div>
							<h3 className='font-semibold'>{user?.name}</h3>
							<p className='font-extralight text-right text-sm'>
								@{user?.login}
							</p>
						</div>
					</div>
				</div>
				<div className='flex items-center justify-end'>
					{isMyArticle && (
						<Button onClickHandler={onClickHandler}>delete article</Button>
					)}
				</div>
			</div>
		</div>
	)
}

export default Article
