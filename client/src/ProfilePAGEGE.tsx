import { Component } from 'react';

type Props = Record<string, never>;

interface State {
    first: string;
    last: string;
    image: string;
    bio: string;
}

export default class App extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            first: '',
            last: '',
            image: '',
            bio: '',
        };
        console.log('this.state: ', this.state);
    }

    render() {
        return <div>App Component</div>;
    }
}
