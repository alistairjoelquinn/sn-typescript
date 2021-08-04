import styled from 'styled-components';

export const FormStyles = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    h4,
    h5 {
        color: antiquewhite;
    }
    input {
        padding: 0.7rem;
        margin: 0.5rem;
        width: 25vw;
        background-color: antiquewhite;
        border-radius: 1rem;
    }
    span {
        color: antiquewhite;
        margin-top: 0.3rem;
        a {
            color: rgb(243, 140, 128);
            &:hover {
                color: rgb(227, 81, 64);
            }
        }
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
