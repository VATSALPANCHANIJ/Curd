import React, { useEffect, useState } from 'react'

const Seven = () => {
    const [alldata, setalldata] = useState([]);
    const [editeid, setEditId] = useState("");
    const [input, setInput] = useState({
        name: '',
    })
    const handlechage = (e) => {
        const { name, value } = e.target
        setInput({
            ...input, [name]: value
        })
    }
    const handlesubmit = () => {
        if (editeid) {
            let data = alldata.filter((item) => {
                if (item.id === editeid) {
                    item.name = input.name
                }return item
            })
            setalldata(data)
            localStorage.setItem('alldata',JSON.stringify(data));
            setEditId("");
        } else {
            let obj = {
                id: Math.floor(Math.random() * 1000),
                name: input.name,
            }
            let data = [...alldata, obj]
            setalldata(data)
            localStorage.setItem('alldata', JSON.stringify(data));
        }
        setInput({
            name: "",
        })
    }
    const deletedata = ((id) => {
        let data = alldata.filter((item) => {
            return item.id !== id
        })
        setalldata(data);
        localStorage.setItem('alldata', JSON.stringify(data));
    });
    const editedata = ((id) => {
        let data = alldata.filter((item) => {
            return item.id === id;
        })
        setInput(data[0]);
        setEditId(id);
    });
    useEffect(() => {
        let data = JSON.parse(localStorage.getItem('alldata'));
        if (!data) {
            setalldata("");
        } else {
            setalldata(data);
        }
    }, [])
    return (
        <center>
            <table>
                <tr>
                    <td><input type="name" name='name' onChange={handlechage} value={input.name} /></td>
                    <td>
                        {
                            editeid ? (
                                <button onClick={() => handlesubmit()}>Edit</button>
                            ) : (
                                <button onClick={() => handlesubmit()}>Submit</button>
                            )
                        }
                    </td>
                </tr>
            </table>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        alldata.map((value, key) => {
                            const { id, name } = value;
                            return (
                                <tr key={key}>
                                    <td>{id}</td>
                                    <td>{name}</td>
                                    <td>
                                        <button onClick={() => deletedata(id)}>Delete</button>
                                        <button onClick={() => editedata(id)}>Edit</button>
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

export default Seven;
