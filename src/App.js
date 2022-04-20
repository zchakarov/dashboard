import { Routes, Route, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import './App.css';
import News from "./components/news";
import Article from "./components/Article";
import Weather from "./components/weather";
import Error from "./components/error";
function App() {
    const location = useLocation();
    document.title= "Startseite";

  return (
    <div className="App">
        <Weather/>
        <TransitionGroup className="transition-group">
            <CSSTransition
                key={location.key}
                classNames="transition-element fade"
                transitionAppear={true}
                transitionEnter={true}
                transitionLeave={true}
                timeout={{
                    appear: 750,
                    enter: 750,
                    exit: 750,
                }}
                unmountOnExit={true}
            >
                <Routes location={location} className='container'>
                    <Route path="/" element={<News/>}/>
                    <Route path="/:id" element={<Article/>}/>
                    <Route path="/404" element={<Error/>}/>

                </Routes>
            </CSSTransition>
        </TransitionGroup>
    </div>
  );
}

export default App;
