const bcrypt=require("bcrypt")
const hash=async(plainText)=>{
    const salt=await bcrypt.genSalt(Number(process.env.SALTROUNDS))
    let hashData=await bcrypt.hash(plainText,salt)
    return hashData
}

module.exports={hash}