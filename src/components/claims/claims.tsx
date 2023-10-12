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
	const { data, text, keywords } = useContext<IAppState>(DataContext)
	const [filteredData, setFilteredData] = useState<IData[]>(data)

	useEffect(() => {
		if (text && text.includes(' ')) {
			const words = text.toLowerCase().split(' ')
			const filtered = data.filter((item) => {
				return item.keywords?.some((keyword) => {
					return words.includes(keyword.toLowerCase())
				})
			})
			setFilteredData(filtered)
		} else {
			setFilteredData(data)
		}
	}, [data, text])

	return (
		<section className={css.claims}>
			{filteredData.map(({ id, title, description, cat }: IData) => {
				return <Claim {...{ id, title, description, cat, text, keywords }} key={id} />
			})}
		</section>
	)
}

export { Claims }