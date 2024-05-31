import styles from '../pages/index.module.css';

interface Element {
  width: number;
  height: number;
}
interface Props {
  element: Element;
  flagnumber: number;
  reset: () => void;
  face: number;
  time: number;
  bombMap: number[][];
  clickHandler: (x: number, y: number) => void;
  Rclick: (x: number, y: number, event: React.MouseEvent<HTMLDivElement>) => void;
  userInputs: number[][];
}

const Board: React.FC<Props> = ({
  element,
  flagnumber,
  reset,
  face,
  time,
  bombMap,
  clickHandler,
  Rclick,
  userInputs,
}) => {
  return (
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
        {bombMap.map((row: number[], y: number) => (
          <div key={y} className={styles.row}>
            {row.map((cell: number, x: number) => (
              <div
                key={x}
                className={styles.cell}
                onClick={() => clickHandler(x, y)}
                onContextMenu={(event) => Rclick(x, y, event)}
              >
                <div
                  className={
                    userInputs[y][x] === -3
                      ? styles.redbomb
                      : userInputs[y][x] === -1
                        ? styles.rock
                        : userInputs[y][x] === 0
                          ? styles.sampleStyle
                          : styles.fusion
                  }
                  style={
                    userInputs[y][x] === -3
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
  );
};

export default Board;
