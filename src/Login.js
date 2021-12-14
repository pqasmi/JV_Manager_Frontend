import './Login.css';

export default function Login (props) {

    return (
        <>
        <nav>
        <form className="loginForm" onSubmit={props.loginUser}>
        <strong>Sign In below: </strong> <br/><br/>
        <label htmlFor="name">Username: </label>
        <input className="input" type="text" id="name" name="username"/><br/><br/>
        <label htmlFor="name">Email Add:</label> 
        <input className="input" type="text" id="email" name="email"/><br/><br/>
        <label htmlFor="name">Password: </label>
        <input className="input" type="password" id="password" name="password"/><br/><br/>
        <input className="button" type="submit" value="Login" /> {'      '}
        <input className="button" type="submit" value=" Hide " onClick={props.hideLogin} /> 
        
        </form>
        
        </nav> 
    </>
    
    )
}
