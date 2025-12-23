import styled from 'styled-components';

import bgImage from '../../img/bg.png';

export const StyledTetrisWrapper = styled.div`
    width: 100vw;
    height: 100vh;
    background: url('${bgImage}') #000;
    background-size: cover;
    overflow-x: hidden;
    overflow-y: auto;
    touch-action: manipulation;
`
export const StyledTetris = styled.div`
    display: flex;
    align-items: flex-start;
    padding: 40px;
    margin: 0 auto;
    max-width: 900px;

    aside {
        width: 100%;
        max-width: 200px;
        display: block;
        padding: 0 20px;
    }

    @media (max-width: 900px) {
        flex-direction: column;
        align-items: center;
        padding: 20px;

        aside {
            max-width: none;
            width: 100%;
            padding: 10px 0 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 8px;
        }
    }
`;