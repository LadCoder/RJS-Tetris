import styled from 'styled-components';

import bgImage from '../../img/bg.png';

export const StyledTetrisWrapper = styled.div`
    width: 100vw;
    height: 100vh;
    background: url('${bgImage}') #000;
    background-size: cover;
    overflow: hidden;
    touch-action: manipulation;
    overscroll-behavior: contain;
`
export const StyledTetris = styled.div`
    display: flex;
    align-items: flex-start;
    padding: 32px;
    margin: 0 auto;
    max-width: 900px;

    aside {
        width: 100%;
        max-width: 200px;
        display: block;
        padding: 0 16px;
    }

    .hud-row {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
    }

    .hud-row > * {
        flex: 1 1 45%;
        width: auto;
        margin: 0;
    }

    .touch-layer {
        touch-action: none;
    }

    @media (max-width: 900px) {
        flex-direction: column;
        align-items: stretch;
        padding: 16px;

        aside {
            max-width: none;
            width: 100%;
            padding: 8px 0 0;
            display: grid;
            grid-template-columns: 1fr;
            gap: 8px;
        }

        .hud-row {
            gap: 6px;
            flex-wrap: wrap;
        }

        .hud-row > * {
            flex: 1 1 48%;
        }
    }
`;