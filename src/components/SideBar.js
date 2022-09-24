import React from "react";
import {
  MdOutlineContacts,
  MdOutlineDashboard,
  MdOutlineLogout,
} from "react-icons/md";
import "./sidebar.css";
import "./Guru.css";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();
  return (
    <>
      <div className="side-container">
        <div className="logo">
          <h1>Logo</h1>
        </div>
        <div>
          <div className="Dashboard">
            <MdOutlineDashboard className="icon" />
            <label htmlFor="">DashBoard</label>
          </div>
          <div className="totalcontact">
            <MdOutlineContacts className="cont-icon" />
            <label htmlFor="">Total Contacts</label>
            <div className="line"></div>
          </div>
        </div>
        <div
          className="logout"
          onClick={() => {
            navigate("/");
            localStorage.clear("token");
            window.location.reload();
          }}
        >
          <MdOutlineLogout className="logout_logo" />
          <label htmlFor="">Logout</label>
        </div>
      </div>
    </>
  );
}
export default Sidebar;
