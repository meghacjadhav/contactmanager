import React, { useContext, useState, createContext, useEffect } from "react";
import axios from "axios";
import "./Guru.css";
import { useNavigate } from "react-router-dom";
const APIContext = createContext();

export function APIContextProvider({ children }) {
  const herokuURL = "https://gpm-contact-manager.herokuapp.com/";
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userEmail, setUserEmail] = useState("");

  //Takes email password confirm_password and stores data
  const SignUpUrl = `${herokuURL}register`;

  // TAKES email Password gives Token
  const loginUrl = `${herokuURL}login`;

  //Takes  name, designation, company, industry, phoneNo, country in BODY
  // &&  Token req.headers.token
  const AddContactsURL = `${herokuURL}Contact/add`;

  // Token req.headers.token
  const FetchContactsURL = `${herokuURL}Contact/get`;

  //Takes ID req.params.id     &&  Token req.headers.token
  const DeleteContactURL = `${herokuURL}Contact/delete/`;

  const config = {
    headers: {
      token: localStorage.getItem("token"),
    },
  };

  //post user
  const signUpUser = (userData) => {
    console.log(userData);
    try {
      axios
        .post(SignUpUrl, userData)
        .then((res) => {
          console.log(res);
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
          window.alert(`Registeration Failed`);
        });
    } catch (error) {
      window.alert(error.message);
    }
  };

  //Login USER
  const loginUser = (loginData) => {
    console.log(loginData);
    axios
      .post(loginUrl, loginData)
      .then((res) => {
        const myToken = res.data.token;
        console.log(myToken);
        localStorage.setItem("token", myToken);
        localStorage.setItem("email", loginData.email);
        navigate("/headercomp");
        fetchContacts();
        document.location.reload();
        setUserEmail(loginData.email);
      })
      .catch((err) => console.log(err));
  };

  //Post CONTACTS
  const postContacts = (ContactsData) => {
    ContactsData.map(async (each) => {
      return await axios
        .post(AddContactsURL, each, config)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    });
  };

  //Fetch USER Data
  const fetchContacts = () => {
    axios
      .get(FetchContactsURL, config)
      .then((res) => {
        const data = res.data.message[0].Contacts;
        setContacts(data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    fetchContacts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteContacts = (id) => {
    axios
      .delete(`${DeleteContactURL}${id}`, config)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  return (
    <APIContext.Provider
      value={{
        contacts,
        isLoading,
        setIsLoading,
        signUpUser,
        loginUser,
        fetchContacts,
        postContacts,
        deleteContacts,
        userEmail,
      }}
    >
      {children}
    </APIContext.Provider>
  );
}

export function useAPI() {
  const context = useContext(APIContext);
  if (context === undefined) {
    throw new Error("Context must be used within a Provider");
  }
  return context;
}
