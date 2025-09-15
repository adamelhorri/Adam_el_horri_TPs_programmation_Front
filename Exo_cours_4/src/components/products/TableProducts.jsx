// Importation du composant TableCategory pour afficher une catégorie
import { TableCategory } from "./TableCategory.jsx";
// Importation du composant RowProduct pour afficher un produit
import { RowProduct } from "./RowProduct.jsx";

// Déclaration et exportation du composant TableProducts
// Props : products (liste de produits), query (recherche), inStockOnly (filtre stock), maxPrice (filtre prix max)
export function TableProducts({ products, query, inStockOnly, maxPrice }) {
  // Nettoyage de la requête : suppression des espaces + conversion en minuscule
  const q = query.trim().toLowerCase();

  // Filtrage et tri de la liste des produits
  const filtered = products
    // 1. Si "q" n’est pas vide, on garde les produits dont le nom contient la requête
    .filter(p => (!q || p.name.toLowerCase().includes(q)))
    // 2. Garde uniquement les produits dont le prix est inférieur ou égal à maxPrice
    .filter(p => p.price <= maxPrice)
    // 3. Si inStockOnly est vrai, garde uniquement les produits en stock
    .filter(p => (inStockOnly ? p.stock : true))
    // 4. Trie les produits par catégorie, puis par nom
    .sort((a, b) => a.category.localeCompare(b.category) || a.name.localeCompare(b.name));

  // Initialisation d’un tableau pour stocker les lignes (catégories + produits)
  const rows = [];
  // Variable pour mémoriser la dernière catégorie affichée
  let lastCat = null;

  // Parcours des produits filtrés
  for (const p of filtered) {
    // Si la catégorie change, on insère une ligne de catégorie avant le produit
    if (p.category !== lastCat) {
      rows.push(<TableCategory key={`cat-${p.category}`} category={p.category} />);
      lastCat = p.category; // mise à jour de la dernière catégorie rencontrée
    }
    // Ajout de la ligne produit
    rows.push(<RowProduct key={`${p.category}-${p.name}`} product={p} />);
  }

  // Retourne le tableau complet
  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      {/* En-tête du tableau */}
      <thead>
        <tr>
          <th style={{ textAlign: "left" }}>Nom</th>
          <th style={{ textAlign: "right" }}>Prix</th>
        </tr>
      </thead>
      {/* Corps du tableau avec les catégories et produits */}
      <tbody>{rows}</tbody>
    </table>
  );
}
