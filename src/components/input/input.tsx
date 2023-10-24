import { useContext, useState } from 'react'
import { DataContext, IAppState } from '../App'
import css from './input.module.css'

interface InputProps { onClick?: () => void }

const Input = ({ onClick }: InputProps) => {
	const { setQuery } = useContext<IAppState>(DataContext)
	const [placeholder, setPlaceholder] = useState('Søg på skade')
	const handleFocus = () => {setPlaceholder('')}
	const handleBlur = () => {setPlaceholder('Søg på skade')}

	return (
		<div className={css.inputField}>
			<input type='text' onChange={(e) => setQuery(e.target.value)} placeholder={placeholder} onFocus={handleFocus} onBlur={handleBlur} onClick={onClick} />
		</div>
	)
}

export { Input }