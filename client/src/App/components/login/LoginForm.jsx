import React from 'react';

import React from 'react';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.onSubmit(this.state.username, this.state.password);
    }
    render() {
        return (
            <div className="container">
                <div className="well">
                    <form name="loginForm" className="form-horizontal">
                        <fieldset>
                            <legend>Log In</legend>
                            <div className="form-group">
                                <label htmlFor="username" className="col-md-2 control-label">Username (Email)</label>
                                <div className="col-md-10">
                                    <input name="username" type="email" placeholder="Username (Email)" required="required" autoComplete="off" className="form-control " />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password" className="col-md-2 control-label">Password</label>
                                <div className="col-md-10">
                                    <input name="password" type="password" placeholder="Password" required="required" autoComplete="off" className="form-control " />
                                </div>
                            </div>
                            <div className="form-group" >
                                <div className="col-md-10 col-md-offset-2">
                                    <div className="pull-right">
                                        <button onClick={this.handleSubmit} ng-disabled="loginForm.$invalid" className="btn btn-primary" disabled="disabled">Log In</button>&nbsp;
                                    <a href="/" className="btn btn-default">Cancel</a>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                    </form>
                </div>
            </div>
        );
    }
}



export default LoginForm;