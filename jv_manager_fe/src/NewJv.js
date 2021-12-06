import React, { Component } from 'react'
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import './NewJv.css';


export default class NewJv extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      logo: '',
      location: '',
      ownership: '',
      sales: ''
    }
  }

  handleChange = (e) => {
    // console.log(event.target.value)
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
 
    // fetch
    fetch('http://localhost:8000' + '/jv/', {
      method: 'POST',
      body: JSON.stringify({
          name: this.state.name,
          logo: this.state.logo,
          location: this.state.location,
          ownership: this.state.ownership,
          sales: this.state.sales,
        }),
      headers: {
        'Content-Type': 'application/json'
      },
    }).then( res => {
        return res.json()
    }).then( data => {
      console.log(data)
      // call addJv function in app.js and pass in the new data as input
      this.props.addJv(data)
      this.setState({
        name: '',
        logo: '',
        location: '',
        ownership: '',
        sales: ''
      })

      this.props.getJvs()
  

    }).catch (error => console.error({'Error': error}))
  }


  render() {
    return (
      <>
      <Form className="newForm" onSubmit={this.handleSubmit} margin={100}>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label htmlFor="name">JV Name</Form.Label>
          <Form.Control
          
            type="text"
            id="name"
            name="name" 
            placeholder="Name"
            onChange={ (e) => this.handleChange(e)} 
            value={this.state.name} 
          />
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label htmlFor="logo">Link to Logo</Form.Label>
          <Form.Control
       
            type="text"
            id="logo"
            name="logo" 
            placeholder="Logo"
            onChange={ (e) => this.handleChange(e)} 
            value={this.state.logo} 
          />
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label htmlFor="location">Location</Form.Label>
          <Form.Control
         
            type="text"
            id="location"
            name="location" 
            placeholder="Country"
            onChange={ (e) => this.handleChange(e)} 
            value={this.state.location} 
          />
        </Form.Group>
      </Row>  
      
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label htmlFor="ownership">Ownership</Form.Label>
          <Form.Control
         
            type="text"
            id="ownership"
            name="ownership" 
            placeholder="Minority/Majority"
            onChange={ (e) => this.handleChange(e)} 
            value={this.state.ownership} 
          />
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label htmlFor="sales">Link to Logo</Form.Label>
          <Form.Control
        
            type="text"
            id="sales"
            name="sales" 
            placeholder="$(Millions)"
            onChange={ (e) => this.handleChange(e)} 
            value={this.state.sales} 
          />
        </Form.Group>
       
        <br/>
        <br/>
        <br/>

       
      </Row>   
      <div className="submitButton">
      <Button type="submit">Submit</Button> 
      </div>
       
    </Form>

      </>
    
    )

  }

  }
