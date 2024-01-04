import React, { useEffect, useState } from 'react'

const Four = () => {
  const [alldata, setAlldata] = useState([]);
  const [editeid, setEditeid] = useState("")
  const [input, setInput] = useState({
    name: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input, [name]: value
    })
  }
  const submit = () => {
    if (editeid) {
      let data = alldata.filter((item) => {
        if (item.id === editeid) {
          item.name = input.name;
        }
        return item;
      })
      setAlldata(data);
      setEditeid("");
    } else {  
      let obj = {
        id: Math.floor(Math.random() * 2000),
        name: input.name
      }
      let data = [...alldata, obj];
      setAlldata(data);
      localStorage.setItem('four', JSON.stringify(data));
    }

    setInput({
      name: "",
    })
  }
  const deletebutton = (id) => {
    let data = alldata.filter((item) => {
      return item.id !== id;
    })
    setAlldata(data);
    localStorage.setItem('four', JSON.stringify(data));
  }

  const editebutton = (id) => {
    let data = alldata.filter((item) => {
      return item.id == id;
    })
    setEditeid(id);
    setInput(data[0]);
  }

  useEffect(() => {
    let refresh = JSON.parse(localStorage.getItem('four'));
    if (!refresh) {
      setAlldata([]);
    } else {
      setAlldata(refresh);
    }
  }, []);
  return (
    <center>
      <table>
        <tr>
          <td><input type="text" name='name' placeholder='Enter the name' onChange={handleChange} value={input.name} /></td>
          <td>
            {
              editeid ? (
                <button onClick={() => submit()}>Edit</button>

              ) : (
                <button onClick={() => submit()}>Submit</button>
              )
            }
          </td>
        </tr>
      </table>
      <table border={1}>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            alldata.map((itme) => {
              const { id, name } = itme
              return (
                <tr key={id}>
                  <td>{id}</td>
                  <td>{name}</td>
                  <td>
                    <button onClick={() => deletebutton(id)}>Delete</button>
                    <button onClick={() => editebutton(id)}>Edit</button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </center>
  )
}

export default Four;
