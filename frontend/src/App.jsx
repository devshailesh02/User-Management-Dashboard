import { useEffect, useState } from "react";
import "./App.css";

const debounce = (func) => {
  let timer = null;

  return () => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(func, 500);
  };
};

const callback = () => {
  console.log("scrolled", window.scrollY);
};
function App() {
  // useEffect(() => {
  //   const handlescroll = debounce(callback);

  //   window.addEventListener("scroll", handlescroll);

  //   return window.removeEventListener("scroll", handlescroll);
  // }, []);
  let [timer, setTimer] = useState(false);
  let [time, settime] = useState(0);
  useEffect(() => {
    let interval;
    if (timer) {
      interval = setInterval(() => {
        settime((prev) => prev + 1);
        // settime(time + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [timer]);

  useEffect(() => {
    window.addEventListener("online", () => {
      console.log("i am online");
    });
    window.addEventListener("offline", () => {
      console.log("i am ofline");
    });
  }, []);

  const handlelog = (e) => {
    setTimeout(() => {
      console.log(time, e.target);
    }, 5000);
  };
  return (
    <>
      <button onClick={() => setTimer(true)}>start</button>
      <button onClick={() => setTimer(false)}>stop</button>
      <button
        onClick={() => {
          setTimer(false);
          settime(0);
        }}
      >
        reset
      </button>
      <button onClick={handlelog}>log count</button>
      <h1>{time}</h1>
      <div style={{ height: "3000px" }}>Scroll Me</div>;
    </>
  );
}

export default App;
