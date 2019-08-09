import React from 'react';
import { SidebarContextProvider } from './context';

// import NavBar from './modules/Navbar';

const App = () => (
  <div>
    <SidebarContextProvider>
      {/* <NavBar /> */}
    </SidebarContextProvider>
  </div>
);

export default App;
