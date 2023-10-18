import { Hero } from '../components/hero/hero'
import { Claims } from '../components/claims/claims'
import { Input } from '../components/input/input'

const Home = () => {
    return ( 
        <>
            <Hero />
            <Input />
            <Claims />
        </>
    )
}

export { Home }