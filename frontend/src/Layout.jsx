import { lazy } from "react";
const Home = lazy(()=> import('./pages/Home'))
const AddTask = lazy(()=> import('./pages/AddTaskForm'))
const Error = lazy(()=> import('./pages/Error'))

const Routing = [
    {
        path : '/',
        element : Home
    },
    {
        path : '/addTask',
        element : AddTask
    },
    {
        path : '/updateTask/:id',
        element : AddTask
    },
    {
        path : '*',
        element : Error
    },
]

export default Routing