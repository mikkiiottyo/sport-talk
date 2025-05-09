import React from 'react'

const signup = () => {
  return (
    <div>
      <h2>Sign Up</h2>
      <form>
        <div>
            <label htmlFor="name">Name</label>
            <input type="text" placeholder='Enter Name' required />
        </div>
        <div>
            <label htmlFor="email">Email</label>
            <input type="email" placeholder='Enter Email' required />
        </div>
        <div>
            <label htmlFor="Password">Password</label>
            <input type="password" placeholder='*******' required />
        </div>
        <button>Sing Up</button>
      </form>
    </div>
  )
}

export default signup
