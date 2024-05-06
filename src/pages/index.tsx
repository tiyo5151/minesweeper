import styles from './index.module.css';
import { useState } from 'react';

const directions = [
  [1, 0],
  [1, 1],
  [0, 1],
  [-1, 1],
  [-1, 0],
  [-1, -1],
  [0, -1],
  [1, -1],
];

const Home = () => {
  const [samplePos, setsamplePos] = useState(0);
  const [bombMap, setbombMap] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);
  const [userInputs, setuserInputs] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);
  const [a, setA] = useState(0); // aの初期化

  console.log(samplePos);

  const clickHandler = (x: number, y: number) => {
    console.log(x, y);
    const newbombMap = structuredClone(bombMap);

    if (a === 0) {
      for (let n = 0; n < 10; n++) {
        const rx = Math.floor(Math.random() * 9);
        const ry = Math.floor(Math.random() * 9);
        console.log(rx, ry);
        newbombMap[ry][rx] = 11;
      }
      setA(1); // aの更新
      console.log(`a:${a}`);
    }

    setbombMap(newbombMap);
  };

  return (
    <div className={styles.container}>
      <div className={styles.bombMap}>
        {bombMap.map((row, y) => (
          <div key={y} className={styles.row}>
            {row.map((cell, x) => (
              <div key={x} className={styles.cell} onClick={() => clickHandler(x, y)}>
                <div className={styles.cellContent}>{bombMap[y][x]}</div>
                <div
                  className={styles.sampleStyle}
                  style={{ backgroundPosition: `${-30 * samplePos}px 0px` }}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
      <button onClick={() => setsamplePos((p) => (p + 1) % 14)}>sample</button>
    </div>
  );
};

export default Home;
