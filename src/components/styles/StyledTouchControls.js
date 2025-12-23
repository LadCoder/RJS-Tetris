import styled from 'styled-components';

export const StyledTouchControls = styled.div`
    display: none;
    margin-top: 12px;
    user-select: none;

    @media (max-width: 900px) {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
`;

export const ControlButtonRow = styled.div`
    display: flex;
    gap: 8px;
    justify-content: center;
`;

export const ControlButton = styled.button`
    flex: 1;
    padding: 12px 10px;
    font-size: 16px;
    font-family: 'Pixel', Arial, sans-serif;
    background: #333;
    color: #fff;
    border: 2px solid #999;
    border-radius: 6px;
    text-transform: uppercase;
    letter-spacing: 1px;

    &:active {
        transform: translateY(1px);
    }

    &:disabled {
        opacity: 0.5;
    }
`;

