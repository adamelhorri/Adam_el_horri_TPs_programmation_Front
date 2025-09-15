### Adam_EL_HORRI_EXO4_Front/Exo_cours_4/src/App.jsx

```jsx
// Importation des hooks React
import { useMemo, useState } from "react";
// Importation du composant SearchBar (filtres et recherche)
import { SearchBar } from "./components/searchBar/SearchBar.jsx";
// Importation du composant TableProducts (affichage tableau produits)
import { TableProducts } from "./components/products/TableProducts.jsx";

// Données de base : liste de produits avec catégorie, nom, prix et état du stock
const products = [
  { category: "Boisson",   name: "Coca",   price: 2.4,  stock: false },
  { category: "Légume",    name: "Carotte",  price: 1.2,  stock: true },
  { category: "Fruit",     name: "Pomme",    price: 1.6,  stock: false },
  { category: "Boisson",   name: "Limonade", price: 1.8,  stock: true },
  { category: "Fruit",     name: "Cerise",   price: 3.4,  stock: true },
  { category: "Légume",    name: "Chou",     price: 4.5,  stock: true },
  { category: "Légume",    name: "Célerie",  price: 2.9,  stock: false },
  { category: "Fruit",     name: "Kiwi",     price: 4.55, stock: true },
  { category: "Boisson",   name: "Eau",      price: 0.2,  stock: true },
];

// Définition du composant principal App
function App() {
  // Calcul du prix maximum dans les données, mémorisé avec useMemo (optimisation)
  const maxInData = useMemo(() => Math.max(...products.map(p => p.price)), []);

  // État de la recherche (texte saisi par l’utilisateur)
  const [query, setQuery] = useState("");
  // État du filtre stock (true = seulement en stock)
  const [inStockOnly, setInStockOnly] = useState(false);
  // État du filtre prix maximum (slider)
  const [maxPrice, setMaxPrice] = useState(maxInData);

  return (
    // Layout principal : deux colonnes (filtres à gauche, produits à droite)
    <div style={{display:"grid", gridTemplateColumns:"340px 1fr", gap:"24px", padding:"16px"}}>
      {/* Section filtres et recherche */}
      <section>
        <h3>Recherche et Filtres</h3>
        <SearchBar
          query={query} // valeur actuelle du champ recherche
          onQueryChange={setQuery} // callback pour mettre à jour query
          inStockOnly={inStockOnly} // état du filtre stock
          onInStockOnlyChange={setInStockOnly} // callback pour changer filtre stock
          maxPrice={maxPrice} // prix maximum filtré
          onMaxPriceChange={setMaxPrice} // callback pour changer le prix max
          rangeMax={maxInData} // borne max du slider (prix le plus élevé dans la liste)
        />
      </section>

      {/* Section affichage des produits */}
      <section>
        <h2>Gestion de produits</h2>
        <TableProducts
          products={products} // liste des produits
          query={query} // texte de recherche appliqué
          inStockOnly={inStockOnly} // filtre stock appliqué
          maxPrice={maxPrice} // prix max appliqué
        />
      </section>
    </div>
  );
}

// Export par défaut du composant App
export default App;
```

### Adam_EL_HORRI_EXO4_Front/Exo_cours_4/src/components/products/RowProduct.jsx

```jsx
// Déclaration et exportation de la fonction RowProduct en tant que composant React
// Elle reçoit en props un objet "product"
export function RowProduct({ product }) {
  // Déstructuration de l'objet "product" pour récupérer ses propriétés
  const { name, price, stock } = product;

  // Retourne une ligne de tableau <tr>
  return (
    // Si le produit n'est pas en stock (stock = false), applique un fond rouge clair
    // Sinon, aucun style particulier
    <tr style={!stock ? { background: "#f3c9c9" } : undefined}>
      {/* Première cellule du tableau : affiche le nom du produit */}
      <td>{name}</td>
      {/* Deuxième cellule : affiche le prix du produit aligné à droite */}
      <td style={{ textAlign: "right" }}>{price}</td>
    </tr>
  );
}
```

### Adam_EL_HORRI_EXO4_Front/Exo_cours_4/src/components/products/TableCategory.jsx

