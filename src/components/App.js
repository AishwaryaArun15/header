import React from "react";
import SideBar from "appC/SideBar";

const App = () => (
  <div>
    <SideBar />
    <h2 style={{ background: "#00ccff", padding: "10px" }}>
      App from App B
    </h2>
  </div>
);

export default App;
