export function Input({ value, onChange, placeholder = "Rechercher..." }) {
  return (
    <input
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      style={{ width: "100%", padding: "8px 10px" }}
    />
  );
}
