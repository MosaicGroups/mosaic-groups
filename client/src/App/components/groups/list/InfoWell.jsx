import React from 'react';
import { Well, Row, Col } from 'react-bootstrap';
import Alert from '../../common/modal/Alert.jsx';
const moreInfoSections = [{
    label: 'Host',
    details: 'Hey! Not ready to lead a group, but you\'ve got space to host one? Awesome! Let us know by emailing <a href="mailto:jessica@mosaicchristian.org"> jessica@mosaicchristian.org</a>'
},
{
    label: 'Lead',
    details: 'Hey! Interested in leading a growth group? Awesome! Fill out the application here: <br />' +
    '<a href="https://www.mosaicchristian.org/leadagroup"> www.mosaicchristian.org/leadagroup </a>' +
    '<br />We\'re looking forward to hearing from you!'
},
{
    label: 'Childcare',
    details: 'Hey! Looking to make some extra cash on the side? Join our team of background checked babysitters, and help make it possible for parents to connect each and every semester! Let us know by emailing <a href="mailto:jessica@mosaicchristian.org"> jessica@mosaicchristian.org</a>'
}];

class InfoWell extends React.Component {
    constructor(props) {
        super(props);
        this.state = { msg: '' };
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(msg, title) {
        this.setState({msg, title});
        this.refs.alert.show();

    }
    render() {
        return (
            <Well>
                <Row>
                    <Col md={12}>
                        {moreInfoSections.map(section => (
                            <Row key={section.label} className="text-center ">
                                <button onClick={()=> this.handleClick(section.details, section.label)}className="btn ">{section.label}</button>
                            </Row>
                        ))}
                    </Col>
                </Row>
                <Alert title={this.state.title} ref="alert">
                    <span dangerouslySetInnerHTML={{__html: this.state.msg}}/>
                </Alert>
            </Well>
        );
    }
}



export default InfoWell;