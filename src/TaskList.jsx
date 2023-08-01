import { useEffect, useState } from "react"
import TaskListItem from "./TaskListItem";

export default function TaskList({ tasks, removeTask, editTask, doneTask, priorityFixed, handleDeleteAll }) {

    const [priority, setPriority] = useState(false);
    const [filteredTasks, setFilteredTasks] = useState(tasks);

    function handlePriorityFilter() {
        const newPriority = !priority
        newPriority ? setFilteredTasks(tasks.filter(item => item.priority === newPriority)) : setFilteredTasks(tasks)
        setPriority(newPriority)
    }

    useEffect(() => {
        setFilteredTasks(tasks);
        setPriority(priorityFixed)
    }, [tasks])

    if(tasks.length === 0) {
        return <></>
    }

    return(
        <>
        <div className="p-3 bg-light mt-4 border rounded">
            <h4 className="mb-3">Görevler: 
                <button 
                    onClick={handlePriorityFilter} 
                    className={`btn btn-sm ${priority ? "btn-primary" : "btn-info"} float-end`}
                    >{priority ? "Hepsini Göster" : "Öncelikli Olanları Göster"}
                </button>
            </h4>
            
            <ul className="list-group mb-3">
                {filteredTasks.map((item) => 
                <TaskListItem 
                    key={item.uuid} 
                    task={item} 
                    removeTask={removeTask} 
                    editTask={editTask} 
                    doneTask={doneTask}
                />)}
            </ul>

        
            {filteredTasks.length > 0 ? 
                <button style={{display: "block", marginLeft: "auto"}} className="btn btn-sm btn-danger " onClick={handleDeleteAll}>Hepsini Sil</button> : 
                <div className="alert alert-warning">Gösterilecek öncelikli görev bulunamadı.</div>
            }

            
        </div>
        </>
    )
}