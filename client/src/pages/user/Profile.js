import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'
import { useAuth } from '../../context/auth';
import axios from 'axios';
import toast from 'react-hot-toast';
import "../../styles/AuthStyle.css";

const Profile = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    const { auth, setAuth } = useAuth();

    //get User data

    useEffect(() => {
        const { email, name, phone, address } = auth?.user;
        setName(name);
        setPhone(phone);
        setEmail(email);
        setAddress(address);


    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const {data} = await axios.put("/api/v1/auth/profile", {
                name,
                email,
                password,
                phone,
                address,

            });
            if(data?.error){
                toast.error("Something went wrong")
            }
            else{
                setAuth({...auth,user:data?.updatedUser})
                //updating localStorage
                //jab bhi data lena hi to hame localStorage se parse karna hota hai
                let ls = localStorage.getItem("auth");
                //When you retrieve data from localStorage, it's returned as a string. If you want to work with this data as a JavaScript object, you use JSON.parse() to convert the string back into an object.
                ls = JSON.parse(ls);
                ls.user = data?.updatedUser
                //jab localstorage ko sned karna hota hai to hame JSON.stringiy me convert karna parta hai
                //When you want to store a JavaScript object in localStorage, you need to convert it into a string first because localStorage can only store strings.JSON.stringify() takes a JavaScript object and returns a JSON string 

                localStorage.setItem("auth",JSON.stringify(ls))
            }

        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };





    return (
        <Layout title={"Your Profile"}>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <UserMenu />

                    </div>
                    <div className="col-md-9">
                        <form onSubmit={handleSubmit}>
                            <h4 className="title">USER PROFILE</h4>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="form-control"
                                    id="exampleInputEmail1"
                                    placeholder="Enter Your Name"
                                    
                                    autoFocus
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="form-control"
                                    id="exampleInputEmail1"
                                    placeholder="Enter Your Email "
                                    
                                    disabled
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="form-control"
                                    id="exampleInputPassword1"
                                    placeholder="Enter Your Password"
                                    
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="form-control"
                                    id="exampleInputEmail1"
                                    placeholder="Enter Your Phone"
                                    
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    className="form-control"
                                    id="exampleInputEmail1"
                                    placeholder="Enter Your Address"
                                    
                                />
                            </div>

                            <button type="submit" className="btn btn-primary">
                                Update
                            </button>
                        </form>

                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Profile