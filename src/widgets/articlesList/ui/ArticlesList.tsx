import { useEffect, useState } from 'react'
import { useUser } from '../../../store/users/userStore'
import { IArticle, useArticle } from '../../../store/articles/articleStore'
import { useGetUserList } from '../../../store/users/api/useGetUserList'
import { useGetArticleList } from '../../../store/articles/api/useGetArticleList'
import { ArticleMini } from '../../../entities/articleMini/ui/ArticleMini'

interface IArticlesList {
	isFiltered: boolean
}

const ArticlesList = ({ isFiltered }: IArticlesList) => {
	const { setUserList, user } = useUser()
	const { setArticleList } = useArticle()
	const [filteredArticles, setFilteredArticles] = useState<IArticle[]>([])

	const { userList, error: userError } = useGetUserList()
	const { articleList, error: articleError } = useGetArticleList()

	useEffect(() => {
		if (userList) {
			setUserList(userList)
		}
		if (articleList && user) {
			setArticleList(articleList)
			if (isFiltered) {
				const filtered = articleList.filter(
					article => article.userId === user.id
				)
				setFilteredArticles(filtered)
			} else {
				setFilteredArticles(articleList)
			}
		}
	}, [setUserList, setArticleList, userList, articleList, isFiltered, user])
	return (
		<div className='flex flex-wrap justify-between items-start w-10/12 p-2 mx-4 mb-4'>
			{userList &&
				filteredArticles &&
				filteredArticles.map(article => (
					<ArticleMini key={article.id} articleId={article.id} />
				))}
			{(userError || articleError) && <h1>Something went wrong!</h1>}
		</div>
	)
}

export { ArticlesList }
