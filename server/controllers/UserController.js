import UserModel from '../models/user.model';

export const UserDetails = async (req, res) => {
    try {
        const { UserID } = await req.body;
        if(!UserID) {
            return res.json({
                status: 400,
                message: "Bad Request"
            })
        }

        const user = await UserModel.findById(UserID);
        if(!user) {
            return res.json({
                status: 404,
                message: "User Not Found"
            })
        }

        return res.json({
            status: 200,
            message: "Success",
            data: user
        })

    } catch (error) {
        return res.json ({
            status: 500,
            message: "Internal Server Error"
        })
    }
}