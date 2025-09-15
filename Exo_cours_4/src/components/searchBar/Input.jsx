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
