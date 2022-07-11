import React, {  useState } from "react"
import styles from './input.module.css'

//import validationfunctions from validation file
import { validatePhoneNumber, validateEmail, validateText } from '../../utils/validation'

const FormInput = React.memo((props) => {
    let [error, setError] = useState('')
   
    let changeText = (e) => {
        let validateFunction
        if (props.type === 'email') {
            validateFunction = validateEmail
            if (!validateFunction(e.target.value)) {
                setError(validateFunction(e.target.value))
                props.setFormDetails({
                    value: e.target.value,
                    formName: props.formName
                })
                setError("")
                
    
            } else {
                let error = validateFunction(e.target.value)
    
                setError(error)
                props.setFormDetails({
                    value: e.target.value,
                    formName: props.formName
                })
    
            }
        } else if (props.type === 'number') {
            validateFunction = validatePhoneNumber
            if (!validateFunction(e.target.value)) {
                setError(validateFunction(e.target.value))
                props.setFormDetails({
                    value: e.target.value,
                    formName: props.formName
                })
    
            } else {
                let error = validateFunction(e.target.value)
                setError(error)
                props.setFormDetails({
                    value: e.target.value,
                    formName: props.formName
                })
            }

        }else if(props.type === 'text'){
            validateFunction = validateText
            if (!validateFunction(e.target.value)) {
                setError(validateFunction(e.target.value))
                
                props.setFormDetails({
                    value: e.target.value,
                    formName: props.formName
                })
               
    
            } else {
                let error = validateFunction(e.target.value)
                setError(error)
                props.setFormDetails({
                    value: e.target.value,
                    formName: props.formName
                })
            }
        }
        else if(props.type === 'password'){
            validateFunction = validateText
            if (!validateFunction(e.target.value)) {
                setError(validateFunction(e.target.value))
                
                props.setFormDetails({
                    value: e.target.value,
                    formName: props.formName
                })
               
    
            } else {
                let error = validateFunction(e.target.value)
    
                setError(error)
                props.setFormDetails({
                    value: e.target.value,
                    formName: props.formName
                })
            }
        }else if(props.type === 'file'){
            validateFunction = validateText
           
                props.setFormDetails({
                    value: e.target.files[0],
                    formName: props.formName
                })
             
        }
        
    }

    return <div className={styles.form_inputcontainer} >
        <div className={styles.categoryhead}>
            <span style={{ backgroundColor: props.color }} className="material-icons">
                {props.icon}
            </span>
            <h3>{props.label}</h3>

        </div>

        <div className={styles.categorybody}>
            <input style={{ height: props.height }}
              
                type={props.type}
                className={`${styles.input} ${props.class}`}
                onChange={changeText}
                value = {props.value}
            />

        </div>
        {error ? <p style={{ color: 'rgb(180, 60, 126)', fontSize: '1.2rem' }}>{error}</p> : ""}
    </div>

})

export default FormInput  