import { HashRouter } from "react-router-dom";
import { AppShell } from "./AppShell";
import "./styles/index.css";

export function App() {
  return (
    <HashRouter>
      <AppShell />
    </HashRouter>
  );
}
