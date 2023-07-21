import './App.css';
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';
import Details from './components/Details/Details';
import Form from './components/Form/Form';
import PageNotFound from './components/PageNotFound/PageNotFound';
import Navbar from './components/Navbar/Navbar';
import { Route, Switch } from 'react-router-dom';
import axios from 'axios';


axios.defaults.baseURL = 'http://localhost:3001'; 

function App() {
  return (
    <div className="App"> 
    {/* <> */}
      <Switch>
        
        <Route exact path={"/"}>
          <LandingPage />
        </Route>

        <Route exact path={"/home"}>
          <Home />
          <Navbar />
        </Route>

        <Route exact path={"/create"}>
          <Form />
          <Navbar />
        </Route>

        <Route exact path={"/details/:id"}>
          <Details />
          <Navbar />
        </Route>

        <Route path={"/*"}>
          <PageNotFound />
        </Route>

      </Switch>
      {/* </> */}
    </div>
  );
}

export default App;


/*

import { Route, useLocation } from 'react-router-dom';
import './App.css';
import Landing from './views/Landing/Landing';
import Form from './views/Form/Form';
import Home from './views/Home/Home';
import Details from './views/Details/Details';
import NavBar from './components/NavBar/NavBar';

function App() {

  const location = useLocation();

  return (
    <div className="App">
      {location.pathname !== '/' && <NavBar />}{ }
      <Route exact path="/" component={Landing} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/create" component={Form} />
      <Route path="/detail/:id" component={Details} />
    </div>
  );
}

export default App;

 */