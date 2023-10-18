import HeroIllustration from '../../assets/images/HeroIllustration.svg?react'
import css from './hero.module.css'

const Hero = ({title}: {title: string}) => {
	return (
		<section className={css.hero}>
			<HeroIllustration />
			<h3>Anmeld skade</h3>
			<h1>{title}</h1>
		</section>
	)
}

export { Hero }
