import React, { useEffect, useState } from 'react'

const Five = () => {
    const [alldata, setAlldata] = useState([]);
    const [editid, setEditId] = useState("");
    const [input, setInput] = useState({
        name: ''
    })

    const handlechage = (e) => {
        const { name, value } = e.target;
        const ans = setInput({
            ...input, [name]: value
        })
    }
    const handlesubmt = () => {
        if (editid) {
            let ans = alldata.filter((item) => {
                if (item.id === editid) {
                    item.name = input.name;
                }
                return item
            })
            setAlldata(ans);
            setEditId("");
            localStorage.setItem('datastore', JSON.stringify(ans));

        } else {
            let obj = {
                id: Math.floor(Math.random() * 1000),
                name: input.name,
            }
            console.log(obj);
            let datastore = [...alldata, obj];
            setAlldata(datastore);
            localStorage.setItem("datastore", JSON.stringify(datastore));
        }
        setInput({
            name: ""
        })
    };
    const deletedata = (id) => {
        let data = alldata.filter((val) => {
            return val.id !== id;
        })
        setAlldata(data);
        localStorage.setItem("datastore", JSON.stringify(data));
    }
    const editdata = (id) => {
        let data = alldata.filter((val) => {
            return val.id === id;
        })
        setInput(data[0]);
        setEditId(id);
    };
    useEffect(() => {
        let data = JSON.parse(localStorage.getItem("datastore"));
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
                    <td><input type="text" onChange={handlechage} value={input.name} name='name' /></td>
                    <td>
                        {
                            editid ? (
                                <button onClick={() => handlesubmt()}>Edit</button>

                            ) : (
                                <button onClick={() => handlesubmt()}>Submit</button>
                            )
                        }
                    </td>
                </tr>
            </table>
            <br />
            <table border={1} style={{ textAlign: "center" }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        alldata.map((val, key) => {
                            const { id, name } = val;
                            return (
                                <tr key={id}>
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
export default Five;
