import './App.scss'
import Header from '../components/Header/header'
import Navigation from '../components/Navigation/navigation'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from '../pages/Home/HomePage'
import AddressSearchPage from '../pages/AddressSearch/AddressSearchPage'
import TablesPage from '../pages/Tables/TablesPage'
import CalendarPage from '../pages/Calendar/CalendarPage'
import MapPage from '../pages/Map/MapPage'
import WidgetsPage from '../pages/Widgets/WidgetsPage'
import ProfileSettingsPage from '../pages/ProfileSettings/ProfileSettingsPage'
import FinancesPage from '../pages/Finances/FinancesPage'

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Header />
        <main className='content'>
          <Navigation />
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/address' element={<AddressSearchPage />} />
            <Route path='/tables' element={<TablesPage />} />
            <Route path='/calendar' element={<CalendarPage />} />
            <Route path='/map' element={<MapPage />} />
            <Route path='/widgets' element={<WidgetsPage />} />
            <Route path='/profile-settings' element={<ProfileSettingsPage />} />
            <Route path='/finances' element={<FinancesPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
