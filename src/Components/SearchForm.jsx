import React, {useState} from "react"

function SearchForm({setSearchQuery, searchResponse, setSelectedCityURL, setSearchResponse}) {
    const [value, setValue] = useState('')

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

    return <form className="search-form">
        <input className="search-form__input" type="text" value={value} onChange={inputHandler}/>
        <button className="search-form__btn" type="submit" onClick={handleSabmit} tabIndex={-1}>
            <img className="img" src={process.env.PUBLIC_URL + '/images/search.png'} alt="search" />
        </button>
        {searchResponse.length > 0 && value.trim().length > 0 
            ?   <ul className="search-form__response">
                    {searchResponse.map(item => {
                        return  <li
                            className="search-form__response__item"
                            key={item.id}
                            onClick={() => selectItem(item.url)}
                            onKeyDown={event => {
                                if (event.keyCode === 13) {
                                    selectItem(item.url)
                                }
                            }}
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