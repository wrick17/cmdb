import { memo } from "react";

const Loading = memo(({ full, style, children }) => {
  return (
    <div className="loading-block">
      {children}
      <div
        className={`cmdb-loader ${full ? "cmdb-loader-full" : ""}`}
        style={style}
      >
        <i />
        <i />
        <i />
      </div>
    </div>
  );
});

export default Loading;
