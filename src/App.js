import React, { Component } from 'react'
import './App.css';
import NewJv from './NewJv'
import Jvs from './Jvs'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Register from './Register'
import Login from './Login'



let baseUrl = process.env.REACT_APP_BASEURL

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      jv: [],
      modalOpen: false,
      jvToBeEdited:{},
      name: "",
      ownership:"",
      sales:"",
      id: "",
      location: "",
      logo:"",
      showNewJv: false,
      showRegister: false,
      showLogin: false,
      userName: "",
      userLogIn: false
    }
  }

getJvs = () => {
    // fetch to the backend
    fetch(baseUrl + "/jv/", {
      credentials: "include"
    })
    .then(res => {
      if(res.status === 200) {
        return res.json()
      } else {
        return []
      }
    }).then(data => {
      console.log(data)
      this.setState({ 
        jv: data.data,
        
      })
    })
  }

  addJv = (newJv) => {
    const copyJv = [...this.state.jv]
    copyJv.push(newJv)
    this.setState({
      jv: copyJv,
    })
  }

deleteJv = (id) => {
    // console.log(id)
    fetch(baseUrl + '/jv/' + id, {
    method: 'DELETE', 
    credentials: "include"
  }).then( res => {
    const findIndex = this.state.jv.findIndex(jv => jv.id === id)
    const copyJv = [...this.state.jv]
    copyJv.splice(findIndex, 1)
    this.setState({
      jv: copyJv
    })
  })
}
handleSubmit = async (e) => {
  e.preventDefault()
  const url = baseUrl + '/jv/' + this.state.id
  try{
    const response = await fetch( url , {
      method: 'PUT',
      body: JSON.stringify({
        name: e.target.name.value,
        logo: e.target.logo.value,
        location: e.target.location.value,
        ownership: e.target.ownership.value,
        sales: e.target.sales.value,

      }),
      headers: {
        'Content-Type' : 'application/json'
      },
      credentials: "include"
    })
      if (response.status === 200){
          const updatedJv = await response.json()
          const findIndex = this.state.jv.findIndex(jv => jv.id === updatedJv.id)
          const copyJv = [...this.state.jv]
          copyJv[findIndex] = updatedJv
          this.setState({
            jv: copyJv,
            modalOpen:false
          })
          this.getJvs()
    
        }
  }
  catch(err){
    console.log('Error => ', err);
  }
}

handleChange = (e)=>{
  this.setState({
    [e.target.name]: e.target.value
  })
}

showEditForm = (jv) =>{
  this.setState({
    modalOpen:true,
    userLogIn: false,
    name: jv.name,
    logo: jv.logo,
    location: jv.location,
    ownership: jv.ownership,
    sales: jv.sales,
    id: jv.id,
    jvToBeEdited:jv
  })
}

newJv =(e) =>{
this.setState(
  {
    showNewJv: true
  }
)

}

hideNewJv =(e) =>{
  this.setState(
    {
      showNewJv: false
    }
  )
  
  }

showRegister =(e) =>{
    this.setState(
      {
        showRegister: true
      }
    )
    
    }

hideRegister =(e) =>{
      this.setState(
      {
        showRegister: false
      }
    )    
  }

showLogin =(e) =>{
    this.setState(
      {
        showLogin: true
      }
    )
    
    }

hideLogin =(e) =>{
      this.setState(
      {
        showLogin: false
      }
    )    
  }

loginUser = async (e) => {
    console.log('loginUser')
    e.preventDefault()
    const url = baseUrl + '/users/login'
    const loginBody = {
      username: e.target.username.value,
      email: e.target.email.value,
      password: e.target.password.value
    }
    try {

      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(loginBody),
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: "include"
      })

      console.log(response)
      console.log("BODY: ",response.body)

      if (response.status === 200) {
        this.getJvs()
      }

      alert(`${e.target.username.value} logged in successfully `)
      console.log(`${e.target.username.value} logged in successfully`)
      this.hideLogin()
      this.setState ({
        userLogIn: true,
        userName: e.target.username.value,
      })
      
    }
    catch (err) {
      console.log('Error => ', err);
    }
  }

