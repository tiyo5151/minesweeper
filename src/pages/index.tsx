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
  // const Board = [
  // [-1, 0, 0, 0, 0, 0, 0, 0, 0],
  // [0, 0, 0, 0, 0, 0, 0, 0, 0],
  // [0, 0, 0, 0, 0, 0, 0, 0, 0],
  // [0, 0, 0, 0, 0, 0, 0, 0, 0],
  // [0, 0, 0, 0, 0, 0, 0, 0, 0],
  // [0, 0, 0, 0, 0, 0, 0, 0, 0],
  // [0, 0, 0, 0, 0, 0, 0, 0, 0],
  // [0, 0, 0, 0, 0, 0, 0, 0, 0],
  // [0, 0, 0, 0, 0, 0, 0, 0, 0],
  // ];
  const [samplePos, setsamplePos] = useState([
    //useState[Board]で簡素化するコード調整必要
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
  ]);

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

  const [a, setA] = useState(0);

  console.log(samplePos);

  function spread(x: number, y: number) {
    const newbombMap = structuredClone(bombMap);
    const newsamplepos = structuredClone(samplePos);

    for (const [dx, dy] of directions) {
      const rx = x + dx;
      const ry = y + dy;
      if (rx >= 0 && rx < 9 && ry >= 0 && ry < 9) {
        if (newbombMap[ry][rx] === 0) {
          newsamplepos[ry][rx] = 0;
        } else if (newbombMap[ry][rx] === 11) {
          newsamplepos[ry][rx] === -1;
        } else if (newbombMap[ry][rx] >= 1 && newbombMap[ry][rx] <= 8) {
          newsamplepos[ry][rx] = 0;
        }
      }
    }
    return newsamplepos;
  }

  const clickHandler = (x: number, y: number) => {
    console.log(x, y);
    const newbombMap = structuredClone(bombMap);
    const newsamplepos = structuredClone(samplePos);

    if (a === 0) {
      const cells = [];

      for (let x = 0; x < 9; x++) {
        for (let y = 0; y < 9; y++) {
          cells.push([x, y]);
        }
      }

      console.log(cells);

      for (let i = cells.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cells[i], cells[j]] = [cells[j], cells[i]];
      }
      console.log(cells);

      const filteredCells = cells.filter(([cx, cy]) => !(cx === x && cy === y));
      console.log(filteredCells);
      for (let i = 0; i < 10; i++) {
        const [cx, cy] = filteredCells[i];
        newbombMap[cy][cx] = 11;
        // newsamplepos[cy][cx] = 10;
      }
      for (let x = 0; x < 9; x++) {
        for (let y = 0; y < 9; y++)
          if (newbombMap[y][x] !== 11) {
            let NumBer = 0;
            for (const [dx, dy] of directions) {
              const nx = x + dx;
              const ny = y + dy;
              if (nx >= 0 && nx < 9 && ny >= 0 && ny < 9 && newbombMap[ny][nx] === 11) {
                NumBer++;
              }
            }
            newbombMap[y][x] = NumBer;
            // newsamplepos[y][x] = NumBer - 1;
          }
      }
      newsamplepos[y][x] = 0;
      spread(x, y);
    }
    newsamplepos[y][x] = 0;
    setA(1); // aの更新
    console.log(`a:${a}`);
    console.log(newbombMap);
    setbombMap(newbombMap);
    setsamplePos(newsamplepos);
  };
  return (
    <div className={styles.container}>
      <div className={styles.bombMap}>
        {bombMap.map((row, y) => (
          <div key={y} className={styles.row}>
            {row.map((cell, x) => (
              <div key={x} className={styles.cell} onClick={() => clickHandler(x, y)}>
                <div
                  className={samplePos[y][x] === -1 ? styles.rock : styles.sampleStyle}
                  style={
                    samplePos[y][x] === -1
                      ? undefined
                      : { backgroundPosition: `${-30 * (bombMap[y][x] - 1)}px 0px` }
                  }
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

{
  /* <button onClick={() => setsamplePos((p) => (p + 1) % 14)}>sample</button> */
}
