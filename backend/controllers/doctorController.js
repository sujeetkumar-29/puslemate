import doctorModel from "../models/doctorModel";



const changeAvailablity=async ( req,res)=>{
    try {
        const {docId}=req.body;
        const docData= await doctorModel.findById(docId)
        await doctorModel.findByIdAndUpdate(docId,{available:!docData.available})
        res.json({success:true,message:"Availablity changed"})
    } catch (error) {
         console.log(error)
            res.json({success:false,message:error.message})
    }

}

export { changeAvailablity}


