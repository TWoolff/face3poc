import { useLocation } from 'react-router-dom'
import { Hero } from '../components/hero/hero'
import css from './form.module.css'

const Form = () => {
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    const deepestObject = JSON.parse(decodeURIComponent(searchParams.get('deepestObject') || 'null'))
    
    return ( 
        <>
            <Hero title={deepestObject.title} />
            <section className={css.form}>
                {deepestObject.form && <p>Blanketnavn: {deepestObject.form}</p>}
            </section>
        </>
    )
}

export { Form }