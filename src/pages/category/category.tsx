import { useEffect, useState, useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { Hero } from '../../components/hero/hero'
import { Input } from '../../components/input/input'
import { ClaimsCat } from './categoryclaims'
import { IData, IAppState, DataContext } from '../../components/App'

const Category = () => {
    const location = useLocation()
    const { data } = useContext<IAppState>(DataContext)
    const [filteredData, setFilteredData] = useState<IData[]>([])

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search)
        const cat = searchParams.get("cat")
        const filteredData = data.filter((item) => item.cat === cat)
        setFilteredData(filteredData)
    }, [data, location.search])

    return (
        <>
            <Hero title={'Hvad drejer din anmeldelse sig om?'} />
            <Input onClick={() => {window.location.href = '/'}} />
            <ClaimsCat filteredCatData={filteredData} />
        </>
    )
}

export { Category }
