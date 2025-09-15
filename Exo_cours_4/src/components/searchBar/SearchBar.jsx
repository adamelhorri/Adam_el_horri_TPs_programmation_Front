import { Checkbox } from "./Checkbox.jsx";
import { Input } from "./Input.jsx";
import { Range } from "./Range.jsx";

export function SearchBar({
  query,
  onQueryChange,
  inStockOnly,
  onInStockOnlyChange,
  maxPrice,
  onMaxPriceChange,
  rangeMax,
}) {
  return (
    <div>
      <Checkbox
        id="display-stock"
        Checked={inStockOnly}
        LabelText="Afficher seulement les produits en stock"
        onChange={onInStockOnlyChange}
      />
      <Input
        value={query}
        onChange={onQueryChange}
        placeholder="Rechercher..."
      />
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
