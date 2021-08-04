import { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const FormStyles = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    input {
        padding: 0.7rem;
        margin: 0.5rem;
        width: 25vw;
        background-color: antiquewhite;
        border-radius: 1rem;
    }
    span {
        color: antiquewhite;
    }
    button {
        padding: 0.7rem;
        margin: 1rem;
        width: 10vw;
        border-radius: 1rem;
        background-color: rgb(227, 81, 64);
        &:hover {
            background-color: rgb(243, 140, 128);
        }
    }
`;

type Props = Record<string, never>;

interface State {
    error?: boolean;
    first?: string;
    last?: string;
    email?: string;
    password?: string;
}

export default class Registration extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            error: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (
            e.target.name === 'first' ||
            e.target.name === 'last' ||
            e.target.name === 'email' ||
            e.target.name === 'password'
        ) {
            this.setState({ [e.target.name]: e.target.value }, () => console.log(this.state));
        }
    }

    handleSubmit(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        axios
            .post('/register', this.state)
            .then((res) => {
                if (res.data.success) {
                    window.location.reload();
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
                <input type="text" name="first" placeholder="First Name" onChange={this.handleChange} />
                <input type="text" name="last" placeholder="Last Name" onChange={this.handleChange} />
                <input type="text" name="email" placeholder="Email Address" onChange={this.handleChange} />
                <input type="password" name="password" placeholder="Password" onChange={this.handleChange} />
                <span>
                    Already registered? <Link to="/login">Log in</Link>
                </span>
                <button type="submit" onClick={this.handleSubmit}>
                    Sign Up
                </button>
            </FormStyles>
        );
    }
}
