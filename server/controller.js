module.exports = {
  getNotes: (req, res) =>{
    const db = req.app.get("db");

    db.get_all()
    .then(notes => res.status(200).send(notes)).catch(()=>res.sendStatus(500))
  },

  getClients: (req, res) => {
    const db =  req.app.get("db");

    db.get_clients([req.params.id])
    .then(clients => {
      res.status(200).send(clients)})
      .catch(()=>res.sendStatus(500))
  },

  updateClient: (req, res) => {
    const db =  req.app.get("db");
    const {client_id, firstNameInput, lastNameInput, pos, company, email, phone, client_pic} = req.body

    db.update_client([client_id, firstNameInput, lastNameInput, pos, company, email, phone, client_pic])
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
    console.log(req.params.id);
    db.delete_client([req.params.id])
    .then(clients => res.status(200).send(clients))
    .catch(()=>res.status(500).send())
  }
}