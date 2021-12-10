import React, { Component } from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class Jvs extends Component {

      render() {
        console.log(this.props.jv)
        return (
            <React.Fragment>   
                <Container>
                    <Row md={4}>       
                  {this.props.jv.map((jv, i) => {
                  return (
                    <Col> <br/>
                    <Card border="dark" style={{ width: '18rem' }}>
                      <Card.Img variant="top" src={jv.logo} height={200} width={75}/>
                      <Card.Body>
                        <Card.Title>{jv.name}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">Ownership: {jv.ownership}</Card.Subtitle>
                        <Card.Text>
                          Sales: ${jv.sales} Million <br/>
                          Country: {jv.location} <br/>
                          Risk: {jv.sales >= 50 ? 'High' : 'Low'} <br/>
                          Review : {jv.sales >= 50 ? 'Quarterly' : 'Annually'} <br/>
                          Prepared By: {jv.preparer.username}
                          
                        </Card.Text>
                        <Button variant="danger" onClick={() => this.props.deleteJv(jv.id)} size="sm">Delete</Button> {' '}
                        <Button variant="secondary" onClick={() => { this.props.showEditForm(jv)}} size="sm">Update</Button>
                        <br/><br/>
                        Created on: {jv.created_at}
                      </Card.Body>
                    </Card>
                    </Col>
                     )
                    })
                  }
                   
                    </Row>
                    </Container>
      
          </React.Fragment>
        )
    }
}

export default Jvs;