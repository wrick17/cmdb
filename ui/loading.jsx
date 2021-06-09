import { ArwesThemeProvider, LoadingBars, StylesBaseline } from "@arwes/core";

const Loading = ({ full, style, children }) => {
  return (
    <div className="loading-block">
      {children}
      <ArwesThemeProvider>
        <StylesBaseline />
        <LoadingBars
          style={style}
          animator={{ activate: true, animate: false }}
          size={1}
          speed={4}
          full={full}
        />
      </ArwesThemeProvider>
    </div>
  );
};

export default Loading;
