import Frame from "./frame";

const Input = ({ type, className, value, onChange, onClear, ...props }) => {
  return (
    <Frame className={`input ${className}`} frame="hexagon">
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        {...props}
      />
      {type === "search" && value && (
        <span className="clear" onClick={onClear}>
          ×
        </span>
      )}
    </Frame>
  );
};

export default Input;
