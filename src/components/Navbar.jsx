import React from "react";
import "../index.css";
import AboutPage from "../pages/AboutPage";
import Contact from "../pages/Contact";
import { FaPlus } from "react-icons/fa";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

export default function Navbar() {
  return (
    <Router>
      <nav className="bg-violet-700 shadow-lg">
        <div className="container mx-auto">
            <div className="flex justify-between">
          <Link to="/" className="text-white text-3xl font-bold p-3">KeyNew</Link>
          <ul className="text-white-400 self-center text-xl border-t border-none">
            <li className="sm:inline-block">
              <Link to="/newpost" className=" btn text-white p-3 hover:text-gray-400">
                <FaPlus className="mr-1 inline mb-1" />New Post
              </Link>
            </li>
            <li className="sm:inline-block">
              <Link to="/about" className="text-white p-3 hover:text-gray-400">
                About
              </Link>
            </li>            <li className="sm:inline-block">
              <Link to="/about" className="text-white p-3 hover:text-gray-400">
                Contact     
              </Link>
            </li>
          </ul>
          </div>
        </div>
      </nav>
    </Router>
  );
}
