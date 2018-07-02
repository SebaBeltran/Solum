module.exports = {
  getNotes: (req, res) =>{
    const db = req.app.get("db");

    db.get_all()
    .then(notes => res.status(200).send(notes)).catch(()=>res.sendStatus(500))
  },

  getClients: (req, res) => {
    const db =  req.app.get("db");

    db.get_clients([req.params.id])
    .then(clients => res.status(200).send(clients))
    .catch(()=>res.sendStatus(500))
  },

  updateClient: (req, res) => {
    const db =  req.app.get("db");
    const {client_id, firstNameInput, lastNameInput, pos, company, email, phone, selectedImg} = req.body
    console.log(req.body)
    db.update_client([client_id, firstNameInput, lastNameInput, pos, company, email, phone, selectedImg])
    .then(clients => res.status(200).send(clients))
    .catch(()=>res.status(500).send())
  },

  addClient: (req, res) =>{
    const db = req.app.get("db");
    const {first_name, last_name, pos, company, email, phone, user_id, client_pic} = req.body;

    db.add_client([first_name, last_name, pos, company, email, phone, user_id, client_pic])
    .then(clients => res.status(200).send(clients))
    .catch(()=>res.status(500).send())
  },

  deleteClient: (req, res) => {
    const db = req.app.get("db");

    db.delete_client([req.params.id])
    .then(clients => res.status(200).send(clients))
    .catch(()=>res.status(500).send())
  },

  getProjects: (req, res) => {
    const db = req.app.get("db")

    db.get_projects([req.params.id])
    .then (projects => res.status(200).send(projects))
    .catch(() => res.status(500).send())
  },

  addProject: (req, res) =>{
    const db = req.app.get("db");
    const {project_name, user_id, client_id, estimated_hours, tracked_hours, start_date, end_date, color_tag, rate} = req.body;

    console.log(req.body)
    db.add_project([user_id, client_id, project_name, estimated_hours, tracked_hours, start_date, end_date, color_tag, rate])
    .then(projects => res.status(200).send(projects))
    .catch(()=>res.status(500).send())
  },

  deleteProject: (req, res) => {
    const db = req.app.get("db");

    db.delete_project([req.params.id])
    .then(projects => res.status(200).send(projects))
    .catch(()=>res.status(500).send())
  },

  updateProject: (req, res) =>{
    const db = req.app.get("db");
    const {project_id, project_name, user_id, client_id, estimated_hours, start_date, end_date, color_tag, rate} = req.body;

    db.update_project([project_id, user_id, client_id, project_name, estimated_hours,  start_date, end_date, color_tag, rate])
    .then(projects => res.status(200).send(projects))
    .catch(()=>res.status(500).send())
  },
  
  addTask: (req, res) =>{
    const db = req.app.get("db");
    const {project_id, task, d_date, color_tag, user_id, tracked_time, status} = req.body;
    db.add_task([project_id, task, d_date, color_tag, user_id, tracked_time, status])
    .then(tasks => {res.status(200).send(tasks)})
    .catch(()=>res.status(500).send())
  },

  getTask:(req, res) =>{
    const db = req.app.get("db");
    
    db.get_tasks([req.params.id])
    .then(tasks => res.status(200).send(tasks))
    .catch(()=>res.sendStatus(500))
  },

  deleteTask: (req, res) => {
    const db = req.app.get("db");

    db.delete_task([req.params.id])
    .then(tasks => res.status(200).send(tasks))
    .catch(()=>res.status(500).send())
  },

  updateTask: (req, res) =>{
    const db = req.app.get("db");
    const {task_id, task, d_date, color_tag, tracked_time, status, project_id, completed_date} = req.body;
    
    console.log(req.body)
    db.update_task([task_id, task, d_date, color_tag, tracked_time, status, project_id, completed_date])
    .then(tasks => res.status(200).send(tasks))
    .catch(()=>res.status(500).send())
  },

  getTime: (req, res) => {
    const db = req.app.get("db");
    
    db.get_time([req.params.id])
    .then(time => res.status(200).send(time))
    .catch(()=>res.status(500).send())
  },

  getProductivity: (req, res) => {
    const db = req.app.get("db");

    db.get_productivity([req.params.id])
    .then(tasks => res.status(200).send(tasks))
    .catch(() => res.status(500).send())
  },

  addNote: (req, res) => {
    const db = req.app.get("db");
    const {project_id, user_id, content, title} = req.body;

    db.addnotes([project_id, user_id, content, title])
    .then(notes => res.status(200).send(notes))
    .catch(() => res.status(500).send())
  }, 

  updateSettings: (req, res) =>{
    const db = req.app.get("db");
    const {user_id, user_name, profile_img, rate} = req.body;

    db.update_settings([user_id, user_name, profile_img, rate])
    .then(settings => res.status(200).send(settings))
    .catch(() => res.status(500).send())
  }
  
}