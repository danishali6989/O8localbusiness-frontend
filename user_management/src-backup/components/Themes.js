
import { green, purple } from "@material-ui/core/colors";
import { createMuiTheme } from "@material-ui/core/styles";

export const lightTheme = createMuiTheme({
    palette: {
        type: 'light',
        primary: purple,
        secondary: green
    }
})

export const darkTheme = createMuiTheme({
    palette: {
        type: "dark",
        primary: purple,
        secondary: green
    }
})






