import { useEffect, useState, useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { Hero } from '../components/hero/hero'
import { Input } from '../components/input/input'
import { IData, IAppState, DataContext } from '../components/App'
import Arrow from '../assets/images/Arrow.svg?react'
import css from './category.module.css'

const ClaimsCat = ({ filteredCatData }: { filteredCatData: IData[] }) => {
    const filterSubcatByCat = (subcat: IData[], cat: string): IData[] => {
        return subcat.filter((item) => item.cat === cat)
    }

    return (
        <>
            {filteredCatData.map((item) => {
                return (
                    <div key={item.id} className={css.category}>
                        <button className={`${css.claim} ${css.active}`} onClick={() => {window.location.href = '/'}}>
                        <div className={css.claimInfo}>
                            <h2>{item.title}</h2>
                        </div>
                        <Arrow />
                        </button>
                        {item.subcat && filterSubcatByCat(item.subcat, item.cat).map((subItem) => {
                            return (
                                <div key={subItem.id}>
                                    <h3>{subItem.title}</h3>
                                    {subItem.subcat &&
                                    filterSubcatByCat(subItem.subcat, item.cat).map(
                                        (subSubItem) => {
                                        return (
                                            <div key={subSubItem.id}>
                                            <h4>{subSubItem.title}</h4>
                                            </div>
                                        )
                                        }
                                    )}
                                </div>
                            )
                        })}
                    </div>
                )
            })}
        </>
    )}

    const Category = () => {
    const location = useLocation();
    const { data } = useContext<IAppState>(DataContext);
    const [filteredData, setFilteredData] = useState<IData[]>([]);

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const cat = searchParams.get("cat");
        const filteredData = data.filter((item) => item.cat === cat);
        setFilteredData(filteredData);
    }, [data, location.search]);

    return (
        <>
            <Hero title={"Hvad drejer din anmeldelse sig om?"} />
            <Input onClick={() => {window.location.href = '/'}} />
            <ClaimsCat filteredCatData={filteredData} />
        </>
    )
}

export { Category };
