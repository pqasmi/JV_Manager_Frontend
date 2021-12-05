import React, { Component } from 'react'

export default class NewJv extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
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
    // console.log(this.state.name)
    // fetch
    fetch(this.props.baseUrl + '/jv/', {
      method: 'POST',
      body: JSON.stringify({
          name: this.state.name,
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
        ownership: '',
        sales: ''
      })
    }).catch (error => console.error({'Error': error}))
  }


  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="name">Name: </label>
        <input type="text" id="name" name="name" onChange={ (e) => this.handleChange(e)} value={this.state.name} />
       

        <label htmlFor="name">Ownership: </label>
        <input type="text" id="ownership" name="ownership" onChange={ (e) => this.handleChange(e)} value={this.state.ownership} />
       

        <label htmlFor="name">Sales: </label>
        <input type="text" id="sales" name="sales" onChange={ (e) => this.handleChange(e)} value={this.state.sales} />

        <input type="submit" value="Add Jv" />

      </form>
    )
  }

}