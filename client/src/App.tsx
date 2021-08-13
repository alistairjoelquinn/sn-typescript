import { Component } from 'react';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

import GlobalStyles from './styles/GlobalStyles';
import Typography from './styles/Typography';
import Uploader from './Uploader';
import ProfilePic from './ProfilePic';
import Profile from './Profile';
import FindPeople from './FindPeople';
import OtherProfile from './OtherProfile';
import Friends from './Friends';

const AppStyles = styled.div`
    height: 100vh;
    width: 100vw;
    background-color: rgb(30, 15, 25);
    overflow: hidden;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 20vh 1fr;
    a {
        color: antiquewhite;
        text-decoration: none;
        &:hover {
            cursor: pointer;
        }
        &:visited {
            color: antiquewhite;
        }
    }
    header {
        width: 100vw;
        display: flex;
        align-items: center;
        justify-content: space-between;
        img {
            height: clamp(80px, 15vw, 150px);
            width: clamp(80px, 15vw, 150px);
            object-fit: cover;
            padding: 2rem;
            border-radius: 50%;
        }
    }
    div.white-out {
        position: absolute;
        inset: 0;
        background-color: rgba(30, 15, 25, 0.8);
        z-index: 2;
    }
`;

type Props = Record<string, never>;

export interface UserData {
    userId?: string | null;
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
            first: '',
            last: '',
            image: '',
            bio: '',
            uploaderIsVisible: false,
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.updateImageUrl = this.updateImageUrl.bind(this);
        this.updateBioFromApp = this.updateBioFromApp.bind(this);
    }

    async componentDidMount() {
        const { data }: { data: UserData } = await axios.get('/user/get-data');
        this.setState({ ...data });
    }

    toggleModal() {
        this.setState((state) => ({ uploaderIsVisible: !state.uploaderIsVisible }));
    }

    updateImageUrl(image: any) {
        this.setState({
            image,
            uploaderIsVisible: false,
        });
    }

    updateBioFromApp(newBio: string) {
        this.setState({ bio: newBio });
    }

    render() {
        const { first, last, image, uploaderIsVisible, bio } = this.state;
        return (
            <>
                <GlobalStyles />
                <Typography />
                <BrowserRouter>
                    <AppStyles>
                        <header>
                            <img src="/animal.jpeg" alt="logo" />
                            <Link to="/">Home</Link>
                            <Link to="/find-people">Find People</Link>
                            <ProfilePic first={first} last={last} image={image} toggleModal={this.toggleModal} />
                        </header>
                        <Route exact path="/">
                            <Profile
                                first={first}
                                last={last}
                                image={image}
                                bio={bio}
                                toggleModal={this.toggleModal}
                                updateBioFromApp={this.updateBioFromApp}
                            />
                        </Route>
                        <Route path="/find-people">
                            <FindPeople />
                        </Route>
                        <Route path="/friends">
                            <Friends />
                        </Route>
                        <Route path="/user/:id">
                            <OtherProfile />
                        </Route>
                        {uploaderIsVisible && (
                            <>
                                <Uploader updateImageUrl={this.updateImageUrl} toggleModal={this.toggleModal} />
                                <div className="white-out" />
                            </>
                        )}
                    </AppStyles>
                </BrowserRouter>
            </>
        );
    }
}
