import { LoadingBars } from "@arwes/core";
import { memo } from 'react';

const Loading = memo(({ full, style, children }) => {
  return (
    <div className="loading-block">
      {children}
      <LoadingBars
        style={style}
        animator={{ activate: true, animate: false }}
        size={1}
        speed={4}
        full={full}
      />
    </div>
  );
});

export default Loading;
