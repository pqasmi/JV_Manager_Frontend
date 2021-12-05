import React, { Component } from 'react'
import './App.css';
import NewJv from './NewJv'
import Jvs from './Jvs'

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
    }
  }

getJvs = () => {
    // fetch to the backend
    fetch(baseUrl + "/jv/")
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
    method: 'DELETE'
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
        ownership: e.target.ownership.value,
        sales: e.target.sales.value,

      }),
      headers: {
        'Content-Type' : 'application/json'
      },
    })

    if (response.status === 200){
      const updatedJv = await response.json()
      const findIndex = this.props.jv.findIndex(jv => jv.id === updatedJv.id)
      const copyJv = [...this.state.jv]
      copyJv[findIndex] = updatedJv
      this.setState({
        jv: copyJv,
        modalOpen:false
      })
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
    ownership: jv.ownership,
    sales: jv.sales,
    id: jv.id,
    jvToBeEdited:jv
  })
}

componentDidMount() {
    this.getJvs()
  }

render() {

  return (
    <div className="App">
      <h1> JVs! </h1>
      <NewJv baseUrl={baseUrl} addJv={ this.addJv }/>
      <Jvs jv={this.state.jv} deleteJv={this.deleteJv} showEditForm={this.showEditForm} />
      {
            this.state.modalOpen &&

            <form onSubmit={this.handleSubmit}>
              <label>Name: </label>
              <input name="name" value={this.state.name} onChange={this.handleChange}/> <br/>

              <label>Ownership: </label>
              <input name="ownership" value={this.state.ownership} onChange={this.handleChange}/>

              <label>Sales: </label>
              <input name="sales" value={this.state.sales} onChange={this.handleChange}/>

              <button>submit</button>

            </form>
          } 
    </div>
  );
}

}

export default App;
