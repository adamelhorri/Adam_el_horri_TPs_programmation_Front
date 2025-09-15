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
