import React from 'react'
import Header from '../Component/Header'
import Footer from '../Component/Footer'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'

const Home = () => {
  const [task,setTask] = useState([])

  // console.log(import.meta.env.VITE_API)
  async function fetchData() {
    const result = await axios.get(`${import.meta.env.VITE_API}/get`)
    setTask(result.data)
  }

  useEffect(()=>{
    fetchData()
  },[])
  return (
    <>
    <Header/>
    <table className='container table mt-4'>
      <thead>
        <tr>
          <td className='text-capitalize'>sr.no</td>
          <td className='text-capitalize'>task name</td>
          <td className='text-capitalize'>task assign</td>
          <td className='text-capitalize'>status</td>
          <td className='text-capitalize'>action</td>
        </tr>
      </thead>
      <tbody>
        {
          task.map((ele,index)=>(
            <tr>
              <td>{index+1}</td>
              <td>{ele.taskName}</td>
              <td>{ele.taskAssign}</td>
              <td>{ele.taskStatus}</td>
            </tr>
          ))
        }
      </tbody>
    </table>
    <Footer/>
    </>
  )
}

export default Home