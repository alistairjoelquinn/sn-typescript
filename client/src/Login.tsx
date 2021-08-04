import { Component } from 'react';
import axios from 'axios';

import { Link } from 'react-router-dom';
import { FormStyles } from './styles/FormStyles';

type Props = Record<string, never>;

interface State {
    error?: boolean;
    email?: string;
    password?: string;
}

export default class Login extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            error: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.name === 'email' || e.target.name === 'password') {
            this.setState({ [e.target.name]: e.target.value }, () => console.log(this.state));
        }
    }

    handleSubmit(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        axios
            .post('/login', this.state)
            .then((res) => {
                if (res.data.success) {
                    window.location.replace('/');
                } else {
                    this.setState({ error: true });
                }
            })
            .catch(console.log);
    }

    render() {
        const { error } = this.state;

        return (
            <FormStyles>
                {error && <h1>There was an error!</h1>}
                <input type="text" name="email" placeholder="Email Address" onChange={this.handleChange} />
                <input type="password" name="password" placeholder="Password" onChange={this.handleChange} />
                <span>
                    Haven&apos;t registered? <Link to="/">Sign Up</Link>
                </span>
                <button type="submit" onClick={this.handleSubmit}>
                    Log In
                </button>
            </FormStyles>
        );
    }
}
