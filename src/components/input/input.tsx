import { useContext, useState, useEffect, useRef } from 'react'
import { DataContext, IAppState } from '../App'
import css from './input.module.css'

interface InputProps {
	onClick?: () => void;
  }

const Input = ({ onClick }: InputProps) => {
	const { setQuery } = useContext<IAppState>(DataContext)
	const [placeholder, setPlaceholder] = useState('Beskriv skaden med få ord')
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (inputRef.current) {
		inputRef.current.focus();
		}
	}, []);
	
	const handleFocus = () => {setPlaceholder('')}

	return (
		<div className={css.inputField}>
			<input type='text' onChange={(e) => setQuery(e.target.value)} placeholder={placeholder} onFocus={handleFocus} onClick={onClick} ref={inputRef} />
		</div>
	)
}

export { Input }