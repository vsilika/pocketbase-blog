//@ts-expect-error
import pb from '../../lib/pocketbase';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../../App.scss";
import { useBlogerStore } from '../../store';

const Login = () => {
  const navigation = useNavigate()
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [setVisiblePassword, setSetVisiblePassword] = useState<boolean>(false)
  const store: any = useBlogerStore();

  const handleLogin = async (e: any) => {
    e.preventDefault()
    try {
      const response = await pb
        .collection("users")
        .authWithPassword(username, password)
      if (response.token !== undefined && response.token !== null && response.token !== '') {
        store.accountDataAll(response)
        navigation('/posts')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="container login-register">
      <form>
        <input
          type="text"
          placeholder='username'
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type={setVisiblePassword ? 'text' : 'password'}
          placeholder='password'
          onChange={(e) => setPassword(e.target.value)}
        />
        {/* <button onClick={() => setSetVisiblePassword(!setVisiblePassword)} type='button'>visible</button> */}
        <button onClick={handleLogin} type='button'>
          login
        </button>
      </form>
      <div className='register-link'>
        <span>
          Don't have an account?
        </span>
        <button onClick={() => navigation('/register')}>Sign up</button>
      </div>

    </div>
  )
}

export default Login;