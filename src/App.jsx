import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

function App() {
  const [data, setData] = useState(null);
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
  });

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => setData(res.data))
      .catch((err) => setData(null));
  }, []);

  const handleEdit = (id, item) => {
    setEditId(id);
    setOpen(true);
    setFormData({
      name: item.name,
      username: item.username,
      email: item.email,
    });
  };

  const handleForm = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDelete = (id) => {
    const tempData = data.filter((item) => item.id !== id);
    setData(tempData);
  };

  const handleClose = () => {
    setOpen(false);
    setEditId(null);
  };

  const handleSave = () => {
    //let index = 0
    const index = data.findIndex((item) => item.id === editId);
    const tempData = data;
    tempData[index].name = formData.name;
    tempData[index].username = formData.username;
    tempData[index].email = formData.email;
    // tempData.push(formData);
    setData(tempData);
    setOpen(false);
    setEditId(null);
  };
  return (
    <>
      <h1>Hello WOrld</h1>
      <table>
        <tr>
          <th>name</th>
          <th>username</th>
          <th>email</th>
        </tr>

        {data && data?.length ? (
          data?.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.username}</td>
              <td>{item.email}</td>
              <td>
                <Button
                  variant="outlined"
                  onClick={() => handleEdit(item.id, item)}
                >
                  Edit
                </Button>
              </td>
              <td>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))
        ) : (
          <p>no data available</p>
        )}
      </table>

      <Dialog
        open={open}
        //onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Edit user info?</DialogTitle>
        <DialogContent>
          {/* <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText> */}
          <input
            type="text"
            name="name"
            value={formData.name}
            placeholder="name"
            onChange={handleForm}
          />
          <input
            type="text"
            name="username"
            value={formData.username}
            placeholder="username"
            onChange={handleForm}
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            placeholder="email"
            onChange={handleForm}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={handleSave} autoFocus>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default App;
