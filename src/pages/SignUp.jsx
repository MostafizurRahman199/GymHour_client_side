import React from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router";
import signupImage from "../assets/signup.png";
import { useFirebaseAuth } from "../Providers/AuthProvider";
import Swal from "sweetalert2";

const SignUp = () => {
  const { createUser } = useFirebaseAuth();
  const navigate = useNavigate();





  const handleSignUp = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const name = e.target.name.value;
    const password = e.target.password.value;
    const country = e.target.country.value;
    const profession = e.target.profession.value;
    const photoURL = e.target.photoURL.value;
    console.log(email, password);

 

    createUser(email, password)
    .then(result=>{
       
        if( result?.metadata?.creationTime)
         {
            const createdAt = result.metadata.creationTime;

         const newUser = {
            name,
            email,
            country,
            profession,
            photoURL,
            createdAt
        }
            

        fetch('https://coffee-houser-server-second.vercel.app/users', {
            method:"POST",
            headers:{
                'content-type':"application/json"
            },
            body: JSON.stringify(newUser)

        }).then(res => res.json())
        .then(data => {
            if(data.insertedId){
                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "Registration Successful",
                    footer: '<Link to="/signin">Now go please SignIn</Link>'
                  });
                  navigate("/signin")
            }

        })
         }else{
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
                footer: `${result}`
              });
        }
    })
  };





  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 font_2">
      <div className="lg:flex lg:w-2/3 w-full bg-white rounded-lg shadow-lg overflow-hidden flex items-center" >
        {/* Left Side: Form */}

        <div className="lg:w-1/2 bg-cover bg-center hidden lg:block">
          <img src={signupImage} alt="" />
        </div>

        {/* Right Side: info*/}
        <div className="lg:w-1/2 p-8">
          <h2 className="text-3xl font-semibold mb-6  font_1">Create an Account</h2>

          <form className="space-y-4" onSubmit={handleSignUp}>
            <input
              type="text"
              placeholder="Name"
              name="name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
            <input
              type="text"
              placeholder="Country (optional)"
              name="country"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
            <input
              type="text"
              placeholder="Profession (optional)"
              name="profession"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
            <input
              type="text"
              placeholder="Photo URL (optional)"
              name="photoURL"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
            <Link
              to={"/signin"}
              className="text-sm text-black hover:underline"
            >
              Already have an Account ? SignIn
            </Link>
            <button
              type="submit"
              className="w-full py-2 bg-black text-white font-semibold rounded-md hover:bg-black focus:outline-none focus:ring-2 focus:ring-black"
            >
              Register
            </button>
          </form>

          <div className="mt-4 text-center">
            <button className="w-full flex items-center justify-center py-2 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black">
              <FcGoogle className="mr-2 text-xl" />
              Sign in with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
