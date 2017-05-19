import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import show from './show.js';
class Alert extends React.Component {
    constructor(props) {
        super(props);
        this.state = { show: false };
        this.show = show.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }
    hideModal() {
        this.setState({ show: false });
    }
    render() {

        return (
            <Modal show={this.state.show} keyboard={true} onHide={this.hideModal}>
                <Modal.Header>
                    <Modal.Title>{this.props.title || 'Alert'}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {this.props.children}
                </Modal.Body>

                <Modal.Footer>

                    <Button bsStyle="primary" onClick={this.accept}>
                        Ok
                    </Button>
                </Modal.Footer>

            </Modal>
        );
    }
}
export default Alert;