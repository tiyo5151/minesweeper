import React from 'react';
import styles from './index.module.css';
import useGame from '../hook/useGame';
import TopArea from '../component/TopArea';
import Board from '../component/Board';

const Home: React.FC = () => {
  const {
    element,
    save,
    setsave,
    userInputs,
    bombMap,
    time,
    face,
    changeboard,
    reset,
    Rclick,
    flagnumber,
    clickHandler,
  } = useGame();

  return (
    <div className={styles.container}>
      <TopArea changeboard={changeboard} setsave={setsave} save={save} />
      <Board
        element={element}
        flagnumber={flagnumber}
        reset={reset}
        face={face}
        time={time}
        bombMap={bombMap}
        clickHandler={clickHandler}
        Rclick={Rclick}
        userInputs={userInputs}
      />
    </div>
  );
};

export default Home;