register = async (e) => {
    e.preventDefault()
    const url = baseUrl + '/users/register'
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          username: e.target.username.value,
          email: e.target.email.value,
          password: e.target.password.value
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (response.status === 200) {

        this.getJvs()
        
      }
      alert(`${e.target.username.value} registered successful `)
      console.log(`${e.target.username.value} registered successful`)
      this.hideRegister()
     
    }
    catch (err) {
      console.log('Error => ', err);
      alert("user already exists")

    }
  }

logOut = async (e) => {
    console.log('logout')
    e.preventDefault()
    const url = baseUrl + '/users/logout'
    const response = await fetch(url
        , 
        {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: "include"
      }
      )
      console.log(response)
      console.log("BODY: ",response.body)
      alert(`${this.state.userName} successfully logged out`)
      this.setState({
        userName: "",
        userLogIn: false,
      })
      this.hideLogin()
    }

componentWillUnmount() {
      this.getJvs()
    }
componentDidMount() {
    this.getJvs()
  }



render() {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand className="header3"><h1>Joint Venture Manager</h1></Navbar.Brand> 
          <Navbar.Toggle />
          <Nav className="me-auto">
            <Nav.Link>{"      "}</Nav.Link>
            <Nav.Link>     </Nav.Link>
            <Nav.Link onClick={this.newJv} href="#home"><h5>Add JV</h5></Nav.Link>
            <Nav.Link> </Nav.Link>
            {!this.state.userLogIn &&
            <Nav.Link onClick={this.showRegister} href="#home"><h5>Register</h5></Nav.Link>
            }
            <Nav.Link> </Nav.Link>
            {!this.state.userLogIn &&
            <Nav.Link onClick={this.showLogin} href="#home"><h5>Login</h5></Nav.Link>
          }
          </Nav>
  
          <Navbar.Collapse className="justify-content-end">
          <Nav.Link onClick={this.logOut} href="#home"><h6>Log Out</h6></Nav.Link>
          <Navbar.Text>
              User: <a href="#login"><h6>{this.state.userName}</h6></a>
          </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>    
    <br/>
    <br/>
    <br/>
    
      {this.state.showRegister &&
        <Register register={this.register} hideRegister={this.hideRegister}/> 
      }

      {this.state.showLogin &&
        <Login loginUser={this.loginUser} hideLogin={this.hideLogin}/> 
      }

      {this.state.showNewJv &&
        <NewJv baseUrl={baseUrl} addJv={ this.addJv } hideNewJv={this.hideNewJv} />
      }
    <br/>
    <br/>
    <br/>
      
    {this.state.userLogIn &&
      <Jvs jv={this.state.jv} deleteJv={this.deleteJv} showEditForm={this.showEditForm} getJvs={this.getJvs} />
    }
      {
            this.state.modalOpen &&


          <Form className="newForm" onSubmit={this.handleSubmit} margin={100}>
            <Row className="mb-3">
              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label htmlFor="name">Name</Form.Label>
                <Form.Control
                type="text"
                name="name" 
                value={this.state.name} 
                onChange={this.handleChange}
                
                />
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label htmlFor="logo">Logo</Form.Label>
                <Form.Control
            
                  type="text"
                  name="logo" 
                  value={this.state.logo} 
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label htmlFor="location">Location</Form.Label>
                <Form.Control
              
                type="text"
                name="location" 
                value={this.state.location} 
                onChange={this.handleChange}
                />
              </Form.Group>
            </Row>  
            
            <Row className="mb-3">
              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label htmlFor="ownership">Ownership</Form.Label>
                <Form.Control
              
                    type="text"
                    name="ownership" 
                    value={this.state.ownership} 
                    onChange={this.handleChange}
                />
                <br/>
              <Button variant="secondary" type="submit" size="sm" className="button" onClick={()=> this.setState({userLogIn: true})}>Submit</Button> 
              {" "}
              <Button variant="danger" type="submit" size="sm" className="button" onClick={()=> this.setState({modalOpen: false, userLogIn: true})}>Hide</Button> 
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label htmlFor="sales">Sales</Form.Label>
                <Form.Control
              
                  type="text"
                  name="sales" 
                  value={this.state.sales} 
                  onChange={this.handleChange}
                />
                <br/>
                
              </Form.Group>
              
              <br/>
              <br/>
              <br/>
            </Row>   



            </Form>

            
          } 
    </>
  );
}

}

export default App;
