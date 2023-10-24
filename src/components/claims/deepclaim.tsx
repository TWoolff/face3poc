import { IData } from '../../components/App'
import Arrow from '../../assets/images/Arrow.svg?react'
import css from './claims.module.css'

const DeepClaim = ({ title, onClick, cat }: IData) => {
    return (
        <button className={`${css.claim} ${css.subCat}`} onClick={onClick}>
            <div className={css.claimInfo}>
                <h2>{title}</h2>
                {cat && <p>{cat}</p>}
            </div>
            <Arrow />
        </button>
    )
}

export { DeepClaim }