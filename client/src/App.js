import { Outlet } from "react-router-dom"
import { Footer } from "./components/index.js"

function App() {
  return (
    <>
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
