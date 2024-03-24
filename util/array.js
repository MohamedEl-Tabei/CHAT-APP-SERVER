const deleteOneFromArray=(one,array)=>{
    let newArray=[]
    array.forEach((item) => {
        if (one.toString() != item.toString()) newArray.push(item);
      });
    return newArray
}
const pushOneToArray=(one,array)=>{
    let newArray=[...array]
    newArray.push(one)
    return newArray

}


const array={
    deleteOneFromArray,pushOneToArray
}


module.exports= array