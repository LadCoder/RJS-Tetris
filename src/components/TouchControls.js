import React from 'react';
import { StyledTouchControls, ControlButtonRow, ControlButton } from './styles/StyledTouchControls';

const TouchControls = ({ onLeft, onRight, onRotate, onDrop, onPause, disabled, paused }) => (
    <StyledTouchControls>
        <ControlButtonRow>
            <ControlButton onClick={onLeft} disabled={disabled}>◀</ControlButton>
            <ControlButton onClick={onRotate} disabled={disabled}>⟳</ControlButton>
            <ControlButton onClick={onRight} disabled={disabled}>▶</ControlButton>
        </ControlButtonRow>
        <ControlButtonRow>
            <ControlButton onClick={onDrop} disabled={disabled}>Drop</ControlButton>
            <ControlButton onClick={onPause}>{paused ? 'Resume' : 'Pause'}</ControlButton>
        </ControlButtonRow>
    </StyledTouchControls>
);

export default TouchControls;

