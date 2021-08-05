import { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import GlobalStyles from './styles/GlobalStyles';
import Typography from './styles/Typography';
import Uploader from './Uploader';
import ProfilePic from './ProfilePic';
import Logo from './Logo';

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

const AppStyles = styled.div`
    height: 100vh;
    width: 100vw;
    background-color: rgb(30, 15, 25);
    overflow: hidden;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 20vh 1fr;
    header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        img {
            height: 100%;
            padding: 2rem;
            border-radius: 50%;
        }
    }
`;

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
        const { data }: { data: UserData } = await axios.get('/user/get-data');
        this.setState({ ...data }, () => console.log(this.state));
    }

    toggleModal() {
        this.setState((state) => ({ uploaderIsVisible: !state.uploaderIsVisible }));
    }

    sendImage(file: any) {
        const fd = new FormData();
        fd.append('image', file);
        axios
            .post('/user/upload', fd)
            .then((res) => {
                this.setState({
                    image: res.data.image,
                    uploaderIsVisible: false,
                });
            })
            .catch((err) => {
                console.log('error was caught at upload return: ', err);
            });
    }

    render() {
        const { first, last, image, uploaderIsVisible } = this.state;
        return (
            <>
                <GlobalStyles />
                <Typography />
                <AppStyles>
                    <header>
                        <img src="animal.jpeg" alt="logo" />
                        <ProfilePic first={first} last={last} image={image} toggleModal={this.toggleModal} />
                    </header>
                    <div>he</div>
                </AppStyles>
                {uploaderIsVisible && <Uploader sendImage={this.sendImage} toggleModal={this.toggleModal} />}
            </>
        );
    }
}
