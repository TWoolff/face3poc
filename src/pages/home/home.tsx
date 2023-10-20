import { Hero } from '../../components/hero/hero'
import { Claims } from '../../components/claims/claims'
import { Input } from '../../components/input/input'

const Home = () => {
    return ( 
        <>
            <Hero title={'Hvad drejer din anmeldelse sig om?'} />
            <Input />
            <Claims />
        </>
    )
}

export { Home }