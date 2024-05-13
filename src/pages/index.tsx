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

  // function spread(x: number, y: number) {
  //   const newbombMap = structuredClone(bombMap);
  //   const newsamplepos = structuredClone(samplePos);
  //   console.log('spread 関数が呼び出されました。入力:', x, y);
  // for (const [dx, dy] of directions) {
  //   const rx = x + dx;
  //   const ry = y + dy;
  //   if (rx >= 0 && rx < 9 && ry >= 0 && ry < 9) {
  //     if (newbombMap[ry][rx] === 0) {
  //       newsamplepos[ry][rx] = 0;
  //     } else if (newbombMap[ry][rx] === 11) {
  //       newsamplepos[ry][rx] = -1;
  //     } else if (newbombMap[ry][rx] >= 1 && newbombMap[ry][rx] <= 8) {
  //       newsamplepos[ry][rx] = 0;
  //     }
  //   }
  //   // }
  //   console.log('spread 関数の戻り値:', spread(x, y));
  //   return newsamplepos;
  // }

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
      for (const [dx, dy] of directions) {
        const rx = x + dx;
        const ry = y + dy;
        if (rx >= 0 && rx < 9 && ry >= 0 && ry < 9) {
          if (newbombMap[ry][rx] === 0) {
            newsamplepos[ry][rx] = 0;
            for (const [dx, dy] of directions) {
              const sx = rx + dx;
              const sy = ry + dy;
              if (sx >= 0 && sx < 9 && sy >= 0 && sy < 9)
                if (newbombMap[sy][sx] === 0) {
                  newsamplepos[sy][sx] = 0;
                  for (const [dx, dy] of directions) {
                    const tx = sx + dx;
                    const ty = sy + dy;
                    if (tx >= 0 && tx < 9 && ty >= 0 && ty < 9)
                      if (newbombMap[ty][tx] === 0) {
                        newsamplepos[ty][tx] = 0;
                        for (const [dx, dy] of directions) {
                          const ux = tx + dx;
                          const uy = ty + dy;
                          if (ux >= 0 && ux < 9 && uy >= 0 && uy < 9)
                            if (newbombMap[uy][ux] === 0) {
                              newsamplepos[uy][ux] = 0;
                              for (const [dx, dy] of directions) {
                                const vx = ux + dx;
                                const vy = uy + dy;
                                if (vx >= 0 && vx < 9 && vy >= 0 && vy < 9)
                                  if (newbombMap[vy][vx] === 0) {
                                    newsamplepos[vy][vx] = 0;
                                    for (const [dx, dy] of directions) {
                                      const wx = vx + dx;
                                      const wy = vy + dy;
                                      if (wx >= 0 && wx < 9 && wy >= 0 && wy < 9)
                                        if (newbombMap[wy][wx] === 0) {
                                          newsamplepos[wy][wx] = 0;
                                          for (const [dx, dy] of directions) {
                                            const xx = wx + dx;
                                            const xy = wy + dy;
                                            if (xx >= 0 && xx < 9 && xy >= 0 && xy < 9)
                                              if (newbombMap[xy][xx] === 0) {
                                                newsamplepos[xy][xx] = 0;
                                                for (const [dx, dy] of directions) {
                                                  const yx = xx + dx;
                                                  const yy = xy + dy;
                                                  if (yx >= 0 && yx < 9 && yy >= 0 && yy < 9)
                                                    if (newbombMap[yy][yx] === 0) {
                                                      newsamplepos[yy][yx] = 0;
                                                      for (const [dx, dy] of directions) {
                                                        const zx = yx + dx;
                                                        const zy = yy + dy;
                                                        if (zx >= 0 && zx < 9 && zy >= 0 && zy < 9)
                                                          if (newbombMap[zy][zx] === 0) {
                                                            newsamplepos[zy][zx] = 0;
                                                            for (const [dx, dy] of directions) {
                                                              const ax = zx + dx;
                                                              const ay = zy + dy;
                                                              if (
                                                                ax >= 0 &&
                                                                ax < 9 &&
                                                                ay >= 0 &&
                                                                ay < 9
                                                              )
                                                                if (newbombMap[ay][ax] === 0) {
                                                                  newsamplepos[ay][ax] = 0;
                                                                } else if (
                                                                  newbombMap[ay][ax] === 11
                                                                ) {
                                                                  newsamplepos[ay][ax] === -1;
                                                                } else if (
                                                                  newbombMap[ay][ax] >= 1 &&
                                                                  newbombMap[ay][ax] <= 8
                                                                ) {
                                                                  newsamplepos[ay][ax] = 0;
                                                                }
                                                            }
                                                          } else if (newbombMap[zy][zx] === 11) {
                                                            newsamplepos[zy][zx] === -1;
                                                          } else if (
                                                            newbombMap[zy][zx] >= 1 &&
                                                            newbombMap[zy][zx] <= 8
                                                          ) {
                                                            newsamplepos[zy][zx] = 0;
                                                          }
                                                      }
                                                    } else if (newbombMap[yy][yx] === 11) {
                                                      newsamplepos[yy][yx] === -1;
                                                    } else if (
                                                      newbombMap[yy][yx] >= 1 &&
                                                      newbombMap[yy][yx] <= 8
                                                    ) {
                                                      newsamplepos[yy][yx] = 0;
                                                    }
                                                }
                                              } else if (newbombMap[xy][xx] === 11) {
                                                newsamplepos[xy][xx] === -1;
                                              } else if (
                                                newbombMap[xy][xx] >= 1 &&
                                                newbombMap[xy][xx] <= 8
                                              ) {
                                                newsamplepos[xy][xx] = 0;
                                              }
                                          }
                                        } else if (newbombMap[wy][wx] === 11) {
                                          newsamplepos[wy][wx] === -1;
                                        } else if (
                                          newbombMap[wy][wx] >= 1 &&
                                          newbombMap[wy][wx] <= 8
                                        ) {
                                          newsamplepos[wy][wx] = 0;
                                        }
                                    }
                                  } else if (newbombMap[vy][vx] === 11) {
                                    newsamplepos[vy][vx] === -1;
                                  } else if (newbombMap[vy][vx] >= 1 && newbombMap[vy][vx] <= 8) {
                                    newsamplepos[vy][vx] = 0;
                                  }
                              }
                            } else if (newbombMap[uy][ux] === 11) {
                              newsamplepos[uy][ux] === -1;
                            } else if (newbombMap[uy][ux] >= 1 && newbombMap[uy][ux] <= 8) {
                              newsamplepos[uy][ux] = 0;
                            }
                        }
                      } else if (newbombMap[ty][tx] === 11) {
                        newsamplepos[ty][tx] === -1;
                      } else if (newbombMap[ty][tx] >= 1 && newbombMap[ty][tx] <= 8) {
                        newsamplepos[ty][tx] = 0;
                      }
                  }
                } else if (newbombMap[sy][sx] === 11) {
                  newsamplepos[sy][sx] === -1;
                } else if (newbombMap[sy][sx] >= 1 && newbombMap[sy][sx] <= 8) {
                  newsamplepos[sy][sx] = 0;
                }
            }
          } else if (newbombMap[ry][rx] === 11) {
            newsamplepos[ry][rx] === -1;
          } else if (newbombMap[ry][rx] >= 1 && newbombMap[ry][rx] <= 8) {
            newsamplepos[ry][rx] = 0;
          }
        }
      }
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
