import { AppBar, Box, Toolbar, Typography } from "@mui/material"
import { Link } from "react-router-dom"

export function Nav() {


  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="sticky">
        <Toolbar sx={{display: "flex", justifyContent: "space-between"}}>
          <Typography
            component={Link}
            to="/"
            variant="h5"
            noWrap
            sx={{ textDecoration: "none" }}
          >
            Home
          </Typography>
          <Typography
            component={Link}
            to="/persons"
            variant="h5"
            noWrap
            sx={{ textDecoration: "none" }}
          >
            People
          </Typography>
          <Typography
            component={Link}
            to="/clients"
            variant="h5"
            noWrap
            sx={{ textDecoration: "none" }}
          >
            Clients
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
