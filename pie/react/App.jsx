import React, { Suspense, lazy } from "react";
import { Routes, Route, Outlet, Link } from "react-router-dom";
const PieceReact = lazy(() => import("./piece_react"));
const PieceVue = lazy(() => import("./piece_vue"));

const SuspenseReact = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PieceReact />
    </Suspense>
  );
};
const SuspenseVue = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PieceVue />
    </Suspense>
  );
};
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="react" element={<SuspenseReact />} />
          <Route path="vue" element={<SuspenseVue />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

function Layout() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/react">react</Link>
          </li>
          <li>
            <Link to="/vue">vue</Link>
          </li>
          <li>
            <Link to="/nothing-here">Nothing Here</Link>
          </li>
        </ul>
      </nav>
      <hr />
      <Outlet />
    </div>
  );
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}
