class Task {
    constructor(
        public date: String,
        public description: String,
        public user: String
    ) {}
}

class TaskService {

    takeTaskData() {
        let description = (document.getElementById("description") as HTMLInputElement).value;
        let date = (document.getElementById("date") as HTMLInputElement).value;
        let user = (document.getElementById("user") as HTMLInputElement).value;
        return new Task(date, description, user)
    }
    
    isValidDate(date: any) { 
        let taskDate = new Date(date);
        let currentDate = new Date();
        return taskDate > currentDate;
    }

    addTask() {
        let task = this.takeTaskData();
        let validated = this.isValidDate(task.date);
        if (validated) {

            console.log(JSON.stringify(task));

            fetch("http://localhost:3000/api/v1/task", {
                method: "POST",
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify(task)
            })
            .then(res => res.json())
            .then(data => alert(JSON.stringify(data)))
            .catch(err => alert(err))

        }
    }

    getTasks() {
        const id = (document.getElementById("buscarPorId") as HTMLInputElement).value;
        const page = (document.getElementById("buscarPorPagina") as HTMLInputElement).value;

        if (id != '') {
            fetch(`http://localhost:3000/api/v1/task/${id}`)
            .then(res => res.json())
            .then(data => {
                    console.log(data);
            })
        } else if (page != '') {
            fetch(`http://localhost:3000/api/v1/task?page=${page}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
            })
        } else {
            fetch('http://localhost:3000/api/v1/task')
            .then(res => res.json())
            .then(data => {
                console.log(data);
            })
        }
    }

    deleteTask() {
        const id = (document.getElementById('alteracoesPorId') as HTMLInputElement).value;
        fetch(`http://localhost:3000/api/v1/task/${id}`, {
            method: "DELETE",
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        })
        console.log('Task successfully removed');
    }

    updateTask() {
        const id = (document.getElementById('alteracoesPorId') as HTMLInputElement).value;
        let task = this.takeTaskData();

        let validated = false;

        if (task.date != '') {
            validated = this.isValidDate(task.date);
        } else {
            validated = true
        }

        if (validated) {
            fetch(`http://localhost:3000/api/v1/task/${id}`, {
                method: "PUT",
                body: JSON.stringify(task),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
            .then(response => response.json())
            .then(data => console.log(data))
        } else {
            console.log("Error in the task update")
        }
    }
}
