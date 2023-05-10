import { createMuiTheme } from "@material-ui/core";
import grey from "@material-ui/core/colors/grey"

const theme = createMuiTheme({
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