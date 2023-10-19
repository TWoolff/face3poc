import { Fragment, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DataContext, IAppState, IData } from '../App'
import Arrow from '../../assets/images/Arrow.svg?react'
import Glyph from '../../assets/images/Glyph.svg?react'
import css from './claims.module.css'

const Claim = ({ title, description, className, linkTo, setQuery, filteredWords, setFilteredWords }: IData) => {
	const handleClick = () => {
		setQuery(linkTo)
		setFilteredWords([])
	}

	return (
		<button className={className} onClick={handleClick}>
			<div className={css.claimInfo}>
				<h2>{title}</h2>
				{description && <p>{description}</p>}
				{filteredWords.length > 0 && <p className={css.keyWords}>Nøgleord: {filteredWords.join(', ')}</p>}
			</div>
			<Arrow />
		</button>
	)
}

const DeepClaim = ({ title, description, onClick }: IData) => {
    return (
        <div className={css.subCat}> 
            <button className={css.claim} onClick={onClick}>
                <div className={css.claimInfo}>
                    <h2>{title}</h2>
                    {description && <p>{description}</p>}
                </div>
                <Glyph />
            </button>
        </div>
    )
}

const Claims = () => {
	const { data, query, keywords, setQuery } = useContext<IAppState>(DataContext)
	const [filteredWords, setFilteredWords] = useState<string[]>([])
	const [filteredData, setFilteredData] = useState<IData[]>(data)
	const navigate = useNavigate()

	const handleDeepClaimClick = (deepestObject: IData) => {
		const query = { deepestObject: JSON.stringify(deepestObject) }
		navigate({
			pathname: '/form',
			search: '?' + new URLSearchParams(query).toString(),
		})
	}

	useEffect(() => {
		if (query) {
			const words = query.toLowerCase().split(" ")
			const filteredWords = words.filter((word) => {
				return data.some((item) => {
					return (
						item.keywords?.some((keyword) => {
							return keyword.toLowerCase() === word
						}) ||
						item.subcat?.some((subcat) => {
							return subcat.keywords?.some((keyword) => {
								return keyword.toLowerCase() === word
							})
						})
					)
				})
			})

			setFilteredWords(filteredWords)

			const filteredData = data.filter((item) => {
				return filteredWords.every((word) => {
					return (
						item.keywords?.some((keyword) => {
							return keyword.toLowerCase() === word
						}) ||
						item.subcat?.some((subcat) => {
							return subcat.keywords?.some((keyword) => {
								return keyword.toLowerCase() === word
							})
						})
					)
				})
			})
			setFilteredData(filteredData)
		} else {
			setFilteredData(data)
		}
	}, [data, query])

	const getScore = (subcat: IData, queryWords: string[]) => {
		const keywords = subcat.keywords ?? []
		const filteredKeywords = keywords.filter((keyword) =>
			queryWords.includes(keyword)
		)
		const filteredTitle = queryWords.some((word) =>
			subcat.title?.toLowerCase().includes(word.toLowerCase())
		)
		const filteredDescription = queryWords.some((word) =>
			subcat.description?.toLowerCase().includes(word.toLowerCase())
		)
		return filteredKeywords.length + (filteredTitle ? 1 : 0) + (filteredDescription ? 1 : 0)
	}

	const findDeepestObject = (item: IData, queryWords: string[]): IData | null => {
		let deepestObject: IData | null = null
		let highestScore = 0
		if (item.subcat) {
			for (const subcat of item.subcat) {
				const score = getScore(subcat, queryWords)
				if (score > highestScore) {
					deepestObject = subcat
					highestScore = score
				} else if (score === highestScore) {
					const currentScore = deepestObject ? getScore(deepestObject, queryWords) : 0
					if (score > currentScore) {
						deepestObject = subcat
						highestScore = score
					}
				}
				const subcatDeepestObject = findDeepestObject(subcat, queryWords)
				if (subcatDeepestObject) {
					const subcatScore = getScore(subcatDeepestObject, queryWords)
					if (subcatScore > highestScore) {
						deepestObject = subcatDeepestObject
						highestScore = subcatScore
					} else if (subcatScore === highestScore) {
						const currentScore = deepestObject ? getScore(deepestObject, queryWords) : 0
						if (subcatScore > currentScore) {
							deepestObject = subcatDeepestObject
							highestScore = subcatScore
						}
					}
				}
			}
		}

		if (item.keywords && item.keywords.every((keyword: string) => keywords.includes(keyword))) {
			deepestObject = item
		}
		return deepestObject
	}

	let deepestObject: IData = { id: 0, title: '', description: '', cat: '', keywords: [], subcat: [] }

	filteredData.forEach((item) => {
		const itemDeepestObject = findDeepestObject(item, filteredWords)
		if (itemDeepestObject) {
			deepestObject = itemDeepestObject
		}
	})

	return (
		<section className={css.claims}>
		{filteredData.map(({ id, title, description, cat, subcat }: IData) => (
			<Fragment key={id}>
				<Claim {...{ id, title, cat, subcat, query, keywords, description }} linkTo={filteredData.length === 1 ? '' : cat } setQuery={setQuery} filteredWords={filteredWords} setFilteredWords={setFilteredWords} className={filteredData.length === 1 ? `${css.claim} ${css.active}` : css.claim} />
				{filteredData.length === 1 && deepestObject && <DeepClaim id={deepestObject.id} title={deepestObject.title} description={deepestObject.description} keywords={deepestObject.keywords} linkTo={'/form'} onClick={() => handleDeepClaimClick(deepestObject)} />}
			</Fragment>
		))}
		</section>
	)
}

export { Claims }