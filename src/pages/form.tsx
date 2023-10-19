import { useLocation } from 'react-router-dom'
import { Hero } from '../components/hero/hero'

const Form = () => {
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    const deepestObject = JSON.parse(decodeURIComponent(searchParams.get('deepestObject') || 'null'))
    
    return ( 
        <>
            <Hero title={deepestObject.title} />
        </>
    )
}

export { Form }