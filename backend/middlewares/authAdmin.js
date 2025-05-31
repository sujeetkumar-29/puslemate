import jwt from "jsonwebtoken";

// admin authentication middleware
const authAdmin = (req, res, next) => {
    try{
        const {atoken}= req.headers
        if(!atoken) {
            return res.status(401).json({ success: false, message: "Authentication token is missing" });
        }
        const token_decode= jwt.verify(atoken, process.env.JWT_SECRET);

        if(token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.status(403).json({ success: false, message: "Forbidden: Invalid token" });
        }

        next(); // Proceed to the next middleware or route handler
    }catch(error) {
        console.error("Error in authAdmin middleware:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }

}
export default authAdmin;