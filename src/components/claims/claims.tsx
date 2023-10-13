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

const SubClaims = ({ subcat }: IData) => {
	return (
		<div className={css.subCat}>
			{Array.isArray(subcat) && subcat.map(({description, id}) => (
				<button className={css.claim} key={id}>
					<div className={css.claimInfo}>
						<h2>{description}</h2>
					</div>
					<Glyph />
				</button>
			))}
		</div>
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
			{filteredData.map(({ id, title, description, cat, subcat }: IData) => {
				if (filteredData.length === 1) {
					return (
						<Fragment key={id} >
							<Claim {...{ id, title, cat, subcat, query, keywords }} className={`${css.claim} ${css.active}`} />
							{Array.isArray(subcat) && <SubClaims id={id} cat={cat} title={title} description={description} keywords={[]} {...{ subcat }} />}
						</Fragment>
					)
				} else {
					return <Claim {...{ id, title, description, cat, subcat, query, keywords }} className={css.claim} key={id} />
				}
			})}
		</section>
	)
}

export { Claims }