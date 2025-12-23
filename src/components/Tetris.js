import React from 'react';
import { useState, useRef, useCallback, useMemo } from 'react';
import ReactHowler from 'react-howler';

import bgMusic from '../sounds/tetris.mp3';
import { VolumeUp, VolumeOff} from '@material-ui/icons';
import { createStage, checkCollision } from '../gameHelpers';

// Styled Components
import { StyledTetris, StyledTetrisWrapper } from './styles/StyledTetris';

// Custom Hooks
import { useInterval } from '../hooks/useInterval';
import { usePlayer } from '../hooks/usePlayer';
import { useStage } from '../hooks/useStage';
import { useGameStatus } from '../hooks/useGameStatus';

// Components
import Stage from './Stage';
import Display from './Display';
import StartButton from './StartButton';
import TouchControls from './TouchControls';

const Tetris = () => {
    const [dropTime, setDropTime] = useState(null);
    const [gameOver, setGameOver] = useState(false);
    const [volume, setVolume] = useState(null);
    const [paused, setPaused] = useState(false);
    const touchStartRef = useRef(null);

    const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
    const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
    const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(rowsCleared);

    const movePlayer = dir => {
        if (!checkCollision(player, stage, {x: dir, y: 0}))        
            updatePlayerPos({x: dir, y: 0});
    }

    const normalDropTime = useMemo(() => 1000 / (level + 1) + 200, [level]);

    const startGame = () => {
        setStage(createStage());
        setLevel(0);
        setDropTime(1200);
        resetPlayer();
        setGameOver(false);
        setScore(0);
        setRows(0);
        setVolume(true);
        setPaused(false);
    }

    const drop = () => {
        // increase level when player has cleared 10 rows
        if (rows > (level + 1) * 10){
            setLevel(prev => {
                const next = prev + 1;
                // increase speed based on next level
                setDropTime(1000 / (next + 1) + 200);
                return next;
            });
        }
        if (!checkCollision(player, stage, {x: 0, y: 1})){
            updatePlayerPos({ x: 0 , y: 1, collided: false });
        }else{
            if (player.pos.y < 1) {
                console.log("GAME OVER!!!");
                setGameOver(true);
                setDropTime(null)
            }
            updatePlayerPos({ x: 0 , y: 0, collided: true });
        }       
    }

    const keyUp = ({ keyCode }) => {
        if(!gameOver){
            if(keyCode === 40) {
                setDropTime(normalDropTime);
            }
        }
    }

    const dropPlayer = () => {
        // soft drop speeds up fall instead of stopping gravity
        setDropTime(Math.max(50, normalDropTime / 4));
        drop();
    };

    const hardDrop = () => {
        // move piece down until collision, then mark collided
        let steps = 0;
        while (!checkCollision(player, stage, { x: 0, y: steps + 1 })) {
            steps += 1;
        }
        if (steps > 0) {
            updatePlayerPos({ x: 0, y: steps, collided: true });
        }
        setDropTime(normalDropTime);
    };
    
    const pauseGame = useCallback(() => {
        if(!paused){
            setDropTime(null);
            setVolume(false);
            setPaused(true);
        } else if(paused){
            setDropTime(normalDropTime);
            setVolume(true);
            setPaused(false);
        }
    }, [paused, normalDropTime]);

    const move = ({ keyCode }) => {
        if (!gameOver){
            if(keyCode === 37) {
                movePlayer(-1);
            }else if(keyCode === 39) {
                movePlayer(1);
            }else if(keyCode === 40) {
                dropPlayer();
            }else if(keyCode === 38) {
                playerRotate(stage, 1);
            }else if(keyCode === 32) {
                pauseGame(); 
            }
        }
    }

    const handleTouchStart = (e) => {
        const touch = e.touches[0];
        touchStartRef.current = { x: touch.clientX, y: touch.clientY, time: Date.now() };
    };

    const handleTouchMove = (e) => {
        if (!touchStartRef.current) return;
        // prevent browser pull-to-refresh / scroll when interacting with the stage
        e.preventDefault();
    };

    const handleTouchEnd = (e) => {
        if (!touchStartRef.current || gameOver) return;
        const touch = e.changedTouches[0];
        const dx = touch.clientX - touchStartRef.current.x;
        const dy = touch.clientY - touchStartRef.current.y;
        const dt = Date.now() - touchStartRef.current.time;
        const absDx = Math.abs(dx);
        const absDy = Math.abs(dy);
        const SWIPE_THRESHOLD = 30;
        const TAP_TIME = 200;
        const TAP_MOVE = 10;

        // tap -> rotate
        if (dt < TAP_TIME && absDx < TAP_MOVE && absDy < TAP_MOVE) {
            playerRotate(stage, 1);
            return;
        }

        // horizontal swipe -> move
        if (absDx > absDy && absDx > SWIPE_THRESHOLD) {
            movePlayer(dx > 0 ? 1 : -1);
            return;
        }

        // vertical swipe down -> hard drop
        if (absDy > absDx && dy > SWIPE_THRESHOLD) {
            hardDrop();
        }

        touchStartRef.current = null;
    };

    useInterval(() => {
        drop();
    }, dropTime);

    return (
        <StyledTetrisWrapper 
            role="button" 
            tabIndex="0" 
            onKeyDown={e => move(e)} 
            onKeyUp={keyUp}
        >
            <StyledTetris>
                <div
                    className="touch-layer"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    <Stage stage={stage} paused={paused}/>
                </div>
                <aside>
                    <ReactHowler
                        src={bgMusic}
                        playing={volume}
                        loop={true}
                    />
                    {gameOver && (
                        <Display gameOver={gameOver} text="Game Over" />
                    )}
                    <div className="hud-row">
                        <Display text={`Score: ${score}`} />
                        <Display text={`Rows: ${rows}`} />
                        <Display text={`Level: ${level}`} />
                        <Display text={volume ? <VolumeUp onClick={() =>{setVolume(!volume)} }/> : <VolumeOff onClick={() =>{setVolume(!volume)} }/> }/>    
                    </div>
                    <StartButton callback={startGame}/>
                    <TouchControls
                        onLeft={() => movePlayer(-1)}
                        onRight={() => movePlayer(1)}
                        onRotate={() => playerRotate(stage, 1)}
                        onDrop={hardDrop}
                        onPause={pauseGame}
                        disabled={gameOver}
                        paused={paused}
                    />
                </aside>
            </StyledTetris>
        </StyledTetrisWrapper>
    );
};

export default Tetris;