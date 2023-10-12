import { useContext, useState } from 'react'
import { DataContext, IAppState } from '../App'
import css from './input.module.css'

const Input = () => {
	const { setQuery } = useContext<IAppState>(DataContext)
	const [placeholder, setPlaceholder] = useState('Beskriv skaden med få ord')
	const handleFocus = () => {setPlaceholder('')}

	return (
		<input type='text' className={css.inputField} onChange={(e) => setQuery(e.target.value)} placeholder={placeholder} onFocus={handleFocus} />
	)
}

export { Input }