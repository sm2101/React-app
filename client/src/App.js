import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';


function App() {
    return ( 
        <Router>
            < div className = "App" >
                <Navbar />
                    <Route exact path = "/" component = {Landing} />
                <Footer />
            </div>
        </Router>
    );
}

export default App;