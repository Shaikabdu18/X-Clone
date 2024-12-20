import User from "../models/user.model.js";


export const followUser = async (req, res,next) => {
    try {
        const { userIdToFollow } = req.body;
        const userId = req.user.id;

        if (userId === userIdToFollow) {
            return res.status(400).json({ message: "You can't follow yourself." });
        }

        const user = await User.findById(userId);
        const userToFollow = await User.findById(userIdToFollow);

        if (!userToFollow) {
            return res.status(404).json({ message: 'User to follow not found.' });
        }

        if (user.following.includes(userIdToFollow)) {
            return res.status(400).json({ message: 'You are already following this user.' });
        }

        user.following.push(userIdToFollow);
        await user.save();

        return res.json({ message: `You are now following ${userToFollow.username}.` });
    } catch (error) {
        next(error)
    }
};

export const unFollow = async (req, res,next) => {
    try {
        const { userId } = req.params;

        const userToUnfollow = await User.findById(userId);
        const currentUser = await User.findById(req.user.id);

        if (!userToUnfollow) {
            return res.status(404).json({ error: "User not found." });
        }

        currentUser.following = currentUser.following.filter(id => id.toString() !== userId);
        userToUnfollow.followers = userToUnfollow.followers.filter(id => id.toString() !== req.user.id);

        await currentUser.save();
        await userToUnfollow.save();

       return res.json({ message: "Unfollowed successfully." });
    } catch (error) {
       next()
    }
};
