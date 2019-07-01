import { createMuiTheme, withStyles } from "@material-ui/core/styles";
import { indigo, pink } from "@material-ui/core/colors";

export const theme = createMuiTheme({
  palette: {
    primary: indigo,
    secondary: pink
  },
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(",")
  }
});
