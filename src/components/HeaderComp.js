import React from "react";
import "./header.css";
import "./Contacts.css";
import Tooltip from "rc-tooltip";
import "rc-tooltip/assets/bootstrap.css";
import Sidebar from "./SideBar";
import Import from "./Import";
import { useAPI } from "./Context.js";
import { useState } from "react";
const MyTooltip = ({ content, children }) => (
  <Tooltip
    overlay={content}
    mouseLeaveDelay={0.2}
    mouseEnterDelay={0.1}
    defaultVisible={false}
    placement="bottom"
    overlayClassName="bbs-tooltip"
    overlayInnerStyle={{
      color: "#2DA5FC",
      background: "#FFFFFF",
      width: "223px",
      height: " 33px",
      fontSize: "18px",
      textAlign: "center",
      opacity: "1",
    }}
  >
    {children}
  </Tooltip>
);
function HeaderComp() {
  const { isLoading, contacts } = useAPI();
  const [number, setNumber] = useState(1);
  const contactPerPage = 10;
  const lastcontact = number * contactPerPage;
  const firstcontact = lastcontact - contactPerPage;
  const currentcontact = contacts.slice(firstcontact, lastcontact);
  const pageNumber = [];
  for (let i = 1; i <= Math.ceil(contacts.length / contactPerPage); i++) {
    pageNumber.push(i);
  }
  const ChangePage = (pageNumber) => {
    setNumber(pageNumber);
  };
  let checkedArr = [];
  const checkCheckbox = (e) => {
    let clicked = e._id;
    const index = checkedArr.indexOf(e._id);
    if (index > -1) {
      checkedArr.splice(index, 1);
    } else {
      checkedArr.push(clicked);
    }
  };
  const myFunction = () => {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[4];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  };
  const checkCheckboxAll = () => {
    console.log(document.querySelectorAll("#check1"));
    document.querySelectorAll("#check1").forEach((element) => {
      if (element.checked === false) {
        element.checked = true;
        checkedArr.push(element.name);
      } else {
        element.checked = false;
        const index = checkedArr.indexOf(element.name);
        if (index > -1) {
          checkedArr.splice(index, 1);
        }
      }
    });
  };
  return (
    <div id="Maincontainer">
      <Sidebar />
      <div className="G_Main">
        <div className="mainHeader">
          <p id="heading">Total Contacts</p>
          <div id="searchBar">
            <input
              type="text"
              id="myInput"
              onKeyUp={myFunction}
              placeholder="Search by Email ID ..."
              title="Type in a mailid"
            />
          </div>
          <div>
            <img
              id="logo_icon"
              src={require("../Images/user_icon2.png")}
              alt=""
            />
            <p id="user_name">{localStorage.getItem("email").split("@")[0]}</p>
            <p id="admin">Admin</p>
          </div>
        </div>
        <div id="mainContacts">
          <Import userId={checkedArr} />
          <table id="myTable" className="table table-hover">
            <thead>
              <input type="checkbox" id="checkAll" onClick={checkCheckboxAll} />
              <th scope="col">Name</th>
              <th scope="col">Designation</th>
              <th scope="col">Company</th>
              <th scope="col">Industry</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Country</th>
              <th scope="col">Action</th>
            </thead>
            {isLoading ? (
              <thead>
                <th>Loading</th>
              </thead>
            ) : (
              <tbody>
                {currentcontact.map((item) => {
                  if (item.name !== "") {
                    return (
                      <tr>
                        <th scope="row">
                          <input
                            type="checkbox"
                            id="check1"
                            onClick={() => checkCheckbox(item)}
                            name={item._id}
                          />
                        </th>
                        <td>{item.name}</td>
                        <td>{item.designation}</td>
                        <td>{item.company}</td>
                        <td>{item.industry}</td>
                        <MyTooltip content={item.email}>
                          <td id="email">{item.email}</td>
                        </MyTooltip>
                        <td>{item.phoneNo}</td>
                        <td>{item.country}</td>
                        <td>
                          <img
                            id="edit_icon"
                            src={require("../Images/Vector1.png")}
                            alt="Edit"
                          />
                          <img
                            id="delete_icon"
                            src={require("../Images/Deleteicon.png")}
                            alt="Delete"
                          />
                        </td>
                      </tr>
                    );
                  }
                })}
              </tbody>
            )}
          </table>
        </div>
        <div className="paginate">
          <button
            className="px-3 py-1 m-1 text-center btn-primary paginatebtn width"
            onClick={() => setNumber(number - 1)}
          >
            Previous
          </button>
          {pageNumber.map((Elem) => {
            return (
              <>
                <button
                  className="px-3 py-1 m-1 text-center btn-outline-dark paginatebtn"
                  onClick={() => ChangePage(Elem)}
                >
                  {Elem}
                </button>
              </>
            );
          })}
          <button
            className="px-3 py-1 m-1 text-center btn-primary paginatebtn"
            onClick={() => setNumber(number + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
export default HeaderComp;
