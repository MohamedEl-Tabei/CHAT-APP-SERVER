const getErrorMessage=(error)=>{
    const message=error.message
    if(error.code)
    {
        const x=message.indexOf('\"')+1
        const y=message.indexOf('\" }')
        return `${message.slice(x,y)} has an account.`
    }
    return message
}



module.exports={getErrorMessage}