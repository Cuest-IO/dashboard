import { Outlet } from 'react-router-dom';
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import Grid from "@mui/material/Grid";

const Layout = () => {
  return (
    <Grid
      container
      p={6}
      spacing={6}
      justifyContent='space-between'
    >
      <Grid
        item
        xs={6}
        md={4}
        lg={3}
      >
        <Sidebar/>
      </Grid>
      <Grid
        item
        xs={6}
        md={8}
        lg={9}
      >
        <Grid
          container
          direction='column'
        >
          <Grid
            item
            xs={12}
          >
            <Header />
          </Grid>
          <Grid
            item
            p='24px 0'
            xs={12}
            // maxWidth='100%'
          >
            <Outlet/>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Layout
