import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, NavLink, useParams } from "react-router";
import "./index.css";

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/`)
      .then((data) => data.json())
      .then((data) => setData(data))
      .catch((e) => console.log("Error", e));
  }, []);

  if (!data || data.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {data.map((d) => (
        <div >
          <NavLink className='nav-link' to={`/posts/${d.id}`}>{d.title}</NavLink>
        </div>
      ))}
    </div>
  );
};

const Post = () => {
  const params = useParams();
  // console.log(params);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${params.userId}`)
      .then((data2) => data2.json())
      .then((data2) => setData(data2))
      .catch((e) => console.log("Error", e));
  }, []);
console.log(data);

  if (!data || data.length === 0) {
    return <p>Loading...</p>;
  }
// console.log(data);

  return (
    <div className="content-container">
      <h1>{data.title}</h1>
      <p>{data.body}</p>
    </div>
  )
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App></App>} />
        <Route path="/posts/:userId" element={<Post></Post>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
