import React, { useEffect, useState } from 'react'

const SecondCurd = () => {

    const [alldata, setAlldata] = useState([])
    const [editid, setEditId] = useState("");

    const [input, setInput] = useState({
        name: '',
        phone: ''
    })
    const handelChange = (e) => {
        const { name, value } = e.target;
        const ans = setInput({
            ...input, [name]: value
        })
    }
    const submit = () => {
        if (editid) {
            let ans = alldata.filter((item) => {
                if (item.id === editid) {
                    item.name = input.name;
                    item.phone = input.phone;
                }
                return item
            })
            setAlldata(ans);
            setEditId("");
            localStorage.setItem('Se_curd', JSON.stringify(ans));

        } else {

            let obj = {
                id: Math.floor(Math.random() * 1000),
                name: input.name,
                phone: input.phone,
            }
            let data = [...alldata, obj];
            setAlldata(data);
            localStorage.setItem('Se_curd', JSON.stringify(data));
        }

        setInput({
            name: "",
            phone: ""
        })
    }

    //delete
    const deletedata = (id) => {
        console.log(id);
        let data = alldata.filter((item) => {
            return item.id !== id;
        })
        setAlldata(data);
        localStorage.setItem("Se_curd", JSON.stringify(data));
    }
    const editdata = (id) => {
        let data = alldata.filter((item) => {
            return item.id == id;
        });
        setInput(data[0]);
        setEditId(id);
    }

    useEffect(() => {
        let datafunction = JSON.parse(localStorage.getItem('Se_curd'))
        if (!datafunction) {
            setAlldata([]);
        } else {
            setAlldata(datafunction);
        }
    }, []);

    return (
        <center>

            <h2>Prectice Table </h2>
            <table>
                <tr>
                    <label>Name</label>
                    <td><input type="text" onChange={handelChange} value={input.name} name='name' placeholder='Enter the name' /></td>
                </tr>
                <tr>
                    <label>Phone</label>
                    <td><input type="text" onChange={handelChange} value={input.phone} name="phone" id="" placeholder='Enter the Phone' /></td>
                </tr>
                <tr>
                    <td></td>
                    <td>
                        {
                            editid ?
                             (<button type='button' onClick={(e) => submit()}>Edit</button>)
                            :(<button type='button' onClick={(e) => submit()}>Submit</button>)
                        }

                    </td>
                </tr>
            </table>
            <br />
            <br />
            <table border={1}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        alldata.map((val) => {
                            return (
                                <tr key={val.id}>
                                    <td>{val.id}</td>
                                    <td>{val.name}</td>
                                    <td>{val.phone}</td>

                                    <td>
                                        <button type='button' onClick={() => deletedata(val.id)}>delete</button>
                                        <button type='button' onClick={() => editdata(val.id)} >Edit</button>
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

export default SecondCurd;
