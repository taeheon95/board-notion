import React from "react";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <nav className="bg-slate-200 drop-shadow-md h-10">
        <menu className="container mx-auto mb-2">
          <ul className="flex flex-row">
            <li className="px-2 py-1 mx-1 w-14">
              <Link to="/">main</Link>
            </li>
            <li className="px-2 py-1 mx-1 w-14">
              <Link to="/editorJs">editorJs</Link>
            </li>
            <li className="px-2 py-1 mx-1 w-14">
              <Link to="/editor">editor</Link>
            </li>
          </ul>
        </menu>
      </nav>
      <main className="container mx-auto">
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
