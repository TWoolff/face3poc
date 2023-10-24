import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IData } from '../../components/App'
import Arrow from '../../assets/images/Arrow.svg?react'
import Glyph from '../../assets/images/Glyph.svg?react'
import css from './category.module.css'

interface ClaimsCatProps { filteredCatData: IData[] }

const ClaimsCat = ({ filteredCatData }: ClaimsCatProps) => {
    const [subItems, setSubItems] = useState<IData[]>([])
    const navigate = useNavigate()

    const handleSubItemClick = (group: string, cat: string) => {
        const subItems = filteredCatData.flatMap((item) =>
            item.subcat?.filter((subItem) => subItem.group === group && subItem.cat !== cat) || []
        )
        setSubItems(subItems)
    }

    const handleDeepClick = (subItem: IData) => {
        const query = { subcat: JSON.stringify(subItem) }
        navigate({
            pathname: '/form',
            search: '?' + new URLSearchParams(query).toString(),
        })
    }

    const handleBackClick = () => { window.location.href = '/' }

    return (
        <>
            {filteredCatData.map((item) => (
                <section key={item.id} className={css.category}>
                    <button className={`${css.claim} ${subItems.length === 0 ? css.active : ''}`} onClick={() => handleBackClick()}>
                        <div className={css.claimInfo}>
                            <h2>{subItems.length === 0 ? item.title : subItems[0].parent}</h2>
                        </div>
                        <Arrow />
                    </button>
                    {subItems.length === 0 &&
                        item.subcat?.filter((subItem) => subItem.cat === item.cat).map((subItem) => (
                            <button className={`${css.claim} ${css.subcat}`} key={subItem.id} onClick={() => (!subItem.form ? handleSubItemClick(subItem.group, subItem.cat) : handleDeepClick(subItem))}>
                                <div className={css.claimInfo}>
                                    <h2>{subItem.title}</h2>
                                </div>
                                <Glyph />
                            </button>
                        ))}
                    {subItems.length > 0 && (
                        <div className={css.subItems}>
                            {subItems.map((subItem) => (
                                <button className={`${css.claim} ${css.subcat}`} key={subItem.id} onClick={() => (!subItem.form ? handleSubItemClick(subItem.group, subItem.cat) : handleDeepClick(subItem))}>
                                    <div className={css.claimInfo}>
                                        <h2>{subItem.title}</h2>
                                    </div>
                                    <Glyph />
                                </button>
                            ))}
                        </div>
                    )}
                    <div className={css.back}>
                        <a href='/'>Tilbage til forside</a>
                    </div>
                </section>
            ))}
        </>
    )
}

export { ClaimsCat }