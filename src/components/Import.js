import React, { useState } from "react";
import Vector from "../Images/Vector.png";
import Line from "../Images/Vector13.png";
import Filter from "../Images/Filter.png";
import Export from "../Images/Export.png";
import Dlt from "../Images/Delete.png";
import importLogo from "../Images/importLogo.png";
import importComplete from "../Images/importComplete.png";
import delIconComp from "../Images/delIconComp.png";
import SelectDate from "../Images/SelectDate.png";
import SelectDownArrow from "../Images/SelectDownArrow.png";
import impDel from "../Images/impDel.png";
import { parse } from "papaparse";
import "./ImportStyle.css";
import { useAPI } from "./Context.js";
import "./Guru.css";
export default function Import(props) {
  const { postContacts, fetchContacts, deleteContacts } = useAPI();
  const [click, setClick] = useState(false);
  const [delclick, setDelClick] = useState(false);
  const [highlighted, setHighlighted] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [isDelComplete, setIsDelComplete] = useState(false);
  const [contact, setContact] = useState([]);
  if (isComplete) {
    postContacts(contact);
    fetchContacts();
  }
  const deletebtnClicked = async () => {
    const UserId = props.userId;
    UserId.map(async (id) => {
      return await deleteContacts(id);
    });
    fetchContacts();
  };
  return (
    <>
      <div className="rowContainer">
        <div className="row1">
          <button className="importBtn">
            <img src={SelectDate} alt="Import Logo" className="importlogoImg" />
            Select Date
            <img
              src={SelectDownArrow}
              alt="Import Logo"
              className="importlogoImg"
            />
          </button>
          <button className="importBtn">
            <img src={Filter} alt="Import Logo" className="importlogoImg" />
            Filter
            <img src={Line} alt="line" />
            <img src={SelectDownArrow} alt="line" />
          </button>
        </div>
        <div className="row2">
          <button className="importBtn" onClick={() => setDelClick(true)}>
            <img src={Dlt} alt="Import Logo" className="importlogoImg" />
            Delete
          </button>
          {delclick && (
            <div className="popup">
              {isDelComplete ? (
                <>
                  <div>
                    <img src={delIconComp} alt="PopUp" />
                  </div>
                  <div className="popuptext">Deleted Contacts</div>
                  <div className="popupbtncontainer">
                    <button
                      className="popupbtn"
                      onClick={() => {
                        setDelClick(!delclick);
                        setIsDelComplete(false);
                        document.location.reload();
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <img src={impDel} alt="PopUp" />
                  </div>
                  <div className="popuptext">Delete Contacts</div>
                  <div className="popuplink">
                    Sure you want delete this Contacts ?
                  </div>
                  <div className="popupbtncontainer">
                    <button
                      className="popupbtn"
                      onClick={() => {
                        setDelClick(!delclick);
                        setIsDelComplete(false);
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      className="popupbtn"
                      onClick={() => {
                        deletebtnClicked();
                        setIsDelComplete(true);
                      }}
                    >
                      Ok
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
          <button className="importBtn" onClick={() => setClick(!click)}>
            <img src={Vector} alt="Import Logo" className="importlogoImg" />
            Import
          </button>
          <button className="importBtn">
            <img src={Export} alt="Import Logo" className="importlogoImg" />
            Export
          </button>
        </div>
      </div>
      {click && (
        <div
          className={`popup ${highlighted ? "highlighted" : "nothighlighted"}`}
          onDragOver={(e) => {
            e.preventDefault();
          }}
          onDragEnter={() => setHighlighted(true)}
          onDragLeave={() => setHighlighted(false)}
          onDrop={(e) => {
            e.preventDefault();
            setHighlighted(false);
            Array.from(e.dataTransfer.files)
              .filter((files) => files.type === "text/csv")
              .forEach(async (file) => {
                console.log(file);
                const text = await file.text();
                const result = parse(text, { header: true });
                console.log(result.data);
                setContact((pre) => [...pre, ...result.data]);
                setIsComplete(true);
              });
          }}
        >
          {isComplete ? (
            <>
              <div>
                <img src={importComplete} alt="PopUp" />
              </div>
              <div className="popuptext">Import Complete</div>
              <div className="popuplink">CSV File is Uploaded</div>
              <div className="popupbtncontainer">
                <button
                  className="popupbtn"
                  onClick={() => {
                    setClick(!click);
                    setIsComplete(false);
                  }}
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <div>
                <img src={importLogo} alt="PopUp" />
              </div>
              <div className="popuptext">Import File</div>
              <div className="popuplink">Drag & Drop a CSV File to Upload</div>
              <div className="popupbtncontainer">
                <button
                  className="popupbtn"
                  onClick={() => {
                    setClick(!click);
                    setIsComplete(false);
                  }}
                >
                  Cancel
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
