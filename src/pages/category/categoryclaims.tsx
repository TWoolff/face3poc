import { useState } from 'react'
import { IData } from '../../components/App'
import Arrow from '../../assets/images/Arrow.svg?react'
import Glyph from '../../assets/images/Glyph.svg?react'
import css from './category.module.css'

interface ClaimsCatProps {
    filteredCatData: IData[];
}

const ClaimsCat = ({ filteredCatData }: ClaimsCatProps) => {
    const [subItems, setSubItems] = useState<IData[]>([])
    
    const filterSubcatByCat = (subcat: IData[], cat: string): IData[] => { return subcat.filter((item) => item.cat === cat) }
    
    const filterSubcatByGroup = (subcat: IData[], group: string, cat: string): IData[] => {
        return subcat.filter((item) => item.group === group && item.cat !== cat)
    }

    const handleSubItemClick = (group: string, cat: string) => {
        const subItems = filteredCatData.flatMap((item) =>
            filterSubcatByGroup(item.subcat || [], group, cat)
        )
        setSubItems(subItems)
    }

    console.log(subItems)
    return (
        <>
            {filteredCatData.map((item) => {
                return (
                    <section key={item.id} className={css.category}>
                        <button className={`${css.claim} ${css.active}`} onClick={() => { window.location.href = '/' }}>
                            <div className={css.claimInfo}>
                                <h2>{subItems.length === 0 ? item.title : subItems[0].parent}</h2>
                            </div>
                            <Arrow />
                        </button>
                        {subItems.length === 0 && item.subcat &&
                            filterSubcatByCat(item.subcat, item.cat).map((subItem) => {
                                return (
                                    <button className={`${css.claim} ${css.subcat}`} key={subItem.id} onClick={() => handleSubItemClick(subItem.group, subItem.cat)}>
                                        <div className={css.claimInfo}>
                                            <h2>{subItem.title}</h2>
                                        </div>
                                        <Glyph />
                                    </button>
                                )
                            })}
                        {subItems.length > 0 && (
                            <div className={css.subItems}>
                                {subItems.map((subItem) => (
                                    <button className={`${css.claim} ${css.subcat}`} key={subItem.id} onClick={() => handleSubItemClick(subItem.group, subItem.cat)}>
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
                )
            })}
        </>
    )
}

export { ClaimsCat }