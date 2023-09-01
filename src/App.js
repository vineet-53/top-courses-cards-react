import React from "react";
import Navbar from "./components/Navbar";
import Filter from "./components/Filter";
import Cards from "./components/Cards";
import Loader from "./components/Loader";
import { useState, useEffect } from "react";
import { apiUrl } from "./data";
import { toast } from "react-toastify";

const App = () => {
  const [loader, setLoader] = useState(true);
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(apiUrl);
        const data = await res.json();

        // loader hide
        setLoader(false);
        // save data to var;
        setData(data);
      } catch (err) {
        toast.error("something went wrong");
      }
    };

    fetchData();
  }, []);
  return (
    <div className="app">
      <Navbar />
      <section className="bg-slate-500 w-full min-h-screen">
        <Filter />
        {loader ? <Loader /> : <Cards data={data} />}
      </section>
    </div>
  );
};

export default App;
