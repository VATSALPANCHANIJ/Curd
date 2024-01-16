import React, { useEffect, useState } from 'react'

const Final = () => {
    const [alldata, setAlldata] = useState([]);
    const [editid, setEditid] = useState("");
    const [input, setInput] = useState({
        name: ''
    });
    const handlechange = (e) => {
        const { name, value } = e.target;
        setInput({
            ...input, [name]: value
        })
    }
    const submitdata = () => {
        if (editid) {
            let data = alldata.filter((item) => {
                if (item.id === editid) {
                    item.name = input.name
                }
                return item
            })
            setAlldata(data);
            setEditid("");
            localStorage.setItem("vatsalkeydata", JSON.stringify(data));
        } else {
            let obj = {
                id: Math.floor(Math.random() * 10000),
                name: input.name
            }
            let data = [...alldata, obj];
            setAlldata(data);
            localStorage.setItem("vatsalkeydata", JSON.stringify(data));
        }
        setInput({
            name: ""
        })
    }
    const deletedata = (id) => {
        let data = alldata.filter((val) => {
            return val.id !== id;
        })
        setAlldata(data);
        localStorage.setItem("vatsalkeydata", JSON.stringify(data));
    }
    const editdata = (id) => {
        let data = alldata.filter((val) => {
            return val.id === id;
        });
        setInput(data[0]);
        setEditid(id);
    }
    useEffect(() => {
        let data = JSON.parse(localStorage.getItem("vatsalkeydata"));
        if(!data){
            setAlldata([])
        }else{
            setAlldata(data);
        }
    },[])
    return (
        <center>
            <table>
                <tr>
                    <td>Name</td>
                    <td><input type="text" name="name" onChange={handlechange} value={input.name} /></td>
                    <td>
                        {
                            editid ? (<button onClick={() => submitdata()}>Edit</button>)
                                : (<button onClick={() => submitdata()}>submit</button>)
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

export default Final;

