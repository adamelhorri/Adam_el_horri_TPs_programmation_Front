### src/App.jsx

```jsx
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
```

### src/components/products/RowProduct.jsx

```jsx
export function RowProduct({ product }) {
  const { name, price, stock } = product;
  return (
    <tr style={!stock ? { background: "#f3c9c9" } : undefined}>
      <td>{name}</td>
      <td style={{ textAlign: "right" }}>{price}</td>
    </tr>
  );
}
```

### src/components/products/TableCategory.jsx

```jsx
export function TableCategory({ category }) {
  return (
    <tr>
      <th colSpan={2} style={{ textAlign: "left", paddingTop: 12 }}>
        {category}
      </th>
    </tr>
  );
}
```

### src/components/products/TableProducts.jsx

```jsx
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
```

### src/components/searchBar/Checkbox.jsx

```jsx
export function Checkbox({ id, Checked, LabelText, onChange }) {
  return (
    <>
      <input
        id={id}
        type="checkbox"
        checked={Checked}
        onChange={(e) => onChange(Boolean(e.target.checked))}
      />
      <label htmlFor={id}>{LabelText}</label>
    </>
  );
}
```

### src/components/searchBar/Input.jsx

```jsx
export function Input({ value, onChange, placeholder = "Rechercher..." }) {
  return (
    <input
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      style={{ width: "100%", padding: "8px 10px" }}
    />
  );
}
```

### src/components/searchBar/Range.jsx

```jsx
export function Range({ value, onChange, min = 0, max = 10, step = 0.05, label = "Prix max" }) {
  return (
    <div>
      <div style={{ fontSize: 12, marginBottom: 4 }}>
        {label} : {value}
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        style={{ width: "100%" }}
      />
    </div>
  );
}
```

### src/components/searchBar/SearchBar.jsx

```jsx
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
```

### src/main.jsx

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

