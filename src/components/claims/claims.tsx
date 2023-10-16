import { Fragment, useContext, useEffect, useState } from 'react'
import { DataContext, IAppState, IData } from '../App'
import Arrow from '../../assets/images/Arrow.svg?react'
import Glyph from '../../assets/images/Glyph.svg?react'
import css from './claims.module.css'

const Claim = ({ title, description, className }: IData) => {
	return (
		<button className={className}>
			<div className={css.claimInfo}>
				<h2>{title}</h2>
				{description && <p>{description}</p>}
			</div>
			<Arrow />
		</button>
	)
}

const SubClaims = ({ subcat, className }: IData) => {
	return (
		<>
			{Array.isArray(subcat) && subcat.map(({ description, id }) => (
				<button className={className} key={id}>
					<div className={css.claimInfo}>
						<h2>{description}</h2>
					</div>
					<Glyph />
				</button>
			))}
		</>
	)
}

const Claims = () => {
	const { data, query, keywords } = useContext<IAppState>(DataContext)
	const [filteredWords, setFilteredWords] = useState<string[]>([])
	const [filteredData, setFilteredData] = useState<IData[]>(data)
	const [activeData, setActiveData] = useState<IData | null>(null)


	useEffect(() => {
		if (query) {
			const words = query.toLowerCase().split(' ')
			const filteredWords = words.filter((word) => {
				return data.some((item) => {
					return item.keywords?.some((keyword) => {
						return keyword.toLowerCase() === word
					})
				})
			})

			setFilteredWords(filteredWords)

			const filteredData = data.filter((item) => {
				return filteredWords.every((word) => {
					return item.keywords?.some((keyword) => {
						return keyword.toLowerCase() === word
					})
				})
			})
			setFilteredData(filteredData)
		} else { setFilteredData(data) }
	}, [data, query])

	useEffect(() => {
		if (filteredData.length === 1) {
			const activeItem = filteredData[0]
			const activeSubcat = activeItem.subcat?.[0].subcat?.flatMap((item: IData) => item.subcat || item).filter((item: IData) => {
				const keywords = item.keywords?.map((keyword) => keyword.toLowerCase())
				return filteredWords.every((word) => keywords?.some((kw) => kw.includes(word)))
			})
			setActiveData({
				...activeItem,
				subcat: activeSubcat
			})
		} else {
			setActiveData(null)
		}
	}, [filteredData, query])

	console.log('activeData', activeData)
	console.log('filteredData', filteredData)

	return (
		<section className={css.claims}>
		{filteredData.map(({ id, title, description, cat, subcat }: IData) => (
			<Fragment key={id}>
				{!activeData && <Claim {...{ id, title, cat, subcat, query, keywords, description }} className={css.claim} />}
				{activeData?.id === id && (
					<>
						<Claim className={`${css.claim} ${css.active}`} id={activeData.id} cat={activeData.cat} title={subcat[0].title} description={subcat[0].description} keywords={activeData.keywords} />
						<SubClaims className={`${css.claim}`} subcat={activeData.subcat} id={0} cat={activeData.cat} title={activeData.title} description={activeData.description} keywords={activeData.keywords} />
					</>
				)}
			</Fragment>
		))}
		</section>
	)
}

export { Claims }