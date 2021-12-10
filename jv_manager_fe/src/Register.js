
import Button from 'react-bootstrap/Button';
import './Register.css';

export default function Register (props) {

        return (
            <>
            <nav>
            <form className="loginForm" onSubmit={props.register}>
            <strong>Register: </strong> <br/><br/>
            <label htmlFor="name">Username: </label>
            <input className="input" type="text" id="name" name="username"/><br/><br/>
            <label htmlFor="name">Email Add: </label> 
            <input className="input" type="text" id="email" name="email"/><br/><br/>
            <label htmlFor="name">Password: </label>
            <input className="input" type="password" id="password" name="password"/><br/><br/>
            <input className="button" type="submit" value="Register" /> {'      '}
            <input className="button" type="submit" value=" Hide " onClick={props.hideRegister} /> 
          
            </form>
            
            </nav> 
        </>
        
        )
}
