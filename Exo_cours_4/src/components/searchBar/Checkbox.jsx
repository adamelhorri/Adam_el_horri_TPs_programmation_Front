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
