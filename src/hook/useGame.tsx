import { useState, useEffect, useMemo } from 'react';

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

const useGame = () => {
  const [element, setelement] = useState({ height: 9, width: 9, numbomb: 10 });
  const [save, setsave] = useState([9, 9, 10]);
  const [userInputs, setuserInputs] = useState(Array.from({ length: 9 }, () => Array(9).fill(-1)));
  const [bombMap, setbombMap] = useState(Array.from({ length: 9 }, () => Array(9).fill(0)));
  const [time, settime] = useState(0);
  const [start, setstart] = useState(0);

  const face = useMemo(() => {
    if (start === 1) {
      return 0;
    } else {
      for (let i = 0; i < element.height; i++) {
        for (let j = 0; j < element.width; j++) {
          if (userInputs[i][j] === -3) {
            return 2;
          }
        }
      }
      let cells0 = 0;
      for (let x = 0; x < element.width; x++) {
        for (let y = 0; y < element.height; y++) {
          if (userInputs[y][x] === 0 && bombMap[y][x] !== 11) {
            cells0++;
          }
        }
      }
      if (cells0 === element.height * element.width - element.numbomb) {
        return 1;
      }
      return 0;
    }
  }, [start, userInputs, bombMap, element]);

  useEffect(() => {
    let interval: number | undefined;
    if (start === 1) {
      interval = window.setInterval(() => {
        settime((time) => time + 1);
      }, 1000);
    } else if (!start && time !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [start, time]);

  const changeboard = (height: number, width: number, numbomb: number) => {
    setstart(0);
    settime(0);
    setbombMap(Array.from({ length: height }, () => Array(width).fill(0)));
    setuserInputs(Array.from({ length: height }, () => Array(width).fill(-1)));
    setelement({ height, width, numbomb });
  };

  const spread = (x: number, y: number, bombMap: number[][], userInputs: number[][]) => {
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
            newuserInputs[ny][nx] !== 0
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
      // setface(2);

      for (let i = 0; i < element.height; i++) {
        for (let j = 0; j < element.width; j++) {
          if (newbombMap[i][j] === 11) {
            newuserInputs[i][j] = 0;
          }
        }
      }
      newuserInputs[y][x] = -3;
      setstart(0);
    }
    return newuserInputs;
  };

  const clear = (userInputs: number[][], bombMap: number[][]) => {
    let count2 = 0;
    for (let x = 0; x < element.width; x++) {
      for (let y = 0; y < element.height; y++) {
        userInputs[y][x] === 0 && bombMap[y][x] !== 11 ? count2++ : undefined;
      }
    }
    if (count2 === element.height * element.width - element.numbomb) {
      // setface(1);
      setstart(0);
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
    setstart(0);
    // setface(0);
    const newUserInputs = Array.from({ length: element.height }, () =>
      Array(element.width).fill(-1),
    );
    const newBombMap = Array.from({ length: element.height }, () => Array(element.width).fill(0));
    setuserInputs(newUserInputs);
    setbombMap(newBombMap);
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
    if (start === 0) {
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
      setstart(1);
      setbombMap(newbombMap);
    }

    const newNewSampleBoard = spread(x, y, newbombMap, newuserInputs);
    setuserInputs(newNewSampleBoard);
    clear(newNewSampleBoard, newbombMap);
    console.log(newNewSampleBoard);
  };

  return {
    element,
    save,
    setsave,
    userInputs,
    bombMap,
    time,
    start,
    face,
    changeboard,
    spread,
    clear,
    reset,
    Rclick,
    flagnumber,
    clickHandler,
  };
};

export default useGame;
