import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import show from './show.js';
class Confirm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { show: false };
        this.show = show.bind(this);
    }

    render() {
        let notifyOnly = this.props.notifyOnly;
        let title = this.props.title || 'Please Confirm';
        return (
            <Modal show={this.state.show}>
                <Modal.Header>
                <button type="button" className="close" onClick={this.cancel}  aria-hidden="true">&times;</button>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {this.props.children}
                    {this.state.innerHtml}
                </Modal.Body>

                <Modal.Footer>
                    {notifyOnly ? null : (<Button onClick={this.cancel}>
                        Cancel
                    </Button>)}
                    <Button bsStyle="primary" onClick={this.accept}>
                        Yes
                    </Button>
                </Modal.Footer>

            </Modal>
        );
    }
}
export default Confirm;