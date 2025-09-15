// Importation des composants réutilisables
import { Checkbox } from "./Checkbox.jsx";
import { Input } from "./Input.jsx";
import { Range } from "./Range.jsx";

// Déclaration et exportation du composant SearchBar
// Props :
// - query, onQueryChange
// - inStockOnly, onInStockOnlyChange
// - maxPrice, onMaxPriceChange, rangeMax
// - category, onCategoryChange, categories (NOUVEAU)
export function SearchBar({
  query,
  onQueryChange,
  inStockOnly,
  onInStockOnlyChange,
  maxPrice,
  onMaxPriceChange,
  rangeMax,
  category,
  onCategoryChange,
  categories = [],
}) {
  return (
    <div style={{ display: "grid", gap: 12 }}>
      {/* Champ texte : barre de recherche */}
      <Input
        value={query}
        onChange={onQueryChange}
        placeholder="Rechercher..."
      />

      {/* Combo box : filtre par catégorie */}
      <div style={{ display: "grid", gap: 6 }}>
        <label htmlFor="category-select" style={{ fontSize: 12 }}>Catégorie</label>
        <select
          id="category-select"
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
          style={{ padding: "8px 10px", width: "100%" }}
        >
          <option value="ALL">Toutes les catégories</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Case à cocher : seulement en stock */}
      <Checkbox
        id="display-stock"
        Checked={inStockOnly}
        LabelText="Afficher seulement les produits en stock"
        onChange={onInStockOnlyChange}
      />

      {/* Slider : filtre par prix maximum */}
      <Range
        min={0}
        max={rangeMax}
        value={maxPrice}
        label="Prix max"
        onChange={onMaxPriceChange}
      />
    </div>
  );
}
