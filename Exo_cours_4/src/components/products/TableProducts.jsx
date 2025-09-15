import { TableCategory } from "./TableCategory.jsx";
import { RowProduct } from "./RowProduct.jsx";

export function TableProducts({ products, query, inStockOnly, maxPrice }) {
  const q = query.trim().toLowerCase();

  const filtered = products
    .filter(p => (!q || p.name.toLowerCase().includes(q)))
    .filter(p => p.price <= maxPrice)
    .filter(p => (inStockOnly ? p.stock : true))
    .sort((a, b) => a.category.localeCompare(b.category) || a.name.localeCompare(b.name));

  const rows = [];
  let lastCat = null;

  for (const p of filtered) {
    if (p.category !== lastCat) {
      rows.push(<TableCategory key={`cat-${p.category}`} category={p.category} />);
      lastCat = p.category;
    }
    rows.push(<RowProduct key={`${p.category}-${p.name}`} product={p} />);
  }

  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          <th style={{ textAlign: "left" }}>Nom</th>
          <th style={{ textAlign: "right" }}>Prix</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}
