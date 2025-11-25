import React from "react";
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import api from "../API";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [task, setTask] = useState([]);
  const [search, setSearch] = useState([]);

  // console.log(import.meta.env.VITE_API)
  async function fetchData() {
    const result = await api.get("/get");
    setTask(result.data);
    setSearch(result.data);
  }

  // Delete Task Function
  async function trashTask(id) {
    if (confirm("do you want delete this task.....!")) {
      await api.delete(`/delete/${id}`);
      fetchData();
    }
    toast.success("Task deletedc successfully!", {
      position: "top-left",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  }

  // Searching Data Function
  async function searching(data) {
    if (data.trim() === "") {
      setTask(allTask);
      return;
    }

    const filtered = search.filter(
      (ele) =>
        ele.taskName.toLowerCase().includes(data.toLowerCase()) ||
        ele.taskAssign.toLowerCase().includes(data.toLowerCase()) ||
        ele.taskStatus.toLowerCase().includes(data.toLowerCase())
    );

    setTask(filtered);
  }

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <Header />
      <div className="container">
        <div className="row flex-row-reverse">
          <div className="col-lg-3">
            <input
              type="search"
              className="form-control"
              placeholder="Search by Task Name/Assign/Status"
              onChange={(e) => searching(e.target.value)}
            />
          </div>
        </div>
      </div>
      <table className="container table mt-4">
        <thead>
          <tr>
            <td className="text-capitalize">sr.no</td>
            <td className="text-capitalize">task name</td>
            <td className="text-capitalize">task assign</td>
            <td className="text-capitalize">status</td>
            <td className="text-capitalize">action</td>
          </tr>
        </thead>
        <tbody>
          {task.map((ele, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{ele.taskName}</td>
              <td>{ele.taskAssign}</td>
              <td>{ele.taskStatus}</td>
              <td>
                <div className="btn-group">
                  <button
                    className="btn btn-info text-capitalize"
                    onClick={() => navigate(`/updateTask/${ele._id}`)}
                  >
                    edit
                  </button>
                  <button
                    className="btn btn-danger text-capitalize"
                    onClick={() => trashTask(ele._id)}
                  >
                    delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Footer />
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
    </>
  );
};

export default Home;
