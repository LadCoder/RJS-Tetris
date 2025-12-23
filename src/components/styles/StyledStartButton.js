import styled from 'styled-components';

export const StyledStartButton = styled.button`
    box-sizing: border-box;
    margin: 0 0 16px 0;
    padding: 18px;
    min-height: 30px;
    width: 100%;
    border-radius: 20px;
    border: none;
    color: white;
    background: #333;
    font-family: Pixel, Arial, Helvetica, sans-serif;
    font-size: 1rem;
    outline: none;
    cursor: pointer;

    @media (max-width: 900px) {
        margin: 0 0 8px 0;
        padding: 14px;
        border-radius: 14px;
    }
`;

