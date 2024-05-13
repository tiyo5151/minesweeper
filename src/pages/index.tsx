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
        newsamplepos[cy][cx] = 10;
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
            newsamplepos[y][x] = NumBer - 1;
          }
      }
    }
    setA(1); // aの更新
    console.log(`a:${a}`);
    setbombMap(newbombMap);
    setsamplePos(newsamplepos);
  };

  // const someNumber = (bombMap: number[][]) => {
  //   let newsamplePos = structuredClone(samplePos);
  //   const newbombMap = structuredClone(bombMap);
  //   for (let x = 0; x < 9; x++) {
  //     for (let y = 0; y < 9; y++) {
  //       if (bombMap[y][x] === 11) {
  //         newsamplePos === 10;
  //       }
  //       for (const [dx, dy] of directions) {
  //         let SomeNumber = 0;
  //         const nx = x + dx;
  //         const ny = y + dy;
  //         if (nx >= 0 && nx < 9 && ny >= 0 && ny < 9 && newbombMap[ny][nx] === 11) {
  //           SomeNumber++;
  //         }
  //         newsamplePos = SomeNumber - 1;
  //         console.log(newsamplePos);
  //       }
  //     }
  //     setsamplePos(newsamplePos);
  //   }
  // };

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
                      : { backgroundPosition: `${-30 * samplePos[y][x]}px 0px` }
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
