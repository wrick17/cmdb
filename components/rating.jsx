export const Rating = ({ value }) =>
  !value ? (
    "NR"
  ) : (
    <span style={{ fontSize: 12 }}>{value > 50 ? "🔥" : "❄️"}</span>
  );

