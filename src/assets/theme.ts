import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#80d8ff',
            light: '#b5ffff',
            dark: '#49a7cc',
            contrastText: '#222'
        },
        secondary: {
            main: '#fff9c4',
            light: '#fffff7',
            dark: '#cbc693',
            contrastText: '#222'
        },
        grey: {
            50: "#fafafa",
            100: "#f5f5f5",
            200: "#eeeeee",
            300: "#e0e0e0",
            400: "#bdbdbd",
            500: "#9e9e9e",
            600: "#757575",
            700: "#616161",
            800: "#424242",
            900: "#212121",
            A100: "#d5d5d5",
            A200: "#aaaaaa",
            A400: "#303030",
            A700: "#616161"
        }
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 450,
            md: 960,
            lg: 1280,
            xl: 1920,
        }
    }
})

export default theme;