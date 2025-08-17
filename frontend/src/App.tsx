import { Box } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import {NavMenu} from "./components/NavMenu";
import AppRoutes from "./routes/AppRoutes";


const App = () => (
    <BrowserRouter>
      <NavMenu />
      <Box as="main" p={{ base: 4, md: 8 }}>
        <AppRoutes />
      </Box>
    </BrowserRouter>  
)

export default App;
