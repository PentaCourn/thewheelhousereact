import logo from './logo.svg';
import './App.css';
//npm install react-router-dom
//npm install axios
//npm install @fortawesome/react-fontawesome @fortawesome/free-brands-svg-icons @fortawesome/free-solid-svg-icons
//npm install styled-components
//npm install react-icons
//npm install react-responsive-modal
//npm install react-lazyload
//npm install react-loader-spinne
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
import Home from './pages/home';
import { MemoryRouter } from 'react-router-dom';
import ResultPage from './pages/searchPage';
import Header from './components/header';
import DisplayCarComponent from './components/displayCarComponent';
import CarDisplay from './pages/carDisplayPage';
import ContactUs from './pages/contactUs';
import FAQ from './pages/faqPage';



export default function App() {
  // Initialize the data
  const searchData = {
    brandName: null,
    modelName: null,
    priceMax: null,
    mileageMax: null,
    transmission: null,
    fuelType: null,
    exteriorColor: null,
    interiorColor: null,
    features: [],
  };

  // Store the data in local storage
  localStorage.setItem('searchParams', JSON.stringify(searchData));
  return (

      //route to the home page
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<ResultPage />} />
          <Route path="/:vin" element={<CarDisplay />} />
          <Route path="/contactUs" element={<ContactUs />} />
          <Route path="/FAQ" element={<FAQ />} />
        </Routes>
      </Router>
    
  );
}

function LogIn({ handlePostRequest }) {
  const handleClick = () => {
    handlePostRequest();
  };

  return (
    <button onClick={handleClick}>Log In</button>
  );
}
/*function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
      <Routes>
        <Route path="/test" component={test} />
      </Routes>
    </Router>
  );
}

function Home() {
  return <h1>Home Page</h1>;
}

function About() {
  return <h1>About Page</h1>;
}


function Contact() {
  return <h1>Contact Page</h1>;
}

export default App;*/