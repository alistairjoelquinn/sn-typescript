import { ChangeEvent, Component } from 'react';
import axios from 'axios';

interface Props {
    bio: string;
    updateBioFromApp: (data: any) => void;
}

interface State {
    textareaVisible: boolean;
    draftBio: string;
}

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
            .post('/bio', { description: this.state.draftBio })
            .then(({ data }) => {
                this.props.updateBioFromApp(data);
                this.textareaToggle();
            })
            .catch(console.log);
    }

    render() {
        return (
            <div>
                <h1>BIO EDITOR</h1>
                {this.state.textareaVisible && (
                    <>
                        <textarea defaultValue={this.props.bio} onChange={(e) => this.updateBio(e)} />
                        <button type="button" onClick={() => this.submitHandler()}>
                            Save
                        </button>
                    </>
                )}
                {this.state.textareaVisible || (
                    <>
                        {this.props.bio ? (
                            <>
                                <div>{this.props.bio}</div>
                                <button type="button" onClick={() => this.textareaToggle()}>
                                    EDIT
                                </button>
                            </>
                        ) : (
                            <button type="button" onClick={() => this.textareaToggle()}>
                                add bio
                            </button>
                        )}
                    </>
                )}
            </div>
        );
    }
}
