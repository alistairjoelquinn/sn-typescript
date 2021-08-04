import { Component } from 'react';
import axios from 'axios';

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
    }

    handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.name === 'email' || e.target.name === 'secretCodeTyped' || e.target.name === 'newPassword') {
            this.setState({
                [e.target.name]: e.target.value,
            });
        }
    }

    emailSubmit() {
        axios
            .post('/email-check', { email: this.state.email })
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
        console.log('function opened');
        axios
            .post('/final-reset', {
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
            <div className="reset-container">
                <a id="back-button" href="/welcome#/login">
                    Back
                </a>
                {currentDisplay === 1 && (
                    <div className="reset-display">
                        {error && <span className="invalid-email">Invalid email address, please be more careful!</span>}
                        {error || <h4>Reset Password</h4>}
                        {error || <h5>Please enter the email address you signed up with.</h5>}
                        <input
                            name="email"
                            type="email"
                            onChange={(e) => {
                                this.handleChange(e);
                            }}
                            required
                        />
                        <button type="button" onClick={() => this.emailSubmit()}>
                            Submit
                        </button>
                    </div>
                )}
                {currentDisplay === 2 && (
                    <div className="reset-display">
                        {error && (
                            <h5 className="invalid-code">The code you entered was incorrect, please try again!</h5>
                        )}
                        {error || <h5>Please enter the code which was just sent to your email address.</h5>}
                        <input
                            name="secretCodeTyped"
                            type="text"
                            onChange={(e) => {
                                this.handleChange(e);
                            }}
                            required
                        />
                        <h5 className="new-class-h">Please enter a new password.</h5>
                        <input
                            name="newPassword"
                            type="password"
                            onChange={(e) => {
                                this.handleChange(e);
                            }}
                            required
                        />
                        <button type="button" onClick={() => this.passwordUpdate()}>
                            Reset
                        </button>
                    </div>
                )}
                {currentDisplay === 3 && (
                    <div className="reset-display">
                        <h4>Reset Password</h4>
                        <h5>Success!</h5>
                        <h5>
                            You can now{' '}
                            <a className="log-back-in" href="/welcome#/login">
                                log in
                            </a>{' '}
                            with your new password.
                        </h5>
                    </div>
                )}
            </div>
        );
    }
}
