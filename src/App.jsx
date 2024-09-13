import React from "react";
import { Login, Dashboard } from "./pages";

function App() {
  const code = new URLSearchParams(window.location.search).get("code");

  return code ? <Dashboard code={code} /> : <Login />;
}

export default App;