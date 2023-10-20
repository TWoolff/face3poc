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

    const filterSubcatByGroup = (subcat: IData[], group: string): IData[] => {
        return subcat.filter((item) => item.group === group)
    }

    const handleSubItemClick = (group: string) => {
        const subItems = filteredCatData.flatMap((item) =>
            filterSubcatByGroup(item.subcat || [], group)
        )
        setSubItems(subItems)
    }


    console.log('sub', subItems)
    return (
        <>
            {filteredCatData.map((item) => {
                return (
                    <section key={item.id} className={css.category}>
                        <button
                            className={`${css.claim} ${css.active}`}
                            onClick={() => {
                                window.location.href = '/'
                            }}
                        >
                            <div className={css.claimInfo}>
                                <h2>{item.title}</h2>
                            </div>
                            <Arrow />
                        </button>
                        {item.subcat &&
                            filterSubcatByCat(item.subcat, item.cat).map((subItem) => {
                                return (
                                    <button
                                        className={`${css.claim} ${css.subcat}`}
                                        key={subItem.id}
                                        onClick={() => handleSubItemClick(subItem.group)}
                                    >
                                        <div className={css.claimInfo}>
                                            <h2>{subItem.title}</h2>
                                        </div>
                                        <Glyph />
                                    </button>
                                )
                            })}
                        {subItems.length > 0 && (
                            <div className={css.subItems}>
                                <h3>Sub Items:</h3>
                                <ul>
                                    {subItems.map((subItem) => (
                                        <li key={subItem.id}>{subItem.title}</li>
                                    ))}
                                </ul>
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