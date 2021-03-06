import React from "react";
import "./contact.scss";
import axios from 'axios';
class Contact extends React.Component {
    constructor(props) {
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeMessage = this.onChangeMessage.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            email: '',
            message: '',
            successMsg: ''
        }
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }
    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }
    onChangeMessage(e) {
        this.setState({
            message: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const userData = {
            name: this.state.name,
            email: this.state.email,
            message: this.state.message
        };

        axios.post('/api/contact', userData)
            .then(res => {
                this.setState({
                    successMsg: "Thank you. We got your message. We will get back shortly."
                });
            });
    }
    render() {

        return (
            <div className="contact_wrapper">
                <div className="grid">
                    <h1>Contact Us</h1>
                    <form onSubmit={this.onSubmit}>
                        <p>
                            <label>
                                <input type="text" name="name" value={this.state.name} onChange={this.onChangeName} required placeholder="Name" />
                            </label>
                            <label>
                                <input type="email" name="email" value={this.state.email} onChange={this.onChangeEmail} required placeholder="Email" />
                            </label>
                        </p>
                        <p>
                            <label>
                                <span>Message: </span><textarea name="message" value={this.state.message} onChange={this.onChangeMessage} required placeholder="Write your message here"></textarea>
                            </label>
                        </p>
                        <p><input type="submit" value="Submit" /></p>
                    </form>
                    <p className="success-msg">{this.state.successMsg}</p>
                </div>
            </div>
        );
    }
}

export default Contact;