import './App.scss';
import Header from '../components/Header/header';
import Navigation from '../components/Navigation/navigation';

function App() {
  return (
    <div className="App">
      <Header/>
      <main className="content" >
        <Navigation/>
        <div></div>
      </main>
      
    </div>
  );
}

export default App;
