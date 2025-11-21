import { useForm } from "react-hook-form"
import Header from "../Component/Header"
import Footer from "../Component/Footer"
import axios from "axios"
import { v4 as uuid } from "uuid"
import { useNavigate } from "react-router-dom"

const AddTaskForm = () => {
    const status = ['Not Started','Pending','Completed']
    const {register,handleSubmit,reset} = useForm()

    const navigate = useNavigate()

    const API = 'http://localhost:5000/api/tasks/add'

    async function addTask(data) {
        data.taskID = uuid()
        // console.log(data)
        await axios.post(API,data)
        .then(res => {
          console.log(res)
          navigate('/')
        })
        .catch(err => console.log(err))
    }
  return (
    <>
      <Header/>
      <div className="col-lg-8 mt-5 mx-auto">
        <form action="" onSubmit={handleSubmit(addTask)}>
            <label htmlFor="task" className="form-label text-capitalize">task name</label>
            <input type="text" {...register('taskName')} id="task" className="form-control mb-2" placeholder="Enter Task Name" />
            <label htmlFor="task" className="form-label text-capitalize">task assign</label>
            <input type="text" {...register('taskAssign')} className="form-control mb-2" placeholder="Enter Task Name" />
            <label htmlFor="status" className="form-label text-capitalize">task status</label>
            <select name="status" id="status" {...register('taskStatus')} className="form-select mb-2">
                <option value="" selected>-- select status --</option>
                {
                    status.map((ele,index)=>(
                        <option value={ele} key={index}>{ele}</option>
                    ))
                }
            </select>

            <button className="btn btn-primary text-capitalize">add</button>
        </form>
      </div>
      <Footer/>
    </>
  )
}

export default AddTaskForm
