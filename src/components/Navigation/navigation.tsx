import './navigation.scss';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

//icons
import HomeIcon from '../icons/homeIcon';
import SearchIcon from '../icons/searchIcon';
import TablesIcon from '../icons/tablesIcon';
import CalendarIcon from '../icons/calendarIcon';
import MapIcon from '../icons/mapIcon';
import WidgetsIcon from '../icons/widgetsIcon';
import SettingsIcon from '../icons/settingsIcon';
import UserIcon from '../icons/userIcon';
import FinanceIcon from '../icons/financeIcon';
import ExitIcon from '../icons/exitIcon';

const Navigation = () => {
    const [showSettings, setShowSettings] = useState(true);
    const {pathname} = useLocation();

    const renderSettings = () => (
        <ul className="inner-nav-list">
            <li>
                <Link to='/profile-settings'>
                    <span><UserIcon/></span>
                    <p>Настройки профиля</p>
                </Link>
                {pathname ==='/profile-settings' && <div></div>}
            </li>
            <li>
                <Link to='/finences'>
                    <span><FinanceIcon/></span>
                    <p>Управление финансами</p>
                </Link>
                {pathname ==='/finences' && <div></div>}
            </li>
        </ul>
    );

    const toggleShowSettings = () => setShowSettings(showSettings => !showSettings);

    return (
        <nav>
            <h2>Меню</h2>
            <ul>
                <li>
                    <Link to='/'>
                        <span><HomeIcon/></span>
                        <p>Главная</p>
                    </Link>
                    {pathname ==='/' && <div></div>}
                </li>
                <li>
                    <Link to='/address'>
                        <span><SearchIcon/></span>
                        <p>Поиск адресов</p>
                    </Link>
                    {pathname ==='/address' && <div></div>}
                </li>
                <li>
                    <Link to='/tables'>
                        <span><TablesIcon/></span>
                        <p>Таблицы</p>
                    </Link>
                    {pathname ==='/tables' && <div></div>}
                </li>
                <li>
                    <Link to='/calendar'>
                        <span><CalendarIcon/></span>
                        <p>Календарь</p>
                    </Link>
                    {pathname ==='/calendar' && <div></div>}
                </li>
                <li>
                    <Link to='/map'>
                        <span><MapIcon/></span>
                        <p>Карты</p>
                    </Link>
                    {pathname ==='/map' && <div></div>}
                </li>
                <li>
                    <Link to='/widgets'>
                        <span><WidgetsIcon/></span>
                        <p>Виджеты</p>
                    </Link>
                    {pathname ==='/widgets' && <div></div>}
                </li>
                <li onClick={toggleShowSettings} className={`settings ${showSettings ? 'active' : ''}`}>
                    <span><SettingsIcon/></span>
                    <p>Настройки</p>
                    <span className="toggle-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="12" viewBox="0 0 13 12" fill="none">
                            <path d="M6.06699 0.749999C6.25944 0.416666 6.74056 0.416667 6.93301 0.75L12.5622 10.5C12.7546 10.8333 12.5141 11.25 12.1292 11.25H0.870834C0.485934 11.25 0.245372 10.8333 0.437822 10.5L6.06699 0.749999Z" fill="#A8A8A8"/>
                        </svg>
                    </span>
                    
                </li>
                {showSettings && renderSettings()}
                <li className="exit">
                    <span><ExitIcon/></span>
                    <p>Выход</p>
                </li>
            </ul>
        </nav>
    );
}

export default Navigation;