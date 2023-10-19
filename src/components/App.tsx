import { createContext, useEffect, useState } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { Header } from './header/header'
import { Home } from '../pages/home'
import { Form } from '../pages/form'

interface IData {
	id: number
	title: string
	description: string
	keywords: string[]
	subcat?: (IData & { subcat?: IData[] })[]
	linkTo?: string
	[key: string]: any
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
			<BrowserRouter basename='/'> 
				<Header />
				<main>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/form" element={<Form />} />
					</Routes>
				</main>
			</BrowserRouter>
		</DataContext.Provider>
	)
}

export { App, DataContext }
export type { IData, IAppState }