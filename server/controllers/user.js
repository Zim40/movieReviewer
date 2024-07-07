import User from '../models/user.js';

const userController = {
    async createUser(req, res) {
        try {
            const user = User.create(req.body);
            return res.status(200).json({message: "New user created!", data: { user }});
        } catch (err) {
            console.error("Error creating user");
            return res.status(500).json({message: "Server Error!"});
        }
    }
}

export default userController;