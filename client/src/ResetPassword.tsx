import { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { FormStyles } from './styles/FormStyles';

type Props = Record<string, never>;

interface State {
    currentDisplay?: 1 | 2 | 3;
    email?: string;
    secretCodeTyped?: string;
    newPassword?: string;
    error?: boolean;
}

export default class ResetPassword extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            currentDisplay: 1,
            error: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.emailSubmit = this.emailSubmit.bind(this);
        this.passwordUpdate = this.passwordUpdate.bind(this);
    }

    handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.name === 'email' || e.target.name === 'secretCodeTyped' || e.target.name === 'newPassword') {
            this.setState({
                [e.target.name]: e.target.value,
            });
        }
    }

    emailSubmit() {
        console.log('this.state: ', this.state);
        axios
            .post('/auth/password-reset/email-check', { email: this.state.email })
            .then((result) => {
                console.log('email check result:', result);
                this.setState({
                    currentDisplay: 2,
                    error: false,
                });
            })
            .catch((err) => {
                console.log('err: ', err);
                this.setState({
                    error: true,
                });
            });
    }

    passwordUpdate() {
        axios
            .post('/auth/password-reset/verify-code', {
                email: this.state.email,
                secretCodeTyped: this.state.secretCodeTyped,
                newPassword: this.state.newPassword,
            })
            .then(({ data }) => {
                console.log('the return from the post request is open: ', data.error);
                if (data.error === 'code not found') {
                    console.log('error has made it this far');
                    this.setState(
                        {
                            error: true,
                        },
                        () => console.log('this.state: ', this.state),
                    );
                } else {
                    console.log('password was succesfully reset');
                    this.setState({
                        currentDisplay: 3,
                        error: false,
                    });
                }
            })
            .catch((err) => {
                console.log('err changing password: ', err);
                this.setState({
                    error: true,
                });
            });
    }

    render() {
        const { currentDisplay, error } = this.state;

        return (
            <>
                {currentDisplay === 1 && (
                    <FormStyles>
                        {error && <span>Invalid email address, please be more careful!</span>}
                        {error || <h4>Reset Password</h4>}
                        {error || <h5>Please enter the email address you signed up with.</h5>}
                        <input name="email" type="email" onChange={this.handleChange} required />
                        <span>
                            Go back? <Link to="/login">Log In</Link>
                        </span>
                        <button type="button" onClick={this.emailSubmit}>
                            Submit
                        </button>
                    </FormStyles>
                )}
                {currentDisplay === 2 && (
                    <FormStyles>
                        {error && <span>The code you entered was incorrect, please try again!</span>}
                        {error || <h5>Please enter the code which was just sent to your email address.</h5>}
                        <input name="secretCodeTyped" type="text" onChange={this.handleChange} required />
                        <h5 className="new-class-h">Please enter a new password.</h5>
                        <input name="newPassword" type="password" onChange={this.handleChange} required />
                        <button type="button" onClick={this.passwordUpdate}>
                            Reset
                        </button>
                    </FormStyles>
                )}
                {currentDisplay === 3 && (
                    <FormStyles>
                        <h4>Reset Password</h4>
                        <h5>Success!</h5>
                        <h5>
                            You can now{' '}
                            <a className="log-back-in" href="/login">
                                log in
                            </a>{' '}
                            with your new password.
                        </h5>
                    </FormStyles>
                )}
            </>
        );
    }
}
