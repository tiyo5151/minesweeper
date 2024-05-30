import styles from './index.module.css';
import { useState, useEffect, useCallback } from 'react';

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
  const [element, setelement] = useState({ height: 9, width: 9, numbomb: 10 });
  // const [width, setwidth] = useState(9);
  // const [numbomb, setnumbomb] = useState(10);
  const [save, setsave] = useState([9, 9, 10]);
  const [userInputs, setuserInputs] = useState(Array.from({ length: 9 }, () => Array(9).fill(-1)));
  const [bombMap, setbombMap] = useState(Array.from({ length: 9 }, () => Array(9).fill(0)));
  const [time, settime] = useState(0);
  const [start, setstart] = useState(false);
  const [face, setface] = useState(0);
  const [clickedBomb, setClickedBomb] = useState<{ x: number; y: number } | null>(null);
  const [Result, setResult] = useState<number[][]>([]);

  console.log(Result);

  useEffect(() => {
    let interval: number | undefined;
    if (start) {
      interval = window.setInterval(() => {
        settime((time) => time + 1);
      }, 1000);
    } else if (!start && time !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [start, time]);

  const changeboard = (height: number, width: number, numbomb: number) => {
    setClickedBomb(null);
    setface(0);
    setstart(false);
    settime(0);
    setbombMap(Array.from({ length: height }, () => Array(width).fill(0)));
    setuserInputs(Array.from({ length: height }, () => Array(width).fill(-1)));
    setelement({ height, width, numbomb });
    // setheight(height);
    // setwidth(width);
    // setnumbomb(numbomb);
    setResult([]);
  };

  const spread = useCallback(
    (x: number, y: number, bombMap: number[][], userInputs: number[][]) => {
      const newbombMap = structuredClone(bombMap);
      const newuserInputs = structuredClone(userInputs);

      const recursiveSpread = (x: number, y: number) => {
        if (newbombMap[y][x] === 0) {
          newuserInputs[y][x] = 0;
          for (const [dx, dy] of directions) {
            const nx = x + dx;
            const ny = y + dy;
            if (
              nx >= 0 &&
              nx < element.width &&
              ny >= 0 &&
              ny < element.height &&
              newuserInputs[ny][nx] === -1
            ) {
              recursiveSpread(nx, ny);
            }
          }
        } else if (newbombMap[y][x] !== 11) {
          newuserInputs[y][x] = 0;
        }
      };

      recursiveSpread(x, y);

      if (newbombMap[y][x] === 11) {
        setface(2);
        for (let i = 0; i < element.height; i++) {
          for (let j = 0; j < element.width; j++) {
            if (newbombMap[i][j] === 11) {
              newuserInputs[i][j] = 0;
            }
          }
        }
        setClickedBomb({ x, y });
        setstart(false);
      }

      return newuserInputs;
    },
    [element.width, element.height],
  );

  const clear = (userInputs: number[][], bombMap: number[][]) => {
    let count2 = 0;
    for (let x = 0; x < element.width; x++) {
      for (let y = 0; y < element.height; y++) {
        userInputs[y][x] === 0 && bombMap[y][x] !== 11 ? count2++ : undefined;
      }
    }
    if (count2 === element.height * element.width - element.numbomb) {
      setface(1);
      setstart(false);
      for (let i = 0; i < element.height; i++) {
        for (let j = 0; j < element.width; j++) {
          if (bombMap[i][j] === 11) {
            userInputs[i][j] = -2;
          }
        }
      }
      setuserInputs(userInputs);
    }
    console.log(`count${count2}`);
  };

  const reset = () => {
    settime(0);
    setstart(false);
    setface(0);
    setClickedBomb(null);
    const newUserInputs = Array.from({ length: element.height }, () =>
      Array(element.width).fill(-1),
    );
    const newBombMap = Array.from({ length: element.height }, () => Array(element.width).fill(0));
    setuserInputs(newUserInputs);
    setbombMap(newBombMap);
    setResult([]);
    console.log(`userInputs:`, newUserInputs);
    console.log(`bombMap:`, newBombMap);
  };

  const Rclick = (x: number, y: number, event: React.MouseEvent<HTMLDivElement>) => {
    const newuserInputs = structuredClone(userInputs);
    event.preventDefault();
    if (face === 1 || face === 2) {
      return;
    }
    if (x >= 0 && x < element.width && y >= 0 && y < element.height) {
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
      count += row.filter((cell) => cell === -2).length;
    }
    return count;
  };

  const flagnumber = element.numbomb - countflag();

  const clickHandler = (x: number, y: number) => {
    console.log(x, y);
    const newbombMap = structuredClone(bombMap);
    const newuserInputs = structuredClone(userInputs);

    if (newuserInputs[y][x] === -2 || face === 1 || face === 2) {
      return;
    }
    if (!start) {
      const cells = [];
      for (let cx = 0; cx < element.width; cx++) {
        for (let cy = 0; cy < element.height; cy++) {
          cells.push([cx, cy]);
        }
      }
      for (let i = cells.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cells[i], cells[j]] = [cells[j], cells[i]];
      }
      const filteredCells = cells.filter(([cx, cy]) => !(cx === x && cy === y));
      for (let i = 0; i < element.numbomb; i++) {
        const [dx, dy] = filteredCells[i];
        newbombMap[dy][dx] = 11;
      }
      for (let cx = 0; cx < element.width; cx++) {
        for (let cy = 0; cy < element.height; cy++) {
          if (newbombMap[cy][cx] !== 11) {
            let number = 0;
            for (const [dx, dy] of directions) {
              const nx = cx + dx;
              const ny = cy + dy;
              if (
                nx >= 0 &&
                nx < element.width &&
                ny >= 0 &&
                ny < element.height &&
                newbombMap[ny][nx] === 11
              ) {
                number++;
              }
            }
            newbombMap[cy][cx] = number;
          }
        }
      }
      setstart(true);
      setbombMap(newbombMap);
    }

    const newNewSampleBoard = spread(x, y, newbombMap, newuserInputs);
    newNewSampleBoard[y][x] = 0;
    setuserInputs(newNewSampleBoard);
    clear(newNewSampleBoard, newbombMap);
  };

  return (
    <div className={styles.container}>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <button
          onClick={() => {
            changeboard(9, 9, 10);
            setsave([9, 9, 10]);
          }}
        >
          <b>初級</b>
        </button>
        <button
          onClick={() => {
            changeboard(16, 16, 40);
            setsave([16, 16, 40]);
          }}
        >
          <b>中級</b>
        </button>
        <button
          onClick={() => {
            changeboard(16, 30, 99);
            setsave([16, 30, 99]);
          }}
        >
          <b>上級</b>
        </button>
        <button
          onClick={() => {
            changeboard(save[0], save[1], save[2]);
          }}
        >
          <b>カスタム(更新)</b>
        </button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
        <div style={{ marginRight: '50px', color: 'white' }}>
          <p>縦</p>
        </div>
        <div style={{ marginRight: '50px', color: 'white' }}>
          <p>横</p>
        </div>
        <div style={{ color: 'white' }}>
          <p>爆弾</p>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <input
          type="number"
          required
          min="1"
          max="100"
          value={save[0]}
          onChange={(event) => setsave([event.target.valueAsNumber, save[1], save[2]])}
        />
        <input
          type="number"
          required
          min="1"
          max="100"
          value={save[1]}
          onChange={(event) => setsave([save[0], event.target.valueAsNumber, save[2]])}
        />
        <input
          type="number"
          required
          min="1"
          max="99"
          value={save[2]}
          onChange={(event) => setsave([save[0], save[1], event.target.valueAsNumber])}
        />
      </div>
      <div
        className={styles.board}
        style={{
          width: element.width > 8 ? `${40 * element.width + 40 + 12}px` : `${40 * 9 + 40 + 12}px`,
          height: 40 * element.height + 120 + 12,
        }}
      >
        <div
          className={styles.imformationboard}
          style={{ width: element.width > 8 ? `${40 * element.width}px` : `${40 * 9}px` }}
        >
          <div className={styles.countbase}>{flagnumber}</div>
          <button onClick={() => reset()}>
            <div
              className={styles.sampleStyle}
              style={{ backgroundPosition: `${-30 * (11 + face)}px 0px` }}
            />
          </button>
          <div className={styles.countbase}>{time}</div>
        </div>
        <div
          className={styles.bombMap}
          style={{ width: 32 * element.width + 12, height: 32 * element.height + 12 }}
        >
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
                            : { backgroundPosition: `${-30 * 7.2}px 0px` }
                    }
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
