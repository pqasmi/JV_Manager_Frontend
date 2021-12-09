import Button from 'react-bootstrap/Button';

export default function Credentials(props) {
    return(
        <>
        <nav>
            <form onSubmit={props.loginUser}>
                <strong>Login </strong>
                <label htmlFor="name">Username: </label>
                <input type="text" id="name" name="username"/>
                <label htmlFor="email">Email: </label>
                <input type="text" id="email" name="email"/>
                <label htmlFor="name">Password: </label>
                <input type="text" id="password" name="password"/>
                <input type="submit" value="login" />
            </form>
            OR
            <form onSubmit={props.register}>
                <strong>Register </strong>
                <label htmlFor="name">Username: </label>
                <input type="text" id="name" name="username"/>
                <label htmlFor="name">Email: </label>
                <input type="text" id="email" name="email"/>
                <label htmlFor="name">Password: </label>
                <input type="text" id="password" name="password"/>
                <input type="submit" value="signup" />
            </form>
            <Button variant="danger" size="sm" className="button" onClick={props.hideLogIn}>Hide</Button>  
        </nav>
      
        </>
        
    )
}