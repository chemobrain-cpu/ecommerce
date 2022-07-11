export const validateEmail = (data)=>{
    let error = ""
    if(data.length === 0 ){
        error="field should not be empty"
    }
    else if(data.length <=4 ){
        error="characters size too small"
    }
    else if(!data.match(/^\w+([\.-]?w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)){
        error="email is not valid"
    }
    else{
        error = ""
    }
    return error
}

export const validateText = (data)=>{
    
    let error = ""
    if(data.length === 0 ){
        error="field should not be empty"
        return error
    }
    else if(data.length <=2 ){
        error="characters size too small"
        return error
    }
    else if(!data.match(/[a-zA-Z]/g)){
        error="text is not valid"
        return error
    }
    else{
        error = ""
        return error
    }
    
}
export const validatePhoneNumber = (data)=>{
    let error = ""
    if(data.length === 0 ){
        error="field should not be empty"
    }
    else if(data.length <= 2 ){
        error="characters size too small"
    }
    else if(!data.match(/[0-9]/g)){
        error="number is not valid"
    }
    else{
        error = ""
    }
    return error
}

