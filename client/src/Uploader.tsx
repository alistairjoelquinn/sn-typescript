import { Component } from 'react';

interface Props {
    sendImage: (file: File) => void;
    toggleModal: () => void;
}

interface State {
    file: File;
    selected: boolean;
}

export interface File {
    lastModified?: number;
    lastModifiedDate?: Date;
    name?: string;
    size?: number;
    type?: string;
}

export default class Uploader extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            file: null,
            selected: false,
        };
        this.clickHandler = this.clickHandler.bind(this);
    }

    fileSelected(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState(
            {
                file: e.target.files[0],
                selected: true,
            },
            () => console.log(this.state),
        );
    }

    clickHandler() {
        this.props.sendImage(this.state.file);
    }

    render() {
        return (
            <div>
                <p>Choose a new profile pic...</p>
                <label htmlFor="browse">
                    Choose a file
                    <input
                        id="browse"
                        type="file"
                        name="file"
                        accept="image/*"
                        onChange={(e) => this.fileSelected(e)}
                    />
                </label>
                <button type="button" onClick={this.clickHandler}>
                    Upload
                </button>
                <button type="button" onClick={this.props.toggleModal}>
                    Exit
                </button>
            </div>
        );
    }
}
