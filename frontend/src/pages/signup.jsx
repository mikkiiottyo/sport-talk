import React from 'react'

const Signup = () => {
  return (
    <div className="flex jusify-center items-center min-h-screen bg-gray-100">
        <div className="border shadow p-6 w-80 bg-white">
      <h2 className="text-2x1 font-bold mb-4">Sign Up</h2>
      <form>
        <div className="mb-4">
            <label classname="block text-grey-700">Name</label>
            <input type="text" classname="w-full px-3 py-2 border" placeholder='Enter Username' required />
        </div>
        <div className="mb-4">
            <label classname="block text-grey-700">Email</label>
            <input type="email"  classname="w-full px-3 py-2 border" placeholder='Enter Email' required />
        </div>
        <div className="mb-4">
            <label  classname="block text-grey-700">Password</label>
            <input type="password"  classname="w-full px-3 py-2 border" placeholder='*******' required />
        </div>
        <div className="mb-4">
        <button type="submit" className="w-full bg-teal-600 text-white py-2 ">Sing Up</button>
        <p className="text-center">
            Already have an Account? <a href="">Login</a>
        </p>
        </div>
      </form>
      </div>
    </div>
  )
}

export default Signup
