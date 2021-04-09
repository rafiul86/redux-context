import Counter from './component/Counter/Counter'
import Form from './component/FormLogin/Form'
import Login from './Login/Login'
import './App.css'
function App() {
  return (
    <div className="design">
      <Login></Login>
      <Counter></Counter>
      <h1>Manual Login Form</h1>
      <br/>
      <Form></Form>
    </div>
  );
}

export default App;
