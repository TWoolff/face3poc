import { Fragment, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DataContext, IAppState, IData } from '../App'
import { Claim } from './claim'
import { DeepClaim } from './deepclaim'
import css from './claims.module.css'

const Claims = () => {
	const { data, query, keywords, setQuery } = useContext<IAppState>(DataContext)
	const [filteredWords, setFilteredWords] = useState<string[]>([])
	const [filteredData, setFilteredData] = useState<IData[]>(data || [])
	
	const navigate = useNavigate()

	const filterDataByKeywords = () => {
		const queryWords = query.toLowerCase().split(' ')

		const allKeywords = data.flatMap(item => {
			const topLevelKeywords = item.keywords || []
			return item.subcat ? [...topLevelKeywords, ...item.subcat.flatMap(sub => sub.keywords || [])] : topLevelKeywords
		})

		const matchingKeywords = allKeywords.filter(keyword => queryWords.includes(keyword.toLowerCase()))
		
		if (matchingKeywords.length > 0) {
			/*@ts-ignore*/
			const matchingSubcatsSet = new Set<IData['subcat'][0]>()

			data.forEach((item) => {
				item.subcat?.forEach((subcat) => {
					if (subcat.keywords && matchingKeywords.every(keyword => 
						subcat.keywords.some(k => k.toLowerCase() === keyword.toLowerCase()))) {
						matchingSubcatsSet.add(subcat)
					}
				})
			})
		
			return {
				filteredData: [...matchingSubcatsSet],
				filteredWords: matchingKeywords,
			}
		}
			
		return {
			filteredData: data.flatMap((item) => item.subcat || []),
			filteredWords: [],
		}
	}

	useEffect(() => {
		const { filteredData, filteredWords } = filterDataByKeywords()
		setFilteredData(filteredData)
		setFilteredWords(filteredWords)
	}, [data, query])

	const handleClaimClick = (subcat: IData['subcat']) => {
		const query = { subcat: JSON.stringify(subcat) }
		navigate({
		pathname: '/form',
		search: '?' + new URLSearchParams(query).toString(),
		})
	}

	const dataToDisplay = filteredWords.length > 0 ? filteredData : data

	return (
		<section className={css.claims}>
		{dataToDisplay.map(({ id, title, description, cat, subcat, group }: IData) => (
			<Fragment key={id}>
				{filteredData.length === 1 ? (
					<DeepClaim onClick={() => handleClaimClick(filteredData[0] as unknown as IData['subcat'])} id={id} cat={cat} title={title} description={description} keywords={[]} group={''} />
				) : (
					<Claim {...{id, title, cat, subcat, query, keywords, description, group, setQuery, filteredWords, setFilteredWords}} onClick={() => handleClaimClick(subcat)} className={filteredWords.length > 0 ? `${css.claim} ${css.subCat}` : css.claim} />
				)}
			</Fragment>
		))}
		</section>
	)
}

export { Claims }
