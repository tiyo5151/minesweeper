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
        <b>カスタム(更新)</b>
      </button>
    </div>
    <div className={styles.customContainer}>
      <p style={{ color: 'white' }}>縦</p>
      <p style={{ color: 'white' }}>横</p>
      <p style={{ color: 'white' }}>爆弾</p>
    </div>
    <div className={styles.customContainer2}>
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
        max="99"
        value={numbomb}
        onChange={(event) => setnumbomb(event.target.valueAsNumber)}
      />
    </div>
    <div
      className={styles.mostoverline}
      style={{ width: width > 8 ? `${40 * width + 80}px` : `${40 * 9 + 80}px` }}
    >
      <div className={styles.middiumline}>
        <div className={styles.lastline}>
          <div className={styles.overbombMap1}>
            <div className={styles.threebase}>
              <div className={styles.countbase}>{flagnumber}</div>
            </div>

            <div className={styles.threebase}>
              <div className={styles.aroundbutton}>
                <button onClick={() => reset()}>
                  <div className={styles.button2}>
                    <div
                      className={styles.sampleStyle}
                      style={{
                        backgroundPosition: `${-30 * (11 + face)}px 0px`,
                      }}
                    />
                  </div>
                </button>
              </div>
            </div>
            <div className={styles.threebase}>
              <div className={styles.countbase}>{time}</div>
            </div>
          </div>
        </div>
        <div className={styles.lastline}>
          <div className={styles.bombMap} style={{ width: `${40 * width}px` }}>
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
                              ? {
                                  backgroundPosition: `${-30 * (bombMap[y][x] - 1)}px 0px`,
                                }
                              : { backgroundPosition: `${-30 * 9}px 0px` }
                      }
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);
