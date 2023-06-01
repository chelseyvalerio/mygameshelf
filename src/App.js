import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Footer from './components/Footer';
import Search from './components/Search';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Header />
      <Login />
      <Search />
      <Footer />
    </div>
  );
}

export default App;
