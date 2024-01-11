import React, { useEffect, useState } from 'react'

const Curd = () => {
    //first create alldata usestate .
    const [alldata, setAlldata] = useState([]);
    const [editid, setEditid] = useState("");
    // after create input data .
    const [input, setInput] = useState({
        name: '',
        phone: ''
    });

    // this function  use to get data from input box .
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput({
            ...input, [name]: value
        })
    }

    const submit = () => {
        if (editid) {
            let ans = alldata.filter((item) => {
                if(item.id == editid){
                    item.name = input.name;
                    item.phone= input.phone;
                }
                return item
            })
            setAlldata(ans);
            setEditid("");
            localStorage.setItem('alldata', JSON.stringify(ans));


        }else {
            // enter the data afer click submit that time  
            // object created  that time id, name, phone data addd in object .
            let obj = {
                id: Math.floor(Math.random() * 1000),
                name: input.name,
                phone: input.phone
            }
            // data variable stored in usestate that name alldata in push to object.
            let data = [...alldata, obj];
            // after setAlldata in store data variable .
            setAlldata(data);
            // and data store in localstorge that time one key generated that given any one and 
            // localstorge only string values understand .
            localStorage.setItem('alldata', JSON.stringify(data));
          

            // setInput work that time data enter in localstorge then the clear input box.
        }
        setInput({
            name: "",
            phone: "",
        })

    }

    //delete method work on id based 
    // Explain that time press delete button this time also give id get 
    // this id  mached on localstorge data and item.id !== id
    // that meaning localstorge give and button press id mached 
    // this item deleted and other item again printed in localstorge after the same process.............  
    const deletedata = (id) => {
        let data = alldata.filter((item) => {
            return item.id !== id;
        })
        setAlldata(data);
        localStorage.setItem("alldata", JSON.stringify(data));
       
    }

    // this function work is a some for delete method
    // but some change in item.id == id
    //after the data store in setEditid
    // in input box data show that time setInput single recored get that printing in input box .
    const edit = (id) => {
        let ans = alldata.filter((item) => {
            return item.id == id;
        });
        setEditid(id);
        setInput(ans[0]);
    }

    // useeffect use to refresh the page when the data show in localstorge and display.
    useEffect(() => {
        // that time data is put in localstorge
        let all = JSON.parse(localStorage.getItem('alldata'))
        if (!all) {
            setAlldata([]);
        } else {
            setAlldata(all);
        }
    }, []);
    return (
        <center>
              <br /><br />
            <table border={1}>
                <tr>
                    <td>Name</td>
                    <td><input type="text" name='name' onChange={handleChange} value={input.name} /></td>
                </tr>
                <tr>
                    <td>Phone</td>
                    <td><input type="text" name='phone' onChange={handleChange} value={input.phone} /></td>
                </tr>
                <tr>
                    <td></td>
                    <td>
                        {

                            editid ?
                                (<button type='button' onClick={() => submit()}>Edit</button>)
                                :
                                (<button type='button' onClick={() => submit()}>Submit</button>)
                        }
                    </td>
                </tr>
            </table>
            <br /><br />
        
            <br /><br />
            <table border={1}>

                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
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
                                        <button type='button' onClick={() => edit(id)}> Edit</button>
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

export default Curd;
