import React, { Component } from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class Jvs extends Component {

      render() {
        return (
            <React.Fragment>
            
               
                  <Container>
                    <Row md={4}>
                    
                  {this.props.jv.map((jv, i) => {
                  return (
                    <Col> <br/>
                    <Card border="dark" style={{ width: '18rem' }}>
                      <Card.Img variant="top" src="holder.js/100px180" />
                      <Card.Body>
                        <Card.Title>{jv.name}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">{jv.ownership}</Card.Subtitle>
                        <Card.Text>
                          Sales: {jv.sales}
                        </Card.Text>
                        <Button variant="danger" onClick={() => this.props.deleteJv(jv.id)} size="sm">Delete</Button> {' '}
                        <Button variant="secondary" onClick={() => { this.props.showEditForm(jv)}} size="sm">Update</Button>

                      </Card.Body>
                    </Card>
                    </Col>
                     )
                    })
                  }
                   
                    </Row>
                    </Container>
            
                    {/* // <tr>
                    //   <td key={jv.id}> {jv.name} </td>
                    //   <td key={i}> {jv.ownership} </td>
                    //   <td key={i}> {jv.sales} </td>
                    //   <td onClick={() => this.props.deleteJv(jv.id)}>X</td>
                    //   <td onClick={() => { this.props.showEditForm(jv)}}>Show Edit Form</td>
                    // </tr>
                  */}
      
          </React.Fragment>
        )
    }
}

export default Jvs;