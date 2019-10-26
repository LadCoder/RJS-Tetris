import styled from 'styled-components';

export const StyledPauseLabel = styled.div`
    position: absolute;
    top: 45%;
    margin: auto;
    vertical-align: middle;
    text-align: center;
    box-sizing: border-box;
    display: block;
    align-items: center;
    padding: 20px;
    border: 4px solid #333;
    min-height: 30px;
    width: 100%;
    max-width: 25vw;
    border-radius: 20px;
    color: ${props => (props.gameOver ? 'red' : '#999')};
    background: #000;
    font-family: Pixel, Arial, Helvetica, sans-serif;
    font-size: 0.8rem;
`