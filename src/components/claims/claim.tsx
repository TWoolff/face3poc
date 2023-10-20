import { useNavigate } from 'react-router-dom'
import { IData } from '../../components/App'
import Arrow from '../../assets/images/Arrow.svg?react'
import css from './claims.module.css'

const Claim = ({ id, title, description, className, cat, filteredWords }: IData) => {
	const navigate = useNavigate()

	const handleClick = () => {
		const query = {
			id: id.toString(),
			cat,
			title,
			description,
			filteredWords: filteredWords.join(',')
		};
		navigate({
			pathname: '/category',
			search: '?' + new URLSearchParams(query).toString(),
		})
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

export { Claim }