const deleteOneFromArray=(one,array)=>{
    let newArray=[]
    array.forEach((item) => {
        if (one != item) newArray.push(item);
      });
    return newArray
}



const array={
    deleteOneFromArray
}


module.exports= array