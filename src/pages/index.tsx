import styles from './index.module.css';
import { useState, useEffect } from 'react';

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
  const [height, setheight] = useState(9);

  const [width, setwidth] = useState(9);

  const [numbomb, setnumbomb] = useState(10);

  const [a, setA] = useState(0);

  const [userInputs, setuserInputs] = useState(
    Array.from({ length: height }, () => Array(width).fill(-1)),
  );
  // -3:rock+question
  // -2:rock+flag
  // -1:rock
  // 0:none

  const [bombMap, setbombMap] = useState(
    Array.from({ length: height }, () => Array(width).fill(-1)),
  );
  // 0:none
  // 1~8:number
  // 11:bomb

  const [time, settime] = useState(0);

  const [start, setstart] = useState(false);

  const Result: number[][] = [];

  // console.log(userInputs);

  const [face, setface] = useState(0);

  const [clickedBomb, setClickedBomb] = useState<{ x: number; y: number } | null>(null);

  console.log(face);

  useEffect(() => {
    let interval: number | undefined;

    if (start) {
      interval = window.setInterval(() => {
        settime(time + 1);
      }, 1000);
    } else if (!start && time !== 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [start, time]);

  console.log(time);

  const rate1 = height;
  const rate2 = width;
  const rate3 = numbomb;

  const changeboard = (height: number, width: number, numbomb: number) => {
    setClickedBomb(null);
    setface(0);
    setstart(false);
    settime(0);
    setA(0);
    setbombMap(Array.from({ length: height }, () => Array(width).fill(0)));
    setuserInputs(Array.from({ length: height }, () => Array(width).fill(-1)));
    setheight(height);
    setwidth(width);
    setnumbomb(numbomb);
  };

  const spread = (x: number, y: number, bombMap: number[][], samplepos: number[][]) => {
    const newbombMap = structuredClone(bombMap);
    const newsamplepos = structuredClone(samplepos);
    console.log(newbombMap);
    console.log('spread 関数が呼び出されました。入力:', x, y);

    if (newbombMap[y][x] === 0) {
      console.log('反応！');

      if (x >= 0 && x < width && y >= 0 && y < height) {
        if (newbombMap[y][x] === 0) {
          spreadtospread(x, y, bombMap, userInputs);
          newsamplepos[y][x] = 0;
        }
      } else if (newbombMap[y][x] !== 11) {
        newsamplepos[y][x] = 0;
      }
    }
    for (let i = 0; i < Result.length; i++) {
      const [by, bx] = Result[i];
      newsamplepos[by][bx] = 0;
      for (const [dx, dy] of directions) {
        const cx = bx + dx;
        const cy = by + dy;
        if (cx >= 0 && cx < width && cy >= 0 && cy < height) {
          newsamplepos[cy][cx] = 0;
        }
      }
    }
    if (newbombMap[y][x] === 11) {
      setface(2);
      for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
          if (newbombMap[i][j] === 11) {
            newsamplepos[i][j] = 0;
          }
        }
      }
      setClickedBomb({ x, y });
      setstart(false);
    }
    // setuserInputs(newsamplepos)
    return newsamplepos;
    // console.log(newsamplepos);
  };

  const spreadtospread = (x: number, y: number, bombMap: number[][], samplepos: number[][]) => {
    const newbombMap = structuredClone(bombMap);
    const newsamplepos = structuredClone(samplepos);
    const temporaryResult = [];
    for (const [dx, dy] of directions) {
      const rx = x + dx;
      const ry = y + dy;
      console.log('rx,ry:', rx, ry);
      if (rx >= 0 && rx < width && ry >= 0 && ry < height) {
        if (newbombMap[ry][rx] === 0 && !Result.some(([i, j]) => i === ry && j === rx)) {
          temporaryResult.push([rx, ry]);
          // console.log(temporaryResult);
          Result.push([ry, rx]);
          spread(rx, ry, newbombMap, newsamplepos);
        }
      } else {
        continue;
      }
    }
    console.log(Result);
  };

  const reset = () => {
    setA(0);
    settime(0);
    setstart(false);
    setface(0);
    setClickedBomb(null);

    const newUserInputs = Array.from({ length: height }, () => Array(width).fill(-1));
    const newBombMap = Array.from({ length: height }, () => Array(width).fill(0));

    setuserInputs(newUserInputs);
    setbombMap(newBombMap);

    console.log(`userInputs:`, newUserInputs);
    console.log(`bombMap:`, newBombMap);
  };
  const Rclick = (x: number, y: number, event: React.MouseEvent<HTMLDivElement>) => {
    // const newbombmap = structuredClone(bombMap)
    const newuserInputs = structuredClone(userInputs);
    event.preventDefault();
    if (face === 1 || face === 2) {
      return;
    }
    if (x >= 0 && x < width && y >= 0 && y < height) {
      if (newuserInputs[y][x] === -1) {
        newuserInputs[y][x] = -2;
      } else if (newuserInputs[y][x] === -2) {
        newuserInputs[y][x] = -1;
      }
    }
    setuserInputs(newuserInputs);
  };

  const countflag = () => {
    let count = 0;
    for (const row of userInputs) {
      count += row.filter((userInputs) => userInputs === -2).length;
    }
    return count;
  };

  const flagnumber = numbomb - countflag();

  const clear = (bombmap: number[][], userInputs: number[][]) => {
    let count2 = 1;
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        userInputs[y][x] === 0 && bombMap[y][x] !== 11 ? count2++ : undefined;
      }
    }
    if (count2 === width * height - numbomb) {
      setface(1);
      setstart(false);
    }
    console.log(`count${count2}`);
  };

  const clickHandler = (x: number, y: number) => {
    console.log(x, y);
    const newbombMap = structuredClone(bombMap);
    const newuserInputs = structuredClone(userInputs);

    if (newuserInputs[y][x] === -2 || face === 1 || face === 2) {
      return;
    }
    if (a === 0) {
      const cells = [];

      for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
          cells.push([x, y]);
        }
      }

      // console.log(cells);

      for (let i = cells.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cells[i], cells[j]] = [cells[j], cells[i]];
      }
      // console.log(cells);

      const filteredCells = cells.filter(([cx, cy]) => !(cx === x && cy === y));
      // console.log(filteredCells);
      for (let i = 0; i < numbomb; i++) {
        const [dx, dy] = filteredCells[i];
        newbombMap[dy][dx] = 11;
      }
      for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++)
          if (newbombMap[y][x] !== 11) {
            let NumBer = 0;
            for (const [dx, dy] of directions) {
              const nx = x + dx;
              const ny = y + dy;
              if (nx >= 0 && nx < width && ny >= 0 && ny < height && newbombMap[ny][nx] === 11) {
                NumBer++;
              }
            }
            newbombMap[y][x] = NumBer;
          }
      }
      setstart(true);
      setbombMap(newbombMap);
    }
    const newNewSampleBoard = spread(x, y, newbombMap, newuserInputs);
    newNewSampleBoard[y][x] = 0;
    clear(newNewSampleBoard, newuserInputs);
    setuserInputs(newNewSampleBoard);
    setA(1); // aの更新
    // console.log(`a:${a}`);
    console.log(newbombMap);
  };

  return (
    <div className={styles.container}>
      <div className={styles.buttonContainer}>
        <button className={styles.button} onClick={() => changeboard(9, 9, 10)}>
          <b>初級</b>
        </button>
        <button className={styles.button} onClick={() => changeboard(16, 16, 40)}>
          <b>中級</b>
        </button>
        <button className={styles.button} onClick={() => changeboard(16, 30, 99)}>
          <b>上級</b>
        </button>
        <button className={styles.button} onClick={() => changeboard(rate1, rate2, rate3)}>
          <b>カスタム</b>
        </button>
      </div>
      <div className={styles.customContainer}>
        <input
          type="number"
          required
          min="1"
          max="100"
          value={height}
          onChange={(event) => setheight(event.target.valueAsNumber)}
        />
        <input
          type="number"
          required
          min="1"
          max="100"
          value={width}
          onChange={(event) => setwidth(event.target.valueAsNumber)}
        />
        <input
          type="number"
          required
          min="1"
          max="100"
          value={numbomb}
          onChange={(event) => setnumbomb(event.target.valueAsNumber)}
        />
      </div>
      <div className={styles.overbombMap1} style={{ width: `${40 * width}px` }}>
        <div className={styles.threebase}>
          <div className={styles.countbase}>{flagnumber}</div>
        </div>
        <div className={styles.threebase}>
          <button
            className={styles.sampleStyle}
            style={{ backgroundPosition: `${-30 * (11 + face)}px 0px` }}
            onClick={() => reset()}
          />
        </div>
        <div className={styles.threebase}>
          <div className={styles.countbase}>{time}</div>
        </div>
      </div>
      <div className={styles.bombMap}>
        {bombMap.map((row, y) => (
          <div key={y} className={styles.row}>
            {row.map((cell, x) => (
              <div
                key={x}
                className={styles.cell}
                onClick={() => clickHandler(x, y)}
                onContextMenu={(event) => Rclick(x, y, event)}
              >
                <div
                  className={
                    clickedBomb && clickedBomb.x === x && clickedBomb.y === y
                      ? styles.redbomb
                      : userInputs[y][x] === -1
                        ? styles.rock
                        : userInputs[y][x] === 0
                          ? styles.sampleStyle
                          : styles.fusion
                  }
                  style={
                    clickedBomb && clickedBomb.x === x && clickedBomb.y === y
                      ? { backgroundPosition: `${-30 * 10}px 0px ` }
                      : userInputs[y][x] === -1
                        ? undefined
                        : userInputs[y][x] === 0
                          ? { backgroundPosition: `${-30 * (bombMap[y][x] - 1)}px 0px` }
                          : { backgroundPosition: `${-30 * 9}px 0px` }
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
