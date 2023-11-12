import './AdressSearchPage.scss'
import SearchIcon from '../../components/icons/searchIcon'
import { useState } from 'react'

interface Data {
  id?: number
  city_type_full: string
  city: string
  street_with_type: string
  house_type_full: string
  house: string
}

const AdressSearchPage = () => {
  const [inputValue, setInputValue] = useState<string>('')
  const [isValidValue, setIsValidValue] = useState<boolean>(true)
  const [adresses, setAddresses] = useState<object[]>([])
  const [notFound, setNotFound] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const url = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address'
  const token = process.env.REACT_APP_API_KEY

  const getAdresses = (queryStr: string) => {
    setLoading(true)
    setAddresses([])

    fetch(url, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Token ' + token,
      },
      body: JSON.stringify({ query: queryStr }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result?.suggestions.length > 0) {
          const adressesFormData: object[] = []
          result?.suggestions?.forEach(({ data }, idx: number): void => {
            const { city_type_full, city, street_with_type, house_type_full, house }: Data = data
            if (street_with_type) {
              adressesFormData.push({
                id: idx,
                city_type_full: city_type_full || '',
                city: city || '',
                street_with_type: `улица ${street_with_type}` || '',
                house_type_full: house_type_full || '',
                house: house || '',
              })
            }
          })
          if (adressesFormData.length > 0) {
            setAddresses(adressesFormData)
          } else {
            setNotFound(true)
          }
        } else {
          setNotFound(true)
        }
        setLoading(false)
      })
      .catch((error) => console.log('error', error))
  }

  const handleSearch = (): void => {
    setNotFound(false)
    if (inputValue.trim().length > 2) {
      setIsValidValue(true)
      getAdresses(inputValue.trim())
    } else {
      setIsValidValue(false)
    }
  }

  return (
    <section className='searching'>
      <h2>Поиск адресов</h2>
      <p>Введите интересующий вас адрес</p>
      <div className='searching-panel'>
        <input
          type='text'
          placeholder='Введите интересующий вас адрес'
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
        />
        <button onClick={handleSearch}>
          <SearchIcon />
          <span>Поиск</span>
        </button>
      </div>
      {!isValidValue && <p className='warning'>Введите как минимум 3 символа.</p>}
      {adresses.length > 0 && (
        <div className='addresses-list'>
          <h3>Адреса</h3>
          <ul>
            {adresses?.map(
              ({ id, city_type_full, city, street_with_type, house_type_full, house }: Data) => {
                const str = `${city_type_full} ${city}, ${street_with_type}, ${house_type_full} ${house}`
                return (
                  <li key={id}>
                    <hr />
                    <a href={`mailto:some@yandex.ru?subject="Адрес"&body=${str}`}>{str}</a>
                  </li>
                )
              },
            )}
          </ul>
        </div>
      )}
      {loading && <p>Загрузка...</p>}
      {notFound && <p>Ничего не найдено, попробуйте ввести другой адрес.</p>}
    </section>
  )
}

export default AdressSearchPage
