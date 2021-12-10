import React, { Component } from 'react'
import './App.css';
import NewJv from './NewJv'
import Jvs from './Jvs'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Credentials from './Credentials'

let baseUrl = 'http://localhost:8000'

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
      showLogIn: false,
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

showLogIn =(e) =>{
    this.setState(
      {
        showLogIn: true
      }
    )
    
    }

hideLogIn =(e) =>{
      this.setState(
      {
        showLogIn: false
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
      this.hideLogIn()
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
      this.hideLogIn()

    }


componentDidMount() {
    this.getJvs()
  }

componentWillUnmount() {
    this.getJvs()
  }

render() {
  return (
    <>
        <Nav
          activeKey="/home"
          onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
      >
        <Nav.Item>
        {/* <img src={logo} alt="logo" height={75} width={90} /> */}
        </Nav.Item>
        <Nav.Item>
        <h3 className="header">Joint Venture Manager</h3>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link className="link" onClick={this.newJv}>Add JV Record</Nav.Link>
        </Nav.Item>
        <Nav.Item>
        <Nav.Link className="link" onClick={this.showLogIn}>Register/ Sign In</Nav.Link>
        </Nav.Item>
        <Nav.Item>
        <Nav.Link className="link" onClick={this.logOut} >Log out</Nav.Link>
        </Nav.Item>
        <Nav.Item> 
        <Nav.Link className="link3" >{this.state.userName}</Nav.Link>
        </Nav.Item>
      </Nav>
    
    <br/>
    <br/>
    <br/>
          {/* <Container>
              <Row>
                  <Col>
                  Key Features: <br/>Record Key information relating to Joint ventures of the corporation</Col>
              </Row>
          </Container> */}


      {this.state.showLogIn &&
        <Credentials loginUser={this.loginUser} register={this.register} hideLogIn={this.hideLogIn}/>
      }

      {this.state.showNewJv &&
        <NewJv baseUrl={baseUrl} addJv={ this.addJv } hideNewJv={this.hideNewJv} />
      }
    <br/>
    <br/>
    <br/>
    <br/>

    {this.state.userLogIn &&
      <Jvs jv={this.state.jv} deleteJv={this.deleteJv} showEditForm={this.showEditForm} getJvs={this.getJvs} />
    }
      {
            this.state.modalOpen &&

            <form onSubmit={this.handleSubmit}>
              <label>Name: </label>
              <input name="name" value={this.state.name} onChange={this.handleChange}/> <br/>


              <label>Logo: </label>
              <input name="logo" value={this.state.logo} onChange={this.handleChange}/> <br/>

              <label>Location: </label>
              <input name="location" value={this.state.location} onChange={this.handleChange}/> <br/>

              <label>Ownership: </label>
              <input name="ownership" value={this.state.ownership} onChange={this.handleChange}/>

              <label>Sales: </label>
              <input name="sales" value={this.state.sales} onChange={this.handleChange}/>

              <button>submit</button>

            </form>
          } 
    </>
  );
}

}

export default App;
