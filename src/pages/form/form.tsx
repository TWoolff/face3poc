import { useLocation } from 'react-router-dom'
import { Hero } from '../../components/hero/hero'
import css from './form.module.css'

const Form = () => {
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    const subcat = JSON.parse(decodeURIComponent(searchParams.get('subcat') || 'null'))
    
    return ( 
        <>
            <Hero title={subcat.title} />
            <section className={css.form}>
                {subcat.form && <p>Blanketnavn: {subcat.form}</p>}
            </section>
        </>
    )
}

export { Form }