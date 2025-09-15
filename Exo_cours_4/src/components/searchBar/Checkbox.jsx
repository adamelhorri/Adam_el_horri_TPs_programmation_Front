export function Checkbox({ id, Checked, LabelText, onChange }) {
  return (
    <>
      <input
        id={id}
        type="checkbox"
        checked={Checked}
        onChange={(e) => onChange(Boolean(e.target.checked))}
      />
      <label htmlFor={id}>{LabelText}</label>
    </>
  );
}
