export function Range({ value, onChange, min = 0, max = 10, step = 0.05, label = "Prix max" }) {
  return (
    <div>
      <div style={{ fontSize: 12, marginBottom: 4 }}>
        {label} : {value}
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        style={{ width: "100%" }}
      />
    </div>
  );
}
