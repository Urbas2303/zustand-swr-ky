import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export interface IArticle {
	id: string
	userId: string
	title: string
	text: string
	createdAt: Date
	rating: IMark[]
}

export interface IMark {
	userId: string
	mark: number
}

interface IArticleStore {
	articleList: IArticle[]
	setArticleList: (articleList: IArticle[]) => void
	removeArticle: (id: string) => void
	getArticleById: (id: string) => IArticle | undefined
	addArticle: (article: IArticle) => void
	addMark: (articleId: string, userId: string, mark: number) => void
	getArticleRating: (id: string) => Promise<number>
}

export const useArticle = create<IArticleStore>()(
	devtools(
		persist(
			(set, get) => ({
				articleList: [],
				setArticleList: (articleList: IArticle[]) =>
					set({ articleList: articleList }),
				getArticleById: (id: string) =>
					get().articleList.find(article => article.id === id),
				addArticle: (article: IArticle) =>
					set({ articleList: [...get().articleList, article] }),
				removeArticle: (id: string) => {
					const result = get().articleList.filter(article => article.id !== id)
					set({ articleList: result })
				},
				addMark: (articleId: string, userId: string, mark: number) => {
					const article = get().articleList.find(
						article => article.id === articleId
					)
					if (article) {
						const articles = get().articleList.filter(
							article => article.id !== articleId
						)
						const articleMark = article?.rating.find(
							mark => mark.userId === userId
						)
						if (articleMark) {
							articleMark.mark = mark
							const marcs = article?.rating.filter(
								mark => mark.userId !== userId
							)
							article.rating = [...marcs, articleMark]
						} else {
							article.rating = [
								...article.rating,
								{ userId: userId, mark: mark },
							]
						}
						set({ articleList: [...articles, article] })
					}
				},
				getArticleRating: async (id: string) => {
					const article = get().articleList.find(article => article.id === id)
					if (article) {
						let sum: number = 0
						for (const mark of article.rating) {
							sum += mark.mark
						}
						const avg = sum / article.rating.length
						return Number(avg.toFixed(2))
					}
					return 0
				},
			}),
			{ name: 'article-store' }
		)
	)
)
