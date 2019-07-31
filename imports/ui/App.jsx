import React from "react";
import { SidebarContextProvider } from "./context";

import NavBar from './modules/Navbar'

const App = () => {
  return (
    <div>
      <SidebarContextProvider sidebarIsOpen={true}>
        <NavBar></NavBar>
      </SidebarContextProvider>
    </div>
  );
};

export default App;
