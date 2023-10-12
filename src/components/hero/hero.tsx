import HeroIllustration from '../../assets/images/HeroIllustration.svg?react'
import css from './hero.module.css'

const Hero = () => {
	return (
		<section className={css.hero}>
			<HeroIllustration />
			<h3>Anmeld skade</h3>
			<h1>Hvad drejer din anmeldelse sig om?</h1>
		</section>
	)
}

export { Hero }
