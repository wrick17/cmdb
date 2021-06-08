import { ArwesThemeProvider, LoadingBars, StylesBaseline } from "@arwes/core";

const Loading = ({ full = true, style }) => {
  return (
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
  );
};

export default Loading;
