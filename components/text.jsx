import { ArwesThemeProvider, StylesBaseline, Text as AText } from "@arwes/core";
import { useSelector } from "react-redux";

const FONT_FAMILY_ROOT = '"Titillium Web", sans-serif';

const Text = ({ children, ...props }) => {
  const { routing } = useSelector((state) => state.route);

  return (
    <ArwesThemeProvider>
      <StylesBaseline
        styles={{
          body: { fontFamily: FONT_FAMILY_ROOT },
        }}
      />
      <AText animator={{ activate: !routing }} {...props}>
        {children}
      </AText>
    </ArwesThemeProvider>
  );
};

export default Text;
