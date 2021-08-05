import axios from 'axios';
import { Component } from 'react';
import styled from 'styled-components';

interface Props {
    updateImageUrl: (file: File) => void;
    toggleModal: () => void;
}

interface State {
    file: any;
    selected: boolean;
}

const UploaderStyles = styled.div`
    position: absolute;
    inset: 30vh 20vw;
    border: 6px solid antiquewhite;
    border-radius: 5rem;
    background-color: rgb(227, 81, 64);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    p {
        font-size: 4rem;
    }
    input {
        width: 0.1px;
        height: 0.1px;
        opacity: 0;
        overflow: hidden;
        position: absolute;
        z-index: -1;
    }
    div.button-container {
        width: 50%;
        display: flex;
        justify-content: space-evenly;
    }
    button {
        padding: 0.7rem;
        margin: 1rem;
        width: 10vw;
        border-radius: 1rem;
        background-color: antiquewhite;
        &:hover {
            background-color: #ffd49d;
            cursor: pointer;
        }
    }
    label {
        padding: 0.7rem;
        width: 60%;
        border: 2px solid black;
        font-size: 3rem;
        border-radius: 1rem;
        background-color: antiquewhite;
        &:hover {
            background-color: #ffd49d;
            cursor: pointer;
        }
    }
`;

export default class Uploader extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            file: null,
            selected: false,
        };
        this.sendImageclickHandler = this.sendImageclickHandler.bind(this);
    }

    fileSelected(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            file: e.target.files[0],
            selected: true,
        });
    }

    sendImageclickHandler() {
        const fd = new FormData();
        fd.append('image', this.state.file);
        axios
            .post('/user/upload', fd)
            .then((res) => this.props.updateImageUrl(res.data.image))
            .catch((err) => {
                console.log('error was caught at upload return: ', err);
            });
    }

    render() {
        const { selected } = this.state;
        return (
            <UploaderStyles>
                <p>Choose a new profile pic...</p>
                <label htmlFor="file">
                    Select a file
                    <input id="file" type="file" name="file" accept="image/*" onChange={(e) => this.fileSelected(e)} />
                </label>
                <div className="button-container">
                    <button type="button" onClick={this.sendImageclickHandler}>
                        Upload
                    </button>
                    <button type="button" onClick={this.props.toggleModal}>
                        Exit
                    </button>
                </div>
                {selected ? <p>Image Selected</p> : <p>No Image Selected</p>}
            </UploaderStyles>
        );
    }
}
