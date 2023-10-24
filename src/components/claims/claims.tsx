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

	useEffect(() => {
		const queryWords = query.toLowerCase().split(' ')
	
		const allKeywords = data.flatMap(item => {
			const topLevelKeywords = item.keywords || []
			
			if (!item.subcat) {
				return topLevelKeywords
			}
			
			const subcatKeywords = item.subcat.flatMap(sub => sub.keywords || [])
			return [...topLevelKeywords, ...subcatKeywords]
		})		
	
		const matchingKeywords = allKeywords.filter(keyword => {
			return queryWords.includes(keyword.toLowerCase())
		})
	
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
	
			setFilteredData([...matchingSubcatsSet])
			setFilteredWords(matchingKeywords)
		} else {
			const allSubcats = data.flatMap((item) => item.subcat || [])
			setFilteredData(allSubcats)
			setFilteredWords([])
		}
	}, [data, query])
	

	const handleClaimClick = (subcat: IData['subcat']) => {
		const query = { subcat: JSON.stringify(subcat) }
		navigate({
			pathname: '/form',
			search: '?' + new URLSearchParams(query).toString(),
		})
	}

	const dataToDisplay = filteredWords.length > 0 ? filteredData : data

	console.log(filteredWords)

	return (
		<section className={filteredData.length === 1 ? `${css.claims} ${css.active}` : css.claims}>
		{dataToDisplay.map(({ id, title, description, cat, subcat, group }: IData) => (
			<Fragment key={id}>
				{filteredData.length === 1 ? (
					<DeepClaim onClick={() => handleClaimClick(filteredData[0] as unknown as IData['subcat'])} id={id} cat={cat} title={title} description={description} keywords={[]} group={''} />
				) : (
					<Claim {...{id, title, cat, subcat, query, keywords, description, group}}
						setQuery={setQuery}
						filteredWords={filteredWords}
						setFilteredWords={setFilteredWords}
						onClick={() => handleClaimClick(subcat)}
						className={filteredWords.length > 0 ? `${css.claim} ${css.subCat}` : css.claim}
					/>
				)}
			</Fragment>
			)
		)}
		</section>
	)
}

export { Claims }
