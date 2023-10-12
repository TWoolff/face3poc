import css from './header.module.css'
import Logo from '../../assets/images/Logo.svg?react'
import Cart from '../../assets/images/Cart.svg?react'
import Mail from '../../assets/images/Mail.svg?react'

const Header = () => {
	return ( 
		<header>
		<a href="/"><Logo /></a>
		<div className={css.rightFlex}>
			<Cart />
			<Mail />
		</div>
		</header>
	)
}

export { Header }