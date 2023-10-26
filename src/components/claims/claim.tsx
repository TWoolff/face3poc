import { IData } from '../../components/App'
import Arrow from '../../assets/images/Arrow.svg?react'
import css from './claims.module.css'

const Claim = ({ title, description, className, cat, filteredWords, onClick}: IData) => {
	return (
		<button className={className} onClick={onClick}>
			<div className={css.claimInfo}>
				<h2>{title}</h2>
				{filteredWords.length === 0 ? <p>{description}</p> : <p>{cat}</p>}
			</div>
			<Arrow />
		</button>
	)
}

export { Claim }