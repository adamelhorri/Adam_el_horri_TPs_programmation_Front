import { useMemo, useState } from "react";
import { SearchBar } from "./components/searchBar/SearchBar.jsx";
import { TableProducts } from "./components/products/TableProducts.jsx";

const products = [
  { category: "Fruit",   name: "Banane",   price: 2.4,  stock: false },
  { category: "Légume",  name: "Carotte",  price: 1.2,  stock: true },
  { category: "Fruit",   name: "Pomme",    price: 1.6,  stock: false },
  { category: "Boisson", name: "Limonade", price: 1.8,  stock: true },
  { category: "Fruit",   name: "Cerise",   price: 3.4,  stock: true },
  { category: "Légume",  name: "Chou",     price: 4.5,  stock: true },
  { category: "Légume",  name: "Célerie",  price: 2.9,  stock: false },
  { category: "Fruit",   name: "Kiwi",     price: 4.55, stock: true },
  { category: "Boisson", name: "Eau",      price: 0.2,  stock: true },
];

function App() {
  const maxInData = useMemo(() => Math.max(...products.map(p => p.price)), []);
  const [query, setQuery] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [maxPrice, setMaxPrice] = useState(maxInData);

  return (
    <div style={{display:"grid", gridTemplateColumns:"340px 1fr", gap:"24px", padding:"16px"}}>
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
        />
      </section>

      <section>
        <h2>Gestion de produits</h2>
        <TableProducts
          products={products}
          query={query}
          inStockOnly={inStockOnly}
          maxPrice={maxPrice}
        />
      </section>
    </div>
  );
}

export default App;
