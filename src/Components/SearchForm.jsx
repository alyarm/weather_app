import React, {useState} from "react"
import { useEffect } from "react/cjs/react.development"

function SearchForm({setSearchQuery, searchResponse, setSelectedCityURL, setSearchResponse, stringToURL}) {
    const [value, setValue] = useState('')
    const [currentItem, setCurrentItem] = useState(0)

    useEffect(()=> {
        setCurrentItem(0)
    }, [searchResponse])

    const inputHandler = (event) => {
        setValue(event.currentTarget.value)
        setSearchQuery(event.currentTarget.value)
    }

    const handleSabmit = (event) => {
        event.preventDefault()
        if (searchResponse.length > 0 && searchResponse[0].url) {
            selectItem(searchResponse[0].url)
        }
    }

    const selectItem = (url) => {
        setSelectedCityURL(url);
        setValue(' ');
        setSearchQuery(' ')
        setSearchResponse([])
    }

    const keyboardControl = (event) => {
        switch (event.keyCode) {
            case 13: searchResponse.length > 0 ? selectItem(searchResponse[currentItem].url) : selectItem(stringToURL(value))
                break
            case 38: currentItem > 0 && searchResponse.length > 1 ? setCurrentItem(currentItem - 1) : setCurrentItem(searchResponse.length -1)
                break
            case 40: currentItem < searchResponse.length - 1 && searchResponse.length > 1 ? setCurrentItem(currentItem + 1) : setCurrentItem(0)
                break
            default:
                return 0
        }
    }

    return <form className="search-form" onKeyDown={keyboardControl} autoComplete="off">
        <input className="search-form__input" type="text" value={value} onChange={inputHandler}/>
        <button className="search-form__btn" type="submit" onClick={handleSabmit} tabIndex={-1}>
            <img className="img" src={process.env.PUBLIC_URL + '/images/search.png'} alt="search" />
        </button>
        {searchResponse.length > 0 && value.trim().length > 0 
            ?   <ul className="search-form__response autocomplete">
                    {searchResponse.map((item, index )=> {
                        return  <li
                            className={`search-form__response__item autocomplete__item ${currentItem === index ? 'active' : ''}`}
                            key={item.id}
                            onClick={() => selectItem(item.url)}
                            tabIndex={0}
                        >
                            {item.name}
                        </li>
                    })}
                </ul>
            : false
        }
    </form>
}

export default SearchForm