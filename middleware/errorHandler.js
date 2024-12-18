const errorHandler=(err,req,res,next)=>{
    console.error(err.message)
    return res.status(500).json({msg:err.message})
}

export default errorHandler