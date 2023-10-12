import { createContext, useEffect, useState } from 'react'
import { Header } from './header/header'
import { Hero } from './hero/hero'
import { Claims } from './claims/claims'
import { Input } from './input/input'

type IData = {
	id: number,
	cat: string,
	title: string,
	description: string
	keywords: string[],
	text?: string
}

type IAppState = {
	data: IData[],
	keywords: string[],
	text: string,
	isLoading: boolean,
	setText: React.Dispatch<React.SetStateAction<string>>,
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const DataContext = createContext<IAppState>({
	data: [],
	keywords: [],
	text: '',
	isLoading: false,
	setText: () => { },
	setIsLoading: () => { },
})

const App = () => {
	const [data, setData] = useState<IData[]>([])
	const [text, setText] = useState<string>('')
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
		text,
		isLoading,
		keywords: [],
		setText,
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