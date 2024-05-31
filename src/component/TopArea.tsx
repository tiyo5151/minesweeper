interface Save {
  width: number;
  height: number;
  numbomb: number;
}
interface Props {
  changeboard: (width: number, height: number, bombs: number) => void;
  save: Save;
  setsave: (save: Save) => void;
}

const TopArea: React.FC<Props> = ({ changeboard, setsave, save }) => {
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <button
          onClick={() => {
            changeboard(9, 9, 10);
            setsave({ width: 9, height: 9, numbomb: 10 });
          }}
        >
          <b>初級</b>
        </button>
        <button
          onClick={() => {
            changeboard(16, 16, 40);
            setsave({ width: 16, height: 16, numbomb: 40 });
          }}
        >
          <b>中級</b>
        </button>
        <button
          onClick={() => {
            changeboard(16, 30, 99);
            setsave({ width: 16, height: 30, numbomb: 99 });
          }}
        >
          <b>上級</b>
        </button>
        <button
          onClick={() => {
            changeboard(save.height, save.width, save.numbomb);
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
          value={save.height}
          onChange={(event) =>
            setsave({
              height: event.target.valueAsNumber,
              width: save.width,
              numbomb: save.numbomb,
            })
          }
        />
        <input
          type="number"
          required
          min="1"
          max="100"
          value={save.width}
          onChange={(event) =>
            setsave({
              height: save.height,
              width: event.target.valueAsNumber,
              numbomb: save.numbomb,
            })
          }
        />
        <input
          type="number"
          required
          min="1"
          max="99"
          value={save.numbomb}
          onChange={(event) =>
            setsave({ height: save.height, width: save.width, numbomb: event.target.valueAsNumber })
          }
        />
      </div>
    </>
  );
};

export default TopArea;
