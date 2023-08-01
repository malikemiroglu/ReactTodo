import { useEffect, useState } from "react";
import TaskList from "./TaskList";
import {v4 as uuidv4} from 'uuid';

export default function TaskForm() {
    const emptyForm = {task: "", priority: false, isDone: false}
    
    const [formData, setFormData] = useState(emptyForm);
    const [tasks, setTasks] = useState([]);
    const [taskChangeCount, setTaskChangeCount] = useState(0);
    const priorityFixed = false;

    useEffect(() => {
        const localStorageTask = JSON.parse(localStorage.getItem('task'));
        setTasks(localStorageTask ?? []);
    },[])

    useEffect(() => {
        if (taskChangeCount > 0) {
            localStorage.setItem('task', JSON.stringify(tasks))
        }
    }, [taskChangeCount])

    function doneTask(uuid){
        const taskIndex = tasks.findIndex(item => item.uuid === uuid);
        const task = tasks[taskIndex];
        task.isDone = !task.isDone;
        const newTasks = tasks.slice();
        newTasks[taskIndex] = task
        setTasks(newTasks)
        setTaskChangeCount(prev => prev + 1)
    }
    function editTask(uuid){
        console.log(uuid)
        const task = tasks.find(item => item.uuid === uuid);
        setFormData({...task, isEdited: true})
        setTaskChangeCount(prev => prev + 1)

    }
    function removeTask(uuid) {
        console.log(uuid)
        setTasks(prev => prev.filter(item => item.uuid !== uuid))
        setTaskChangeCount(prev => prev + 1)

    }
    function handleDeleteAll() {
        setTasks([]);
        localStorage.removeItem('task');
        setTaskChangeCount(prev => prev + 1);
    }
    function handleInputChange(event) {
        setFormData(prev => {
            return {
                ...prev,
                [event.target.name]: event.target.type === "checkbox" ? event.target.checked : event.target.value
            }
        });
    }
    function handleFormSubmit(event){
        event.preventDefault();

        if(formData.isEdited){
            const taskIndex = tasks.findIndex(item => item.uuid === formData.uuid);
            const newTasks = tasks.slice();
            newTasks[taskIndex] = {...formData}
            setTasks(newTasks)
        }
        else if(formData.task.length > 2) {
            formData.uuid = uuidv4();
            setTasks(prev => [formData, ...prev])
        }
        setTaskChangeCount(prev => prev + 1)

        setFormData(emptyForm);
        event.target.reset();
    }

    return(
    <>
        <form onSubmit={handleFormSubmit}>
            <div className="row mb-3">
                <label htmlFor="task" className="col-sm-2 col-form-label"><b>Task</b></label>
                <div className="col-sm-10">
                    <input type="text" className="form-control" id="task" name="task" value={formData.task} onChange={handleInputChange}/>
                </div>
            </div>
           
            <div className="row mb-3">
                <div className="col-sm-10 offset-sm-2">
                    <div style={{gap: "5px"}} className="form-check d-flex align-items-center">
                        <input className="form-check-input mb-1" type="checkbox" id="priority" name="priority" checked={formData.priority} onChange={handleInputChange}/>
                        <label className="form-check-label" htmlFor="priority">
                        Öncelikli
                        </label>
                        <button type="submit" className="btn btn-primary ms-auto">Kaydet</button>
                    </div>
                </div>
            </div>
            
        </form>

        <TaskList tasks={tasks} removeTask={removeTask} editTask={editTask} doneTask={doneTask} priorityFixed={priorityFixed} handleDeleteAll={handleDeleteAll}/>
    </>);
};