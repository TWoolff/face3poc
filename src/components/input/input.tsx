import { useContext, useState } from 'react'
import { DataContext, IAppState } from '../App'
import css from './input.module.css'

const Input = () => {
	const { setText } = useContext<IAppState>(DataContext)
	const [placeholder, setPlaceholder] = useState('Beskriv din skade for filtrering')
	const handleFocus = () => {setPlaceholder('')}

	return (
		<input type='text' className={css.inputField} onChange={(e) => setText(e.target.value)} placeholder={placeholder} onFocus={handleFocus} />
	)
}

export { Input }