import React from 'react';
import {StyledStage} from './styles/StyledStage';
import PausedLabel from './PausedLabel';

import Cell from './Cell';

const Stage = ({ stage, paused }) => (
    <StyledStage width={stage[0].length} height={stage.length}>
        { stage.map(row => row.map((cell, x) => 
            <Cell key={x} type={cell[0]} />
        ))}    
        { paused && <PausedLabel />}
    </StyledStage>
);

export default Stage;