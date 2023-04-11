// Core
import { Outlet } from 'react-router-dom';
// Parts
import { Container } from "@mui/material";
// Parts
import { Header } from "../components/Header/Header";

export function Layout() {
    return (
      <>
        <Header />
        <Container>
          <Outlet />
        </Container>
      </>
    )
}
