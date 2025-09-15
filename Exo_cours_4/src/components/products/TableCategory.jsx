export function TableCategory({ category }) {
  return (
    <tr>
      <th colSpan={2} style={{ textAlign: "left", paddingTop: 12 }}>
        {category}
      </th>
    </tr>
  );
}
