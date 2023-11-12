import './header.scss'
import HeaderLogo from '../icons/headerLogo'
import UserInCircleIcon from '../icons/userInCircleIcon'

const Header = () => {
  const firstName = 'Имя'
  const lastName = 'Фамилия'

  return (
    <header>
      <div className='content'>
        <div>
          <HeaderLogo />
          <h1>Wrench CRM</h1>
        </div>
        <div>
          <UserInCircleIcon />
          <span>
            {firstName} {lastName}
          </span>
        </div>
      </div>
    </header>
  )
}

export default Header
