import { Component } from "react";
import axios from 'axios';

interface Props { }

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
        if (e.target.name === 'first' || 'last' || 'email' || 'password') {
            this.setState({
                [e.target.name]: e.target.value
            }, () => console.log(this.state));
        }
    }

    handleSubmit(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        axios
            .post('/register', this.state)
            .then(res => {
                if (res.data.success) {
                    location.reload();
                } else {
                    this.setState({ error: true });
                }
            })
            .catch(console.log)
    }

    render() {
        return (
            <form>
                {this.state.error && (<h1>There was an error!</h1>)}
                <input type="text" name="first" placeholder="First Name" onChange={this.handleChange} />
                <input type="text" name="last" placeholder="Last Name" onChange={this.handleChange} />
                <input type="text" name="email" placeholder="Email Address" onChange={this.handleChange} />
                <input type="password" name="password" placeholder="Password" onChange={this.handleChange} />
                <button onClick={this.handleSubmit}>Sign Up</button>
            </form>
        );
    }
}