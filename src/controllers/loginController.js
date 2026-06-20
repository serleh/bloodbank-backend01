import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import User from '../models/User.js'
import Donor from '../models/Donor.js'


export const loginUser = async(req,res,next)=>{
    try{
        const {username,password} = req.body

        // checking if user exists
        const user = await User.findOne({username})

        if(!user){
            return res.status(401).json({error:"Invalid username or password"})
        }

        // compare the password
        const passwordCorrect = await bcrypt.compare(password,user.passwordHash)

          if (!passwordCorrect) {
      return res.status(401).json({
        error: "Invalid username or password",
      });
    }

    // create token
    const userForToken= {
        username:user.username,
        id: user.id

    }
    const token = jwt.sign(userForToken,process.env.SECRET,{expiresIn:"2d"})
    const donor = await Donor.findOne({ user: user._id });

    res.status(200).json({token,username:user.username, donor})

    }catch(error){next()}
}