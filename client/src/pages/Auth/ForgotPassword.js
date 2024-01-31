// import Layout from '../../components/Layout/Layout'
// import React, { useState } from "react";
// // import Layout from "./../../components/Layout/Layout";
// import axios from "axios";
// import { useLocation, useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import "../../styles/AuthStyle.css";
// import { useAuth } from "../../context/auth";
// const ForgotPassword = () => {
//     const [email, setEmail] = useState("");
//     const [newpassword, setnewpassword] = useState("");
//     const [answer, setanswer] = useState("");

//     const navigate = useNavigate();

//     // form function
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const res = await axios.post("/api/v1/auth/forgot-password", {
//                 email,
//                 newpassword,
//                 answer,
//             });
//             if (res && res.data.success) {
//                 toast.success(res.data && res.data.message);
                
                
//                 //user Jahan par aakar login kiya hai use wahanpar hi redirect karn ahai

//                 //state wala variable - spinner.js ke 16 line par hai
//                 navigate("/login");
//             } else {
//                 toast.error(res.data.message);
//             }
//         } catch (error) {
//             console.log(error);
//             toast.error("Something went wrong");
//         }
//     };
//     return (
//         <Layout title={"Forgot Password"}>
//             <div className="form-container ">
//                 <form onSubmit={handleSubmit}>
//                     <h4 className="title">Reset Password</h4>

//                     <div className="mb-3">
//                         <input
//                             type="email"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             className="form-control"
//                             id="exampleInputEmail1"
//                             placeholder="Enter Your Email "
//                             required
//                         />
//                     </div>
//                     <div className="mb-3">
//                         <input
//                             type="text"
//                             value={answer}
//                             onChange={(e) => setanswer(e.target.value)}
//                             className="form-control"
//                             id="exampleInputEmail1"
//                             placeholder="Enter Your Favourite sport"
//                             required
//                         />
//                     </div>
//                     <div className="mb-3">
//                         <input
//                             type="password"
//                             value={newpassword}
//                             onChange={(e) => setnewpassword(e.target.value)}
//                             className="form-control"
//                             id="exampleInputPassword1"
//                             placeholder="Enter Your Password"
//                             required
//                         />
//                     </div>

                    
//                     <button type="submit" className="btn btn-primary">
//                         Reset
//                     </button>
//                 </form>
//             </div>

//         </Layout>
//     )
// }

// export default ForgotPassword
import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../../styles/AuthStyle.css";

const ForgotPasssword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");

  const navigate = useNavigate();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/forgot-password", {
        email,
        newPassword,
        answer,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);

        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log("Error in ForgotPassword/Auth",error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout title={"Forgot Password - Ecommerce APP"}>
      <div className="form-container ">
        <form onSubmit={handleSubmit}>
          <h4 className="title">RESET PASSWORD</h4>

          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Email "
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your favorite Sport Name "
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Your Password"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            RESET
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default ForgotPasssword;