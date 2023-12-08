import { useState } from 'react'
//@ts-expect-error
import pb from '../../lib/pocketbase';
import { useNavigate } from 'react-router-dom';


const Register = () => {
  const navigation = useNavigate()
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [passwordConfirm, setPasswordConfirm] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [setVisiblePassword, setSetVisiblePassword] = useState<boolean>(false)
  const [setVisiblePasswordConfirm, setSetVisiblePasswordConfirm] = useState<boolean>(false)
  const [error, setError] = useState<any>('')

  const handleRegister = async (e: any) => {
    e.preventDefault()
    try {
      const authData = await pb
        .collection("users")
        .create(
          {
            username: username,
            email: email,
            password: password,
            passwordConfirm: passwordConfirm
          }
        )
      navigation('/posts')
    } catch (error: any) {
      console.log(error.message)
      setError(error.message)
    }
  }


  return (
    <div className="login-register">
      <p>is logged in:{pb.authStore.isValid.toString()}</p>
      <form>
        <input
          type="text"
          placeholder='username'
          onChange={(e) => setUsername(e.target.value)}
        />
        <input type="text"
          placeholder='email'
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type={setVisiblePassword ? 'text' : 'password'}
          placeholder='password'
          onChange={(e) => setPassword(e.target.value)}
        />
        {/* <button onClick={() => setSetVisiblePassword(!setVisiblePassword)} type='button'>visible</button> */}

        <input
          type={setVisiblePasswordConfirm ? 'text' : 'password'}
          placeholder='passwordConfirm'
          onChange={(e) => setPasswordConfirm(e.target.value)}
        />
        {/* <button
            onClick={() => setSetVisiblePasswordConfirm(!setVisiblePasswordConfirm)}
            type='button'
          >
            visible
          </button> */}
        <button style={{ all: 'unset', }}>e</button>
        <button type='submit' onClick={handleRegister} style={{ opacity: username && password && passwordConfirm && email ? 1 : 0.5 }}>
          REGISTER
        </button>
      </form>
      {error && <p>{error}</p>}
      <div className='register-link'>
        <span>
          Already have an account?
        </span>
        <button onClick={() => navigation('/')} type='button'>
          LOGIN
        </button>
      </div>
    </div>
  )
}

export default Register;