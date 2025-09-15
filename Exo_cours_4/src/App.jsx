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
