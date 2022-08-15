import userModel from "../models/user.js";

class userProfileControllers {
  //get user profile
  static PublicProfile = async (req, res, next) => {
    const userId = req.params.id;
    console.log(userId, "user id");
    try {
      const user = await userModel
        .findById(userId)
        .select("firstName  secondName  profileImagePath");
      const userBlogs = await blogModel.find({ creator: userId });

      res
        .status(202)
        .json({ message: "data loaded", user: user, blogs: userBlogs });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: "something went wrong please try again" });
    }
  };

  //get the private profile : this will be available  for the owner of the account only
  static getPrivateProfile = async (req, res, next) => {
    const userId = req.user._id;
    try {
      const user = await userModel
        .findById(userId)
        .select("firstName  secondName email  profileImagePath");
      const userBlogs = await blogModel.find({ creator: userId });

      res
        .status(202)
        .json({ message: "data loaded", user: user, blogs: userBlogs });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: "something went wrong please try again" });
    }
  };
}


export default userProfileControllers;
