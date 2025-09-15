// Importation du composant TableCategory pour afficher une catégorie
import { TableCategory } from "./TableCategory.jsx";
// Importation du composant RowProduct pour afficher un produit
import { RowProduct } from "./RowProduct.jsx";

// Déclaration et exportation du composant TableProducts
// Props : products, query, inStockOnly, maxPrice, category (NOUVEAU)
export function TableProducts({ products, query, inStockOnly, maxPrice, category }) {
  // Nettoyage de la requête
  const q = query.trim().toLowerCase();

  // Filtrage et tri
  const filtered = products
    // 0. Filtre catégorie si != "ALL"
    .filter(p => (category === "ALL" ? true : p.category === category))
    // 1. Recherche texte
    .filter(p => (!q || p.name.toLowerCase().includes(q)))
    // 2. Prix max
    .filter(p => p.price <= maxPrice)
    // 3. Stock
    .filter(p => (inStockOnly ? p.stock : true))
    // 4. Tri par catégorie puis nom
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
