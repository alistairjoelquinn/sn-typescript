import { ChangeEvent, Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';

interface Props {
    bio: string;
    updateBioFromApp: (data: any) => void;
}

interface State {
    textareaVisible: boolean;
    draftBio: string;
}

const BioEditorStyles = styled.div`
    position: relative;
    div {
        textarea {
            width: 100%;
            height: 80%;
            background-color: antiquewhite;
        }
    }
    button {
        position: absolute;
        bottom: 0;
        right: 0;
        padding: 0.3rem;
        min-width: 5rem;
        border-radius: 0.7rem;
        background-color: rgb(243, 140, 128);
        &:hover {
            background-color: rgb(227, 81, 64);
        }
    }
`;

export default class BioEditor extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            textareaVisible: false,
            draftBio: '',
        };
    }

    textareaToggle() {
        this.setState({
            textareaVisible: !this.state.textareaVisible,
        });
    }

    updateBio(e: ChangeEvent<HTMLTextAreaElement>) {
        this.setState({
            draftBio: e.target.value,
        });
    }

    submitHandler() {
        axios
            .post('/user/set-bio', { bio: this.state.draftBio })
            .then(({ data }) => {
                this.props.updateBioFromApp(data.bio);
                this.textareaToggle();
            })
            .catch(console.log);
    }

    render() {
        return (
            <BioEditorStyles>
                {this.state.textareaVisible && (
                    <div>
                        <textarea rows={5} defaultValue={this.props.bio} onChange={(e) => this.updateBio(e)} />
                        <button type="button" onClick={() => this.submitHandler()}>
                            Save
                        </button>
                    </div>
                )}
                {this.state.textareaVisible || (
                    <>
                        {this.props.bio ? (
                            <div>
                                <div>{this.props.bio}</div>
                                <button type="button" onClick={() => this.textareaToggle()}>
                                    EDIT
                                </button>
                            </div>
                        ) : (
                            <button type="button" onClick={() => this.textareaToggle()}>
                                add bio
                            </button>
                        )}
                    </>
                )}
            </BioEditorStyles>
        );
    }
}
