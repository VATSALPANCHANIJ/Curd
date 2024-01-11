import React, { useState, useEffect } from 'react'

const Six = () => {
    const [editid, setEditId] = useState("");
    const [alldata, setAlldata] = useState([]);
    const [input, setInput] = useState({
        name: '',
    })

    const handlechange = (e) => {
        const { name, value } = e.target;
       setInput({
            ...input, [name]: value
        })
    }
    const submitdata = () => {
        if (editid) {
            let ans = alldata.filter((item) => {
                if (item.id == editid) {
                    item.name = input.name;
                }
                return item
            })
            setAlldata(ans);
            setEditId("");
            localStorage.setItem('data', JSON.stringify(ans));
        } else {
            let obj = {
                id: Math.floor(Math.random() * 1000),
                name: input.name
            }
            let data = [...alldata, obj];
            setAlldata(data);
            localStorage.setItem('data', JSON.stringify(data));
        }
        setInput({
            name: ""
        })
    }
    const editdata = (id) => {
        let data = alldata.filter((item) => {
            return item.id == id;
        })
        setEditId(id);
        setInput(data[0]);
    }
    const deletedata = (id) => {
        let data = alldata.filter((item) => {
            return item.id !== id;
        })
        setAlldata(data);
        localStorage.setItem("data", JSON.stringify(data));
    };
    useEffect(() => {
        let data = JSON.parse(localStorage.getItem('data'));
        if (!data) {
            setAlldata([]);
        } else {
            setAlldata(data);
        }
    }, []);
    return (
        <center>
            <table>
                <tr>
                    <td><input type="text" onChange={handlechange} name='name' value={input.name} placeholder='Enter the Taks' /></td>
                    <td>
                        {
                            editid ? (
                                <button onClick={() => submitdata()}>Edit</button>

                            ) : (
                                <button onClick={() => submitdata()}>Submit</button>
                            )
                        }
                    </td>
                </tr>
            </table>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Taks</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        alldata.map((val, key) => {
                            const { id, name } = val;
                            return (
                                <tr key={key}>
                                    <td>{id}</td>
                                    <td>{name}</td>
                                    <td>
                                        <button onClick={() => deletedata(id)}>Delete</button>
                                        <button onClick={() => editdata(id)}>Edit</button>
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

export default Six;
