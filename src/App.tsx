import Panel from "./components/panel/index.js";
import SettingsFigure from "./components/nodeNav/index.js";
import Scane from "./components/scane/index.js";

function App() {
  return (
    <main>
      <Scane />
      <Panel />
      <SettingsFigure />
    </main>
  );
}

export default App;
