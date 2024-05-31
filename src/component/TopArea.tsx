const TopArea = ({ changeboard, setsave, save, element, flagnumber, reset, face, time }) => {
  return (
    <>
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
    </>
  );
};

export default TopArea;
