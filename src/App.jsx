
import { ApolloProvider } from "@apollo/client/react";
import { Route, Routes } from "react-router";
import Listing from "./components/Listing.jsx";
import SignUp from "./components/SignUp.jsx"
import { client } from "./assets/Graph-client.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Favorites from "./components/Favorites.jsx";

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <ToastContainer />

        <Routes>
          <Route path="/" element={<Listing />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/listings/:id" element={<Listing />} />
        </Routes>
      </ApolloProvider>
    </>
  );
}

export default App;