```jsx
// Déclaration et exportation du composant React TableCategory
// Il reçoit en props une "category" (chaîne de caractères)
export function TableCategory({ category }) {
  return (
    // Retourne une ligne de tableau <tr>
    <tr>
      {/* Cellule d'en-tête <th> qui occupe 2 colonnes (colSpan={2}) */}
      {/* Le texte est aligné à gauche et un espace (paddingTop) est ajouté en haut */}
      <th colSpan={2} style={{ textAlign: "left", paddingTop: 12 }}>
        {/* Affichage du nom de la catégorie */}
        {category}
      </th>
    </tr>
  );
}
```

### Adam_EL_HORRI_EXO4_Front/Exo_cours_4/src/components/products/TableProducts.jsx

```jsx
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
```

### Adam_EL_HORRI_EXO4_Front/Exo_cours_4/src/components/searchBar/Checkbox.jsx

```jsx
// Déclaration et exportation du composant Checkbox
// Props : 
// - id : identifiant unique pour l’input
// - Checked : état booléen (true/false) indiquant si la case est cochée
// - LabelText : texte du label associé
// - onChange : fonction callback exécutée lors d’un changement
export function Checkbox({ id, Checked, LabelText, onChange }) {
  return (
    <>
      {/* Champ input de type checkbox */}
      <input
        id={id} // relie la case à son label via htmlFor
        type="checkbox" // définit le type comme case à cocher
        checked={Checked} // valeur booléenne contrôlée (état du composant)
        // Déclenche onChange en transformant la valeur de checked en booléen
        onChange={(e) => onChange(Boolean(e.target.checked))}
      />
      {/* Label associé à la case à cocher */}
      <label htmlFor={id}>{LabelText}</label>
    </>
  );
}
```

### Adam_EL_HORRI_EXO4_Front/Exo_cours_4/src/components/searchBar/Input.jsx

```jsx
// Déclaration et exportation du composant Input
// Props :
// - value : valeur actuelle de l’input (contrôlée par le parent)
// - onChange : fonction callback déclenchée lors d’un changement
// - placeholder : texte affiché par défaut si le champ est vide (par défaut "Rechercher...")
export function Input({ value, onChange, placeholder = "Rechercher..." }) {
  return (
    // Champ input de type texte
    <input
      value={value} // la valeur de l’input est contrôlée par le parent
      // Quand l’utilisateur tape, onChange est appelé avec la nouvelle valeur
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder} // texte indicatif
      // Styles simples : largeur 100% et padding
      style={{ width: "100%", padding: "8px 10px" }}
    />
  );
}
```

### Adam_EL_HORRI_EXO4_Front/Exo_cours_4/src/components/searchBar/Range.jsx

```jsx
// Déclaration et exportation du composant Range
// Props :
// - value : valeur actuelle du slider (contrôlée par le parent)
// - onChange : callback appelé quand la valeur change
// - min : valeur minimale du slider (par défaut 0)
// - max : valeur maximale du slider (par défaut 10)
// - step : pas d’incrémentation (par défaut 0.05)
// - label : texte affiché au-dessus du slider (par défaut "Prix max")
export function Range({ value, onChange, min = 0, max = 10, step = 0.05, label = "Prix max" }) {
  return (
    <div>
      {/* Affichage du label et de la valeur courante */}
      <div style={{ fontSize: 12, marginBottom: 4 }}>
        {label} : {value}
      </div>

      {/* Input de type range (slider) */}
      <input
        type="range" // type curseur
        min={min} // borne minimale
        max={max} // borne maximale
        step={step} // pas entre deux valeurs
        value={value} // valeur contrôlée
        // Lors du changement, on appelle onChange avec la nouvelle valeur convertie en nombre
        onChange={e => onChange(Number(e.target.value))}
        style={{ width: "100%" }} // occupe toute la largeur
      />
    </div>
  );
}
```

### Adam_EL_HORRI_EXO4_Front/Exo_cours_4/src/components/searchBar/SearchBar.jsx

```jsx
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
```

### Adam_EL_HORRI_EXO4_Front/Exo_cours_4/src/main.jsx

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

