import React,{useState,useCallback} from "react"
import styles from './searchcontainer.module.css'
import Input from "../../basic_components/input/input"

import { search} from "../../store/action/userAppStorage";
import { useDispatch} from "react-redux";
import { useNavigate} from "react-router-dom";

const SearchContainer = (props) => {
    //initialising redux
    let dispatch = useDispatch()
    let navigate = useNavigate()
    let [input,setInput] = useState()

    let changeHandler = useCallback((e)=>{
        let value = e.target.value
        setInput(value)
    },[])

    let searchFun = useCallback((e)=>{
        e.preventDefault()
        //searching algorithm
        /*  i will get the data after 20s*/
        setTimeout(async()=>{
            let res = await dispatch(search(input))
            if(res.admin){
                navigate('/adminsearched')
            }else{
                navigate("/searched")
            }

        },5000)


    },[search])
    
    return <form  className={`${styles.search} ${props.className}`} onSubmit={searchFun} >
        <div className={styles.searchbutton} onClick={searchFun}>
            <span className='material-icons'>
                search
            </span>
        </div>
        <Input className={styles.search_input}  placeholder='search ' onChange={changeHandler}/>
  
    </form>
        
}
export default React.memo(SearchContainer)