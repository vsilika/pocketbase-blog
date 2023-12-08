import { useNavigate } from "react-router-dom";
import { useBlogerStore } from "../../store";
//@ts-expect-error
import pb from '../../lib/pocketbase';


const Nav = () => {

  const store: any = useBlogerStore()
  const navigate = useNavigate()

  const handleLogout = async (e: any) => {
    e.preventDefault()
    try {
      pb.authStore.clear()
      navigate('/')
      store.accountDataAll(null)
    }
    catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="nav">
      <p>
        {store.accountData?.record?.name}
      </p>
      <button onClick={handleLogout}>
        LOGOUT
      </button>
    </div>
  );
}

export default Nav;
