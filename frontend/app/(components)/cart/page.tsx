import type { RootState } from '../../../public/store'
import { useSelector} from 'react-redux'
export default function Cart(){
    const token = useSelector((state : RootState) => state.auth.token);
    const f = () => { try {
        if(!token){
            return alert("Please sign in")
        }
        // const res = await axios.
      }catch(e){
         console.log("Error" , e)
      }
    }
    f();
}