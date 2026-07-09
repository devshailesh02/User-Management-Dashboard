import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/navbar";
import { useData } from "./components/customhook";

function App() {
  const [data, setdata] = useState(99);
  const newdata = useData();
  // useEffect(() => {
  //   setTimeout(() => {
  //     console.log("state data", data);
  //   }, 5000);
  // }, []);
  const promise = new Promise((res, rej) =>
    setTimeout(() => res(2000000), 5000),
  );
  promise.then((data) => console.log("resolved with data", data));
  console.log("after promise");

  return (
    <>
      <div className="min-h-screen flex items-center justify-between bg-gray-100">
        <h1 className="text-5xl font-bold text-blue-600">
          Tailwind CSS is working!
        </h1>
      </div>
      <Navbar />
      <button onClick={() => setdata((prev) => prev + 1)}>increase</button>
      {Array(5)
        .fill(5)
        .map((_, index) => (
          <div
            id="div1"
            style={{
              height: "20vh",
              margin: "15px",
              border: "2px solid grey",
              display: "flex",
            }}
          >
            AAAAAA
          </div>
        ))}
    </>
  );
}

export default App;
