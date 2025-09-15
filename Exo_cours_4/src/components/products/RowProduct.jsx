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
