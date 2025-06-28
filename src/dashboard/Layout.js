import React, { useEffect, useState } from "react";
import { auth } from "../firebase/firebase";
import Sidebar from "./Sidebar";
import TopNavbar from "./TopNavbar";

const Layout = ({ children }) => {
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    if (auth.currentUser) {
      setUserEmail(auth.currentUser.email);
    }
  }, []);

  return (
    <div className="dashboard-wrapper">
      <TopNavbar userEmail={userEmail} />
      <div className="dashboard-container d-flex">
        <Sidebar />
        <div className="main-content p-4 w-100">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
