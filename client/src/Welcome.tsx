import styled from 'styled-components';
import Logo from './Logo';

import Registration from './Registration';
import GlobalStyles from './styles/GlobalStyles';
import Typography from './styles/Typography';

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
            display: flex;
            align-items: center;
            justify-content: center;
        }
        img {
            height: 20vh;
        }
    }
`;

export default function Welcome() {
    return (
        <>
            <GlobalStyles />
            <Typography />
            <WelcomePageStyles>
                <Logo />
                <Registration />
            </WelcomePageStyles>
        </>
    );
}
