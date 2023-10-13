import { createContext, useEffect, useState } from 'react'
import { Header } from './header/header'
import { Hero } from './hero/hero'
import { Claims } from './claims/claims'
import { Input } from './input/input'

type IData = {
	id: number,
	cat: string,
	subcat: {
		id: number,
        title: string,
        description: string,
        keywords: string[]
	},
	title: string,
	keywords: string[],
	description?: string
	query?: string,
	className?: string
}

type IAppState = {
	data: IData[],
	keywords: string[],
	query: string,
	isLoading: boolean,
	setQuery: React.Dispatch<React.SetStateAction<string>>,
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const DataContext = createContext<IAppState>({
	data: [],
	keywords: [],
	query: '',
	isLoading: false,
	setQuery: () => {},
	setIsLoading: () => {},
})

const App = () => {
	const [data, setData] = useState<IData[]>([])
	const [query, setQuery] = useState<string>('')
	const [isLoading, setIsLoading] = useState<boolean>(false)

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true)
			const response = await fetch('/data.json')
			const jsonData = await response.json()
			setData(jsonData)
			setIsLoading(false)
		}
		fetchData()
	}, [])

	const appState: IAppState = {
		data,
		query,
		isLoading,
		keywords: [],
		setQuery,
		setIsLoading,
	}

	return (
		<DataContext.Provider value={ appState }>
			<Header />
			<main>
				<Hero />
				<Input />
				<Claims />
			</main>
		</DataContext.Provider>
	)
}

export { App, DataContext }
export type { IData, IAppState }