// Importation des composants réutilisables
import { Checkbox } from "./Checkbox.jsx";
import { Input } from "./Input.jsx";
import { Range } from "./Range.jsx";

// Déclaration et exportation du composant SearchBar
// Props :
// - query : texte de recherche
// - onQueryChange : callback déclenché quand la recherche change
// - inStockOnly : booléen pour afficher uniquement les produits en stock
// - onInStockOnlyChange : callback déclenché quand la case stock change
// - maxPrice : prix maximum sélectionné via le slider
// - onMaxPriceChange : callback déclenché quand le prix max change
// - rangeMax : borne maximale du slider
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
      {/* Case à cocher : filtre pour afficher seulement les produits en stock */}
      <Checkbox
        id="display-stock" // identifiant unique de la case
        Checked={inStockOnly} // état booléen
        LabelText="Afficher seulement les produits en stock" // texte du label
        onChange={onInStockOnlyChange} // callback de changement
      />

      {/* Champ texte : barre de recherche */}
      <Input
        value={query} // valeur contrôlée (texte actuel)
        onChange={onQueryChange} // callback au changement de texte
        placeholder="Rechercher..." // texte indicatif
      />

      {/* Slider : filtre par prix maximum */}
      <Range
        min={0} // borne minimale
        max={rangeMax} // borne maximale (dynamique selon produits)
        value={maxPrice} // valeur actuelle du slider
        label="Prix max" // texte affiché au-dessus du slider
        onChange={onMaxPriceChange} // callback de changement
      />
    </div>
  );
}
