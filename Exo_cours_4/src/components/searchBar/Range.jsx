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
