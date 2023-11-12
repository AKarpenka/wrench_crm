import './AdressSearchPage.scss';
import SearchIcon from '../../components/icons/searchIcon';
import { useState } from 'react';

const AdressSearchPage = () => {
    const [inputValue, setInputValue] = useState('');
    const [isValidValue, setIsValidValue] = useState(true);
    const [adresses, setAddresses] = useState([]);
    const [notFound, setNotFound] = useState(false);
    const [loading, setLoading] = useState(false);
    
    const url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address";
    const token = process.env.REACT_APP_API_KEY;

    const getAdresses = (queryStr) => {
        setLoading(true);
        setNotFound(false);
        setAddresses([]);
        const options: unknown = {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Token " + token
            },
            body: JSON.stringify({query: queryStr})
        }

        fetch(url, options)
            .then(response => response.json())
            .then(result => {
                if (result?.suggestions.length > 0) {
                    const adressesFormData = [];
                    result?.suggestions?.forEach(({data}, idx) => {
                        const {city_type_full, city, street_with_type, house_type_full, house } = data;
                        if(street_with_type) {
                            adressesFormData.push({
                                id: idx,
                                city_type_full: city_type_full || '',
                                city: city || '',
                                street_with_type: `улица ${street_with_type}` || '',
                                house_type_full: house_type_full || '',
                                house: house || ''
                            });
                        }
                    });
                    if (adressesFormData.length > 0) {
                        setAddresses(adressesFormData);
                    } else {
                        setNotFound(true);
                    }
                } else {
                    setNotFound(true);
                }
                setLoading(false);
            })
            .catch(error => console.log("error", error));
    };

    const handleSearch = () => {
        if(inputValue.trim().length > 2) {
            setIsValidValue(true);
            getAdresses(inputValue.trim());
        } else {
            setIsValidValue(false);
        }
    };

    return (
        <section>
            <h2>Поиск адресов</h2>
            <p>Введите интересующий вас адрес</p>
            <div className="searching-panel">
                <input 
                    type="text" 
                    placeholder="Введите интересующий вас адрес"
                    onChange={(e) => setInputValue(e.target.value)}
                    value={inputValue}
                />
                <button onClick={handleSearch}>
                    <SearchIcon/>
                    <span>Поиск</span>
                </button>
            </div>
            {!isValidValue && <p className="warning">Введите как минимум 3 символа.</p>}
            {adresses.length > 0 && 
                (<div className="addresses-list">
                    <h3>Адреса</h3>
                    <ul>
                        {adresses?.map(({id, city_type_full, city, street_with_type, house_type_full, house}) => {
                            const str = `${city_type_full} ${city}, ${street_with_type}, ${house_type_full} ${house}`
                            return (
                                <li key={id}>
                                    <hr />
                                    <a href={`mailto:some@yandex.ru?subject="Адрес"&body=${str}`}>
                                        {str}
                                    </a>
                                </li>
                            )
                        })}
                    </ul>
                </div>)
            }
            {loading && <p>Загрузка...</p>}
            {notFound && <p>Ничего не найдено, попробуйте ввести другой адрес.</p>}
        </section>
    )
}

export default AdressSearchPage;