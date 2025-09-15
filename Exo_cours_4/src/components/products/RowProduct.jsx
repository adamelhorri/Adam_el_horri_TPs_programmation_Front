export function RowProduct({ product }) {
  const { name, price, stock } = product;
  return (
    <tr style={!stock ? { background: "#f3c9c9" } : undefined}>
      <td>{name}</td>
      <td style={{ textAlign: "right" }}>{price}</td>
    </tr>
  );
}
