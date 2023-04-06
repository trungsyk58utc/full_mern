import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const authHeader = req.header("Authorization");
    const token = authHeader && authHeader.split(" ")[1];

    if(!token) {
        res.status(401).json({
            error: "Access token not found",
        })
    }

    else{
        try {
            const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            const current = new Date().getTime();

            if (current < decode.exp * 1000){
                req.userId = decode.userId;
                next();
            }
        } catch (error) {
            res.status(401).json({
                error: "Access token invalid",
            })
        }
        
    }
}