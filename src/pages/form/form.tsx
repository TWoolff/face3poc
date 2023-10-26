import { useLocation } from 'react-router-dom'
import { Hero } from '../../components/hero/hero'
import css from './form.module.css'

const Form = () => {
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)

    let itemData

    if (searchParams.has('item')) {
        itemData = JSON.parse(decodeURIComponent(searchParams.get('item') || ''))
    } else if (searchParams.has('subcat')) {
        itemData = JSON.parse(decodeURIComponent(searchParams.get('subcat') || ''))
    }

    if (!itemData) {
        return <div>Ingen formular fundet!</div>
    }

    return (
        <>
            <Hero title={itemData.title} />
            <section className={css.form}>
                {itemData.form && <p>Blanketnavn: {itemData.form}</p>}
            </section>
        </>
    )
}

export { Form }