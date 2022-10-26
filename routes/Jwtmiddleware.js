
import jwt from "jsonwebtoken"

export const jwtmiddle = (req, res, next) => {

    const AuthHeader = req.headers.token; 
    // console.log(AuthHeader)

    if (AuthHeader) {
       const token=AuthHeader.split("  ")[1]
        jwt.verify(token, process.env.JWT_SEC, (err, user) => {
            if (err) res.status(403).json("Token is not validate");
            // user = req.user;
            req.user=user;
            next()
        })

    } else {
        return res.status(401).json("You Are Not Authanticated..")

    }
}

 export const JwtAndAuthMiddleware=(req, res, next) =>{

    jwtmiddle(req, res, () =>{
        if( req.user.id === req.params.id || res.user.isAdmin){
            next()

        }else {
            return res.status(403).json("You are not authorized to do that")
        }

    })

}
 export const JwtAndAdminMiddleware=(req, res, next) =>{

    jwtmiddle(req, res, () =>{
        if(res.user.isAdmin){
            next()

        }else {
            return res.status(403).json("You are not authorized to do that")
        }

    })

}