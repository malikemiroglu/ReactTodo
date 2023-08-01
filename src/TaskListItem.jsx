export default function TaskListItem({task, editTask, removeTask, doneTask}) {
    return(
        <li className={`list-group-item ${task.isDone && 'bg-success bg-gradient'}`} >
            {task.priority && <span className="badge text-bg-secondary me-2">Oncelikli</span>}
            {task.task}
            <div className="btn-group float-end" role="group" >
                <button 
                    type="button" 
                    className="btn btn-sm btn-success"
                    onClick={() => doneTask(task.uuid)}
                    >Bitti
                </button>
                <button 
                    type="button" 
                    className="btn btn-sm btn-primary"
                    onClick={() => editTask(task.uuid)}
                    >Düzenle
                </button>
                <button 
                    type="button" 
                    className="btn btn-sm btn-danger"
                    onClick={() => removeTask(task.uuid)}
                    >Sil
                </button>
            </div>
        </li>
    )
}