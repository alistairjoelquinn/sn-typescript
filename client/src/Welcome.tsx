import styled from 'styled-components';

import Registration from './Registration';

const WelcomePageStyles = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .heading-container {
        display: flex;
        h1 {
            font-size: 70px;
        }
        img {
            height: 20vh;
        }
    }
`;

export default function Welcome() {
    console.log('hello d');
    return (
        <>
            <WelcomePageStyles>
                <div className="heading-container">
                    <h1>Social</h1>
                    <img src="/logo.gif" alt="logo" />
                    <h1>Network</h1>
                </div>
                <Registration />
            </WelcomePageStyles>
        </>
    );
}