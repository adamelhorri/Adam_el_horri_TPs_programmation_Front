// Importation des hooks React
import { useMemo, useState } from "react";
// Importation du composant SearchBar (filtres et recherche)
import { SearchBar } from "./components/searchBar/SearchBar.jsx";
// Importation du composant TableProducts (affichage tableau produits)
import { TableProducts } from "./components/products/TableProducts.jsx";

// Données de base : liste de produits avec catégorie, nom, prix et état du stock
const products = [
  { category: "Boisson",   name: "Coca",     price: 2.4,  stock: false },
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
  // Prix max dans les données
  const maxInData = useMemo(() => Math.max(...products.map(p => p.price)), []);
  // Liste des catégories (unique + triée)
  const categories = useMemo(
    () => Array.from(new Set(products.map(p => p.category))).sort(),
    []
  );

  // États des filtres
  const [query, setQuery] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [maxPrice, setMaxPrice] = useState(maxInData);
  const [category, setCategory] = useState("ALL"); // "ALL" = toutes catégories

  return (
    <div style={{display:"grid", gridTemplateColumns:"340px 1fr", gap:"24px", padding:"16px"}}>
      {/* Section filtres et recherche */}
      <section>
        <h3>Recherche et Filtres</h3>
        <SearchBar
          query={query}
          onQueryChange={setQuery}
          inStockOnly={inStockOnly}
          onInStockOnlyChange={setInStockOnly}
          maxPrice={maxPrice}
          onMaxPriceChange={setMaxPrice}
          rangeMax={maxInData}
          // Nouveau : filtre catégorie
          category={category}
          onCategoryChange={setCategory}
          categories={categories}
        />
      </section>

      {/* Section affichage des produits */}
      <section>
        <h2>Gestion de produits</h2>
        <TableProducts
          products={products}
          query={query}
          inStockOnly={inStockOnly}
          maxPrice={maxPrice}
          // Nouveau : filtre catégorie
          category={category}
        />
      </section>
    </div>
  );
}

// Export par défaut du composant App
export default App;
