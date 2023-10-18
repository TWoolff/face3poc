import { Fragment, useContext, useEffect, useState } from 'react'
import { DataContext, IAppState, IData } from '../App'
import Arrow from '../../assets/images/Arrow.svg?react'
import Glyph from '../../assets/images/Glyph.svg?react'
import css from './claims.module.css'

const Claim = ({ title, description, className, linkTo, setQuery }: IData) => {
	const handleClick = () => {
		setQuery(linkTo)
	};

	return (
		<button className={className} onClick={handleClick}>
			<div className={css.claimInfo}>
				<h2>{title}</h2>
				{description && <p>{description}</p>}
			</div>
			<Arrow />
		</button>
	)
}

const SubClaims = ({ subcat, setQuery }: IData) => {
	const handleClick = (title: string) => {
		setQuery(title)
	};

    return (
        <div className={css.subCat}>
            {subcat?.map(({ id, title, description }: IData) => {
                return (
                    <button className={css.claim} key={id} onClick={() => handleClick(title)}>
                        <div className={css.claimInfo}>
                            <h2>{title}</h2>
                            {description && <p>{description}</p>}
                        </div>
                        <Glyph />
                    </button>
                );
            })}
        </div>
    );
}

const DeepClaim = ({ title, description, linkTo }: IData) => {
	const handleClick = () => {
		const url = linkTo || '/'
		window.location.href = url
	};
	return (
		<div className={css.subCat}> 
			<button className={css.claim} onClick={handleClick}>
				<div className={css.claimInfo}>
					<h2>{title}</h2>
					{description && <p>{description}</p>}
				</div>
				<Glyph />
			</button>
		</div>
	)
}

const Claims = () => {
	const { data, query, setQuery,keywords } = useContext<IAppState>(DataContext)
	const [filteredWords, setFilteredWords] = useState<string[]>([])
	const [filteredData, setFilteredData] = useState<IData[]>(data)

	useEffect(() => {
		if (query) {
			const words = query.toLowerCase().split(" ");
			const filteredWords = words.filter((word) => {
				return data.some((item) => {
					return (
						item.keywords?.some((keyword) => {
							return keyword.toLowerCase() === word;
						}) ||
						item.subcat?.some((subcat) => {
							return subcat.keywords?.some((keyword) => {
								return keyword.toLowerCase() === word;
							});
						})
					);
				});
			});

			setFilteredWords(filteredWords);

			const filteredData = data.filter((item) => {
				return filteredWords.every((word) => {
					return (
						item.keywords?.some((keyword) => {
							return keyword.toLowerCase() === word;
						}) ||
						item.subcat?.some((subcat) => {
							return subcat.keywords?.some((keyword) => {
								return keyword.toLowerCase() === word;
							});
						})
					);
				});
			});
			setFilteredData(filteredData);
		} else {
			setFilteredData(data);
		}
	}, [data, query]);


const findDeepestObject = (
	item: IData,
	queryWords: string[]
): IData | null => {
	let deepestObject: IData | null = null;
	if (item.subcat) {
		for (const subcat of item.subcat) {
			const keywords = subcat.keywords ?? item.keywords;
			const filteredKeywords = keywords.filter((keyword) =>
				queryWords.includes(keyword)
			);
			if (filteredKeywords.length) {
				const subcatDeepestObject = findDeepestObject(subcat, queryWords);
				if (subcatDeepestObject) {
					deepestObject = subcatDeepestObject;
				} else {
					deepestObject = subcat;
				}
			} else {
				const subcatDeepestObject = findDeepestObject(subcat, queryWords);
				if (subcatDeepestObject) {
					deepestObject = subcatDeepestObject;
				}
			}
		}
	} else {
		const filteredKeywords = item.keywords.filter((keyword) =>
			queryWords.includes(keyword)
		);
		if (filteredKeywords.length === queryWords.length) {
			deepestObject = item;
		}
	}
	return deepestObject;
};

let deepestObject: { id: number; title: string; description: string } | null = null;

filteredData.filter((item) => {
	const deepestObject = findDeepestObject(item, filteredWords);
	return deepestObject !== null;
});


if (filteredData.length > 0) {
	const subcat = findDeepestObject(filteredData[0], filteredWords);
	if (subcat) {
		deepestObject = subcat;
	}
}

	return (
		<section className={css.claims}>
		{filteredData.map(({ id, title, description, cat, subcat }: IData) => (
			<Fragment key={id}>
				<Claim {...{ id, title, cat, subcat, query, keywords, description }} linkTo={filteredData.length === 1 ? '' : cat } setQuery={setQuery} className={filteredData.length === 1 ? `${css.claim} ${css.active}` : css.claim} />
				{filteredData.length === 1 && subcat && !deepestObject && <SubClaims subcat={subcat} id={0} title={''} description={''} cat={cat} keywords={[]} linkTo={''} setQuery={setQuery} /> }
				{filteredData.length === 1 && deepestObject && <DeepClaim id={deepestObject.id} title={deepestObject.title} description={deepestObject.description} keywords={[]} linkTo={'/form'} /> }
			</Fragment>
		))}
		</section>
	)
}

export { Claims }

//TODO: CLICK HANDLER DEEPCLAIM
//TODO: DYNAMIC DESCRIPTIONS
//TODO: DESKTOP STYLING