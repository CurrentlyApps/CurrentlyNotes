
import { useSelector} from "react-redux";
export default function LoginOrProfile () {

  const user = useSelector(state => state.auth);



  return (
    <div className="dropDown">
      <div className="flex flex-row">
        <div className="hidden lg:block">{ user.displayName }</div>
      </div>
      <span className="block text-sm font-medium truncate">
          { user.email }
      </span>
    </div>
  )
}