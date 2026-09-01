import { Container } from "@mui/material";
import { ApolloProvider } from "@apollo/client/react";
import { Route, Routes } from "react-router";
import Listing from "./components/Listing.jsx";
import SignUp from "./components/SignUp.jsx"
import { client } from "./assets/Graph-client.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header.jsx";

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <ToastContainer />
          <Header />
          <Routes>
            <Route path="/" element={<Listing />} />
            <Route path="/sign-up" element={<SignUp />} />
          </Routes>
      </ApolloProvider>
    </>
  );
}

export default App;
