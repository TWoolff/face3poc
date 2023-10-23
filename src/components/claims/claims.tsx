import { Fragment, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { DataContext, IAppState, IData } from "../App"
import { Claim } from "./claim"
import { DeepClaim } from "./deepclaim"
import css from "./claims.module.css"

const Claims = () => {
	const { data, query, keywords, setQuery } =
		useContext<IAppState>(DataContext)
	const [filteredWords, setFilteredWords] = useState<string[]>([])
	const [filteredData, setFilteredData] = useState<IData[]>(data)
	const navigate = useNavigate()

	useEffect(() => {
		const words = query.toLowerCase().split(" ").filter(Boolean)
		const filteredWords = words.filter((word) => {
		return data.some((item) => {
			return (
			item.keywords?.some((keyword) => {
				return keyword.toLowerCase() === word
			}) ||
			item.subcat?.some((subcat) => {
				return subcat.keywords?.some((keyword) => {
				return keyword.toLowerCase() === word
				})
			})
			)
		})
	})

		if (query && filteredWords.length >= 1) {
			const matchingSubcats: IData["subcat"][] = []

			data.forEach((item) => {
				const filteredSubcats = item.subcat?.filter((subcat) =>
				words.every((word) => subcat.keywords?.some((keyword) => keyword.toLowerCase().includes(word))
			))
				if (filteredSubcats?.length) {matchingSubcats.push(...filteredSubcats)}
			})

			setFilteredData(matchingSubcats)
			setFilteredWords(words)
		} else {
			const allSubcats = data.flatMap((item) => item.subcat)
			setFilteredData(allSubcats)
			setFilteredWords([])
		}
	}, [data, query, keywords])

	const handleClaimClick = (subcat: IData["subcat"]) => {
		const query = { subcat: JSON.stringify(subcat) }
		navigate({
			pathname: "/form",
			search: "?" + new URLSearchParams(query).toString(),
		})
	}

	const dataToDisplay = filteredWords.length > 0 ? filteredData : data

	return (
		<section className={filteredData.length === 1 ? `${css.claims} ${css.active}` : css.claims}>
		{dataToDisplay.map(({ id, title, description, cat, subcat, group }: IData) => (
			<Fragment key={id}>
				{filteredData.length === 1 ? (
					<DeepClaim  onClick={() => handleClaimClick(filteredData[0])} id={id} group={group} title={title} description={description} keywords={[]} />
				) : (
					<Claim {...{id, title, cat, subcat, query, keywords, description, group}}
						setQuery={setQuery}
						filteredWords={filteredWords}
						setFilteredWords={setFilteredWords}
						onClick={() => handleClaimClick(subcat)}
						className={css.claim}
					/>
				)}
			</Fragment>
			)
		)}
		</section>
	)
}

export { Claims }
