import Frame from "./frame";

const Input = ({
  type,
  className,
  value,
  onChange,
  onClear,
  name,
  ...props
}) => {
  const inputName = name || (type === "search" ? "search" : undefined);

  return (
    <Frame className={`input ${className}`} frame="corners">
      <input
        type={type}
        value={value ?? ""}
        name={inputName}
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
