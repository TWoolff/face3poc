import { IData } from '../../components/App'
import Glyph from '../../assets/images/Glyph.svg?react'
import css from './claims.module.css'

const DeepClaim = ({ title, onClick, cat }: IData) => {
    return (
        <div className={css.subCat}> 
            <button className={css.claim} onClick={onClick}>
                <div className={css.claimInfo}>
                    <h2>{title}</h2>
                    {cat && <p>{cat}</p>}
                </div>
                <Glyph />
            </button>
        </div>
    )
}

export { DeepClaim }