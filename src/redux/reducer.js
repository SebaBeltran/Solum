import axios from "axios"
const initialState = {
  user: {},
  clients:[],
  currentClientId:""
}

const GET_USER_DATA = "GET_USER_DATA";
const GET_CLIENTS_DATA = "GET_CLIENTS_DATA";
const UPDATE_CLIENT = "UPDATE_CLIENT";
const ADD_CLIENT = "ADD_CLIENT";
const GET_CURRENT_CLIENT = "GET_CURRENT_CLIENT";
const DELETE_CLIENT = "DELETE CLIENT";

export function getUser() {
  let userData = axios.get("/auth/user").then(res => {
    return res.data
  })
  return {
    type:GET_USER_DATA,
    payload: userData
  }
}

export function getData(id){
  let clientData = axios.get(`/api/${id}/clients`).then(res => res.data);
  return {
    type: GET_CLIENTS_DATA,
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
  console.log("callededsf")
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


export default function reducer(state = initialState, action){
  console.log(action)
  switch (action.type){
    //case GET_USER_DATA + "_PENDING":
    //case GET_USER_DATA + "_FULFILLED":
    //case GET_USER_DATA + "_REJECTED":
    case GET_USER_DATA + "_FULFILLED":
      return Object.assign({}, state, {user: action.payload});
    case GET_CLIENTS_DATA + "_FULFILLED":
      return Object.assign({}, state, {clients: action.payload});
    case GET_CURRENT_CLIENT:
      return Object.assign({}, state, {currentClientId: action.payload});
    case UPDATE_CLIENT + "_FULFILLED":
      return Object.assign({}, state, {clients: action.payload});    
    case ADD_CLIENT + "_FULFILLED":
      return Object.assign({}, state, {clients: action.payload});  
    case DELETE_CLIENT + "_FULFILLED":
    console.log(action.payload)
      return Object.assign({}, state, {clients: action.payload});         
    
    default:
    return state;
  }
  
}