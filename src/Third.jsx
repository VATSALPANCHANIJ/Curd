import React, { useEffect, useState } from 'react'

const Third = () => {
    const [alldata, setAlldata] = useState([]);
    const [editid, setEditeid] = useState("");
    const [input, setInput] = useState({
        name: '',
        phone: ''
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput({
            ...input, [name]: value
        })
    }

    const submit = () => {
        if (editid) {
            let data = alldata.filter((item) => {
                if (item.id === editid) {
                    item.name = input.name;
                    item.phone = input.phone;
                }
                return item;
            })
            setAlldata(data);
            setEditeid("");
            localStorage.setItem('third', JSON.stringify(data));

        } else {
            let obj = {
                id: Math.floor(Math.random() * 1000),
                name: input.name,
                phone: input.phone
            }
            let data = [...alldata, obj];
            setAlldata(data);
            localStorage.setItem('third', JSON.stringify(data));

            setInput({
                name: "",
                phone: "",
            })
        }
    }
    const deletedata = (id) => {
        let data = alldata.filter((item) => {
            return item.id !== id;
        })
        localStorage.setItem('third', JSON.stringify(data));
        setAlldata(data);

    }
    const editedata = (id) => {
        let data = alldata.filter((item) => {
            return item.id == id;
        })
        setEditeid(id);
        setInput(data[0]);

    }
    useEffect(() => {
        let ans = JSON.parse(localStorage.getItem('third'));
        if (!ans) {
            setAlldata([]);
        } else {
            setAlldata(ans);
        }
    }, []);
    return (
        <center>
            <br />
            <h1>Prectice table</h1>
            <table>
                <tr>
                    <td>Name</td>
                    <td>
                        <input type="text" onChange={handleChange} value={input.name} name="name" id="" placeholder='Enter the name' />
                    </td>
                </tr>
                <tr>
                    <td>Phone</td>
                    <td>
                        <input type="text" name="phone" onChange={handleChange} value={input.phone} id="" placeholder='Enter the phone' />
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td>
                        {
                            editid ?
                                (
                                    <button type='button' onClick={() => submit()}>Edit</button>
                                ) : (
                                    <button type='button' onClick={() => submit()}>Submit</button>
                                )
                        }

                    </td>
                </tr>
            </table>

            <table border={1}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Action</th>
                    </tr>
                </thead>
                {
                    alldata.map((val) => {
                        const { id, name, phone } = val;
                        return (
                            <tr key={id}>
                                <td>{id}</td>
                                <td>{name}</td>
                                <td>{phone}</td>
                                <td>
                                    <button type='button' onClick={() => deletedata(id)}>Delete</button>
                                    <button type='button' onClick={() => editedata(id)}>Edit</button>
                                </td>
                            </tr>
                        )
                    })
                }
            </table>
        </center>
    )
}

export default Third
