import { useContext, useEffect, useState } from 'react'
import { DataContext, IAppState, IData } from '../App'
import Arrow from '../../assets/images/Arrow.svg?react'
import css from './claims.module.css'

const Claim = ({ title, description }: IData) => {
	return (
		<button className={css.claim}>
			<div className={css.claimInfo}>
				<h2>{title}</h2>
				<p>{description}</p>
			</div>
			<Arrow />
		</button>
	)
}

const Claims = () => {
	const { data, query, keywords } = useContext<IAppState>(DataContext)
	const [filteredData, setFilteredData] = useState<IData[]>(data)

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
			const filteredData = data.filter((item) => {
				return filteredWords.every((word) => {
					return item.keywords?.some((keyword) => {
						return keyword.toLowerCase() === word
					})
				})
			})
			setFilteredData(filteredData)
		} else {
			setFilteredData(data)
		}
	}, [data, query])

	return (
		<section className={css.claims}>
			{filteredData.map(({ id, title, description, cat }: IData) => {
				return <Claim {...{ id, title, description, cat, query, keywords }} key={id} />
			})}
		</section>
	)
}

export { Claims }