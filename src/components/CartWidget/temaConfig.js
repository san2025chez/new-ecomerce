import { createTheme } from "@material-ui/core";
import grey from "@material-ui/core/colors/grey"

const theme = createTheme({
palette:{
    primary:{
        main:grey[900]
    },
    secondary:{
        main: "#d500f9"

    }
}
})
export default theme;