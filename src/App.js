import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Login from './components/Login';
import Footer from './components/Footer';
import Contact from './components/Contact';

function App() {
  return (
    <div className="App">
      <Header />
      <Login />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
