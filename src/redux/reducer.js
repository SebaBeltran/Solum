import axios from "axios"
const initialState = {
  user: {},
  clients:[],
  currentClientId:"",
  projects: [],
  currentProjectId:"",
  currentDate: "",
  project_start_date: {},
  project_end_date: {},
  tasks:[],
  totalTime: ""
}

const GET_USER_DATA = "GET_USER_DATA";
const GET_CLIENT = "GET_CLIENT";
const UPDATE_CLIENT = "UPDATE_CLIENT";
const ADD_CLIENT = "ADD_CLIENT";
const GET_CURRENT_CLIENT = "GET_CURRENT_CLIENT";
const DELETE_CLIENT = "DELETE CLIENT";

const GET_PROJECTS = "GET PROJECTS";
const GET_CURRENT_PROJECT = "GET_CURRENT_PROJECT";
const ADD_PROJECT = "ADD PROJECT";
const DELETE_PROJECT = "ADD PROJECT";
const UPDATE_PROJECT = "ADD PROJECT";

const GET_TASKS = "GET TASK";
const ADD_TASK = "ADD TASK";
const DELETE_TASK = "DELETE TASK";
const UPDATE_TASK = "UPDATE TASK"
const GET_TIME = "GET TIME"

export function getUser() {
  let userData = axios.get("/auth/user").then(res => {
    return res.data
  })
  return {
    type:GET_USER_DATA,
    payload: userData
  }
}

export function getClients(id){
  let clientData = axios.get(`/api/clients/${id}`).then(res => res.data);
  return {
    type: GET_CLIENT,
    payload: clientData
  }
}

export function currentClient(clientId){
  return{
    type: GET_CURRENT_CLIENT,
    payload: clientId
  }
}

export function deleteClient(clientId){
  let clientsList = axios.delete(`/api/clients/${clientId}`).then(res => res.data)
  return{
    type: DELETE_CLIENT,
    payload: clientsList
  }
}

export function updateClient(body){
  let updatedClient = axios.put(`/api/clients/${body.client_id}`, body).then(res => res.data);
  return {
    type: UPDATE_CLIENT,
    payload:updatedClient
  }
}

export function addClient(userId, body){
  let copyBody = Object.assign({}, body, {user_id: userId})
  let updatedClientsList = axios.post("/api/clients", copyBody).then(res => res.data);
  return{
    type: ADD_CLIENT,
    payload: updatedClientsList
  }
}

export function getProjects(id){
  let projectsData = axios.get(`/api/projects/${id}`).then(res => res.data);
  return{
    type: GET_PROJECTS,
    payload: projectsData
  }
}
export function currentProject(projectId){
  return{
    type: GET_CURRENT_PROJECT,
    payload: projectId
  }
}
export function addProject(userId, body){
  let copyBody = Object.assign({}, body, {user_id: userId})
  let updatedProjectsList = axios.post("/api/projects", copyBody).then(res => res.data);

  return{
    type: ADD_PROJECT,
    payload: updatedProjectsList
  }
}

export function deleteProject(projectId){
  let projectsList = axios.delete(`/api/projects/${projectId}`).then(res => res.data)
  return{
    type: DELETE_PROJECT,
    payload: projectsList
  }
}

export function updateProject(body){
  let updatedProject = axios.put(`/api/projects/${body.client_id}`, body).then(res => res.data);
  return {
    type: UPDATE_PROJECT,
    payload:updatedProject
  }
}

export function getTasks(id){
  let tasks = axios.get(`/api/tasks/${id}`).then(res => res.data);
  return{
    type: GET_TASKS,
    payload: tasks
  }
}

export function addTask(body){
  let updatedTaskList = axios.post("/api/tasks", body).then(res => res.data);

  return{
    type: ADD_TASK,
    payload: updatedTaskList
  }
}

export function deleteTask(taskId){
  let taskList = axios.delete(`/api/tasks/${taskId}`).then(res => res.data)
  return{
    type: DELETE_TASK,
    payload: taskList
  }
}

export function updateTask(body){
    console.log(body)
  let updatedTask = axios.put(`/api/tasks/${body.task_id}`, body).then(res => res.data);
  // let updateTime = axios.put(`/api/projects/`).then(res => res.data)
  return{
    type: UPDATE_TASK,
    payload: updatedTask
  }
}

export function getTotalTime(id){
    let time = axios.get(`/api/tasks/${id}`).then(res => {console.log(res.data);res.data});
    console.log(time)
  return{
    type: GET_TIME,
    payload: time
  }
}

export default function reducer(state = initialState, action){
  switch (action.type){
    //case GET_USER_DATA + "_PENDING":
    //case GET_USER_DATA + "_FULFILLED":
    //case GET_USER_DATA + "_REJECTED":
    case GET_USER_DATA + "_FULFILLED":
      return Object.assign({}, state, {user: action.payload});
    case GET_CLIENT + "_FULFILLED":
      return Object.assign({}, state, {clients: action.payload});
    case GET_CURRENT_CLIENT:
      return Object.assign({}, state, {currentClientId: action.payload});
    case UPDATE_CLIENT + "_FULFILLED":
      return Object.assign({}, state, {clients: action.payload});    
    case ADD_CLIENT + "_FULFILLED":
      return Object.assign({}, state, {clients: action.payload});  
    case DELETE_CLIENT + "_FULFILLED":
      return Object.assign({}, state, {clients: action.payload});    
    case GET_PROJECTS + "_FULFILLED":
      return Object.assign({}, state, {projects: action.payload})
    case ADD_PROJECT + "_FULFILLED":
      return Object.assign({}, state, {projects: action.payload})         
    case GET_CURRENT_PROJECT:
      return Object.assign({}, state, {currentProjectId: action.payload}); 
    case DELETE_PROJECT+ "_FULFILLED":
      return Object.assign({}, state, {projects: action.payload});

    case GET_TASKS + "_FULFILLED":
      return Object.assign({}, state, {tasks: action.payload});
    case ADD_TASK + "_FULFILLED":
      return Object.assign({}, state, {tasks: action.payload});
    case DELETE_TASK + "_FULFILLED":
      return Object.assign({}, state, {tasks: action.payload});  
    case UPDATE_TASK + "_FULFILLED":
      return Object.assign({}, state, {tasks: action.payload});
    case GET_TIME + "_FULFILLED":      
      return Object.assign({}, state, {totalTime: action.payload});

    default:
    return state;
  }
  
}