import { Component } from 'react';
import axios from 'axios';

import Uploader from './Uploader';

type Props = Record<string, never>;

interface UserData {
    userId?: number | null;
    first?: string;
    last?: string;
    image?: string;
    bio?: string;
}

interface State extends UserData {
    uploaderIsVisible?: boolean;
}

export default class App extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            userId: null,
            first: '',
            last: '',
            image: '',
            bio: '',
            uploaderIsVisible: false,
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.sendImage = this.sendImage.bind(this);
    }

    async componentDidMount() {
        const { data }: { data: UserData } = await axios.get('/user');
        this.setState({ ...data });
    }

    toggleModal() {
        this.setState((state) => ({ uploaderIsVisible: !state.uploaderIsVisible }));
    }

    sendImage(file: any) {
        console.log('loggy', file);
        window.prompt('Copy to clipboard: Ctrl+C, Enter', JSON.stringify(file));
        const fd = new FormData();
        fd.append('image', file);
        axios
            .post('/upload', fd)
            .then(({ data }) => {
                console.log('response from axios post request: ', data);
                this.setState((state) => ({
                    ...state,
                    image: data.image,
                    uploaderIsVisible: false,
                }));
            })
            .catch((err) => {
                console.log('error was caught at upload return: ', err);
            });
    }

    render() {
        return (
            <>
                <Uploader sendImage={this.sendImage} toggleModal={this.toggleModal} />
            </>
        );
    }
}
