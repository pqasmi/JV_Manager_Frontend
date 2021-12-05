import React, { Component } from 'react'

class Jvs extends Component {

      render() {
        return (
            <React.Fragment>
            <table>
            <tbody>
              { this.props.jv.map((jv, i) => {
                  return (
                    <tr>
                      <td key={jv.id}> {jv.name} </td>
                      <td key={i}> {jv.ownership} </td>
                      <td key={i}> {jv.sales} </td>
                      <td onClick={() => this.props.deleteJv(jv.id)}>X</td>
                      <td onClick={() => { this.props.showEditForm(jv)}}>Show Edit Form</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>


          </React.Fragment>
        )
    }
}

export default Jvs;