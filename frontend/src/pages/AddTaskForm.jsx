import { useForm } from "react-hook-form";
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import axios from "axios";
import { v4 as uuid } from "uuid";
import { useNavigate, useParams } from "react-router-dom";
import api from "../API";
import { useEffect } from "react";

const AddTaskForm = () => {
  const status = ["Not Started", "Pending", "Completed"];
  const { register, handleSubmit, reset } = useForm();
  const {id} = useParams();

  const navigate = useNavigate();

  async function fetchData() {
    const result = await api.get(`/get/${id}`);
    // setTask(result.data);
    reset(result.data)
    console.log(result.data)
  }

  useEffect(() => {
      fetchData();
    }, [id]);

  async function addTask(data) {
    if(id==null){
      data.taskID = uuid();
      await api
        .post("/add", data)
        .then((res) => {
          console.log(res);
          navigate("/");
        })
        .catch((err) => console.log(err));
    }
    else{
      await api.put(`/update/${id}`,data)
      navigate('/')
    }
  }
  return (
    <>
      <Header />
      <div className="col-lg-8 mt-5 mx-auto">
        <form action="" onSubmit={handleSubmit(addTask)}>
          <label htmlFor="task" className="form-label text-capitalize">
            task name
          </label>
          <input
            type="text"
            {...register("taskName")}
            id="task"
            className="form-control mb-2"
            placeholder="Enter Task Name"
            required
            autoFocus
          />
          <label htmlFor="task" className="form-label text-capitalize">
            task assign
          </label>
          <input
            type="text"
            {...register("taskAssign")}
            className="form-control mb-2"
            placeholder="Enter Task Name"
            required
          />
          <label htmlFor="status" className="form-label text-capitalize">
            task status
          </label>
          <select
            name="status"
            id="status"
            {...register("taskStatus")}
            className="form-select mb-2"
            required
          >
            <option value="" selected>
              -- select status --
            </option>
            {status.map((ele, index) => (
              <option value={ele} key={index}>
                {ele}
              </option>
            ))}
          </select>

          {
            id==null
            ?
            <button className="btn btn-primary text-capitalize">add</button>
            :
            <button className="btn btn-warning text-capitalize">update</button>
          }
            <button className="btn btn-secondary text-capitalize mx-2" onClick={()=>navigate('/')}>back</button>
        </form>
      </div>
      <Footer />
      
    </>
  );
};

export default AddTaskForm;
