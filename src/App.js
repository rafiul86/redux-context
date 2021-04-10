import Counter from './component/Counter/Counter'
import Form from './component/FormLogin/Form'
import Login from './Login/Login'
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import SignIn from './component/FormLogin/SignIn';
import Home from './component/Home';


function App() {
  return (
    <div className="design">
      
    <Router>
    <Counter></Counter>
        <Switch>
          <Route path="/signup">
          <Form/>
          </Route>
          <Route path="/sign">
            <SignIn />
          </Route>
        </Switch>
    </Router>
    </div>
  );
}

export default App;
