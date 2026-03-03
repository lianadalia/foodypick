const config = {
  V:  { label: 'V',  title: 'Vegetarian',   bg: 'bg-green-100',  text: 'text-green-800' },
  VE: { label: 'VE', title: 'Vegan',         bg: 'bg-emerald-100', text: 'text-emerald-800' },
  GF: { label: 'GF', title: 'Gluten-free',  bg: 'bg-blue-100',   text: 'text-blue-800' },
  N:  { label: 'N',  title: 'Contains nuts', bg: 'bg-amber-100',  text: 'text-amber-800' },
  SP: { label: 'SP', title: 'Spicy',         bg: 'bg-red-100',    text: 'text-red-800' },
};

export default function DietaryBadge({ tag }) {
  const c = config[tag];
  if (!c) return null;
  return (
    <span
      title={c.title}
      className={`inline-block text-[10px] font-bold px-1.5 py-0.5 rounded ${c.bg} ${c.text}`}
    >
      {c.label}
    </span>
  );
}
