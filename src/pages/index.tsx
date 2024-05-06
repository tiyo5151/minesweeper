import styles from './index.module.css';
import { useState } from 'react';

const Home = () => {
  const [samplePos, setsamplePos] = useState(0);
  // -1 ->石
  // 0 ->画像なしセル
  // 1~8 ->数字セル
  // 9 ->石+はてな
  // 10 ->石+旗
  // 11 ->ボムセル
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
  // 0 -> 未クリック
  // 1 ->左クリック
  // 2 ->はてな
  // 3 ->旗
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

  console.log(samplePos);

  const random = () => {
    for (let n = 0; n < 10; n++) {
      const rx = Math.floor(Math.random() * 9);
      const ry = Math.floor(Math.random() * 9);
      console.log(rx, ry);
    }
  };

  // random関数の呼び出し
  random();

  const clickHandler = (x: number, y: number) => {
    console.log(x, y);
  };
  return (
    <div className={styles.container}>
      <div className={styles.bombMap}>
        {bombMap.map((row, y) => (
          <div key={y} className={styles.row}>
            {row.map((cell, x) => (
              <div key={x} className={styles.cell} onClick={() => clickHandler(x, y)}>
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
