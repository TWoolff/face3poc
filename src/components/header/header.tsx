import css from './header.module.css'
import Logo from '../../assets/images/Logo.svg?react'
import Burger from '../../assets/images/Burger.svg?react'

const Header = () => {
	return ( 
		<header>
			<a href="/"><Logo /></a>
			<nav className={css.rightFlex}>
				<div>
					<p>Hvad kan vi hjælpe med?</p>
					<Burger />
				</div>
			</nav>
		</header>
	)
}

export { Header }