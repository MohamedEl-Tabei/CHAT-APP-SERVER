const Model = require("../base/model");
const Util = require("../base/util");
const Send = require("../email");
const signup = async (req, res) => {
  try {
    let rememberMe = req.body.rememberMe;
    let newUser = new Model.User(req.body);
    let token = await newUser.createJWT(rememberMe);
    newUser.password = await Util.Hashing.hash(newUser.password);
    await newUser.save();
    res.status(201).json({
      image: newUser.image,
      id: newUser.id,
      createdAt: newUser.createdAt,
      token,
    });
  } catch (error) {
    res.status(400).json(Util.Error.getErrorMessage(error));
  }
};
const login = async (req, res) => {
  try {
    const user = req.body;
    const dbUser = await Model.User.findOne({
      email: user.email.toLowerCase(),
    });
    let valid = true;
    if (dbUser) {
      if (await Util.Hashing.compare(user.password, dbUser.password)) {
        let token = await dbUser.createJWTLogin(user.rememberMe);
        res.status(200).json({
          ...dbUser._doc,
          password: undefined,
          friends: undefined,
          requestToYou: undefined,
          requestFromYou: undefined,
          token,
        });
      } else valid = false;
    } else valid = false;
    if (!valid) throw new Error("Invalid email or password.");
  } catch (error) {
    res.status(401).json(Util.Error.getErrorMessage(error));
  }
};
const getAllUser = async (req, res) => {
  try {
    let users = await Model.User.find({}, "name image");
    res.status(200).json(users);
  } catch (error) {
    res.status(401).json(Util.Error.getErrorMessage(error));
  }
};
const getUser = async (req, res) => {
  try {
    let user = await Model.User.findById(req.params.id, "name image socketId");
    res.status(200).json(user);
  } catch (error) {
    res.status(401).json(Util.Error.getErrorMessage(error));
  }
};
const LoginByToken = async (req, res) => {
  try {
    let user = await Model.User.findById(req.id);

    await res.status(200).json({
      ...user._doc,
      password: undefined,
      friends: undefined,
      requestToYou: undefined,
      requestFromYou: undefined,
    });
  } catch (error) {
    res.status(400).json(Util.Error.getErrorMessage(error));
  }
};
const searchNewFriend = async (req, res) => {
  try {
    let users = await Model.User.find();
    let user = await Model.User.findById(req.id);
    res
      .status(200)
      .json(
        users.filter(
          (u) =>
            u.name.toLowerCase().includes(req.body.keyword.toLowerCase()) &&
            !(user.friends.includes(u.id) || u.id === user.id) &&
            !(
              user.requestFromYou.includes(u.id) ||
              user.requestToYou.includes(u.id)
            )
        )
      );
  } catch (error) {
    res.status(400).json(Util.Error.getErrorMessage(error));
  }
};
const searchYourFriend = async (req, res) => {
  try {
    let user = await Model.User.findById(req.id);
    let keyword = req.body.keyword;
    let data = [];
    while (user.friends.length) {
      let friendId = user.friends.pop();
      let friend = await Model.User.findById(friendId);
      if (friend.name.toLocaleLowerCase().includes(keyword.toLocaleLowerCase()))
        data.push(friend);
    }
    res.status(200).json(await data);
  } catch (error) {
    res.status(400).json(Util.Error.getErrorMessage(error));
  }
};
const searchRequest = async (req, res) => {
  try {
    let user = await Model.User.findById(req.id);
    let keyword = req.body.keyword;
    let searchRequest_s = async (key) => {
      let data = [];
      while (user[key].length) {
        let userId = user[key].pop();
        let request = await Model.User.findById(userId);
        if (request.name.toLocaleLowerCase().includes(keyword))
          data.push(request);
      }
      return data;
    };
    let fromYou = await searchRequest_s("requestFromYou");
    let toYou = await searchRequest_s("requestToYou");
    await res.status(200).json([fromYou, toYou]);
  } catch (error) {
    res.status(400).json(Util.Error.getErrorMessage(error));
  }
};
const deleteAllusers = async (req, res) => {
  try {
    await Model.User.deleteMany();
    res.status(200).json("Done");
  } catch (error) {
    res.status(400).json(Util.Error.getErrorMessage(error));
  }
};
const sendResetPasswordLink = async (req, res) => {
  try {
    let users = await Model.User.find({
      email: req.body.email.toLowerCase(),
    });
    let token = "";
    if (users.length) {
      let user = users[0];
      token = await user.createJWT({ expiresIn: "1 h" });
    }
    await Send.resetPasswordLink(req.body.email, token);
    res.status(200).json("ok");
  } catch (error) {
    res.status(400).json(Util.Error.getErrorMessage(error));
  }
};
const resetPassword = async (req, res) => {
  try {
    const password = req.body.password;
    Util.Validator.Password(password);
    await Model.User.findByIdAndUpdate(req.id, {
      password: await Util.Hashing.hash(password),
    });
    res.status(200).json("ok");
  } catch (error) {
    res.status(400).json(Util.Error.getErrorMessage(error));
  }
};
const getAllFriends = async (req, res) => {
  try {
    let user = await Model.User.findById(req.id);
    let friends = [];
    while (user.friends.length) {
      let friendId = user.friends.pop();
      let friend = await Model.User.findById(friendId);
      friends.push(friend);
    }
    res.status(200).json(friends);
  } catch (error) {
    res.status(400).json(Util.Error.getErrorMessage(error));
  }
};
const getRequests = async (req, res) => {
  try {
    let user = await Model.User.findById(req.id);
    let searchRequest_s = async (key) => {
      let data = [];
      while (user[key].length) {
        let userId = user[key].pop();
        let request = await Model.User.findById(userId);
        data.push(request);
      }
      return data;
    };
    let fromYou = await searchRequest_s("requestFromYou");
    let toYou = await searchRequest_s("requestToYou");
    await res.status(200).json([fromYou, toYou]);
  } catch (error) {
    res.status(400).json(Util.Error.getErrorMessage(error));
  }
};
const validToken = (req, res) => {
  res.status(200).json("ok");
};
const clearRequestNotifications = async (req, res) => {
  try {
    await Model.User.findByIdAndUpdate(req.id, { requestNotifications: [] });
    await res.status(200).json("no notifications");
  } catch (error) {
    res.status(400).json(Util.Error.getErrorMessage(error));
  }
};
const getMostRecentlyUsedEmoji = async (req, res) => {
  try {
    const mostUsedEmoji = await Model.User.findById(req.id, "mostUsedEmoji");
    await res.status(200).json(mostUsedEmoji);
  } catch (error) {
    res.status(400).json(Util.Error.getErrorMessage(error));
  }
};
const addToMostRecentlyUsedEmoji = async (req, res) => {
  try {
    const user = await Model.User.findById(req.id);
    const mostUsedEmoji = user.mostUsedEmoji;
    let arr = Util.Arry.deleteOneFromArray(req.body.emoji, [...mostUsedEmoji]);
    if (mostUsedEmoji.length >= 150) {
      arr.pop();
      arr.unshift(req.body.emoji);
    } else {
      arr.unshift(req.body.emoji);
    }
    await user.updateOne({ mostUsedEmoji: arr });
    await res.status(200).json(arr);
  } catch (error) {
    res.status(400).json(Util.Error.getErrorMessage(error));
  }
};
const getLastMessage = async (req, res) => {
  try {
    const user = await Model.User.findById(req.id);
    const connectWithId = req.body.id;
    const messagesToYou = await Model.Message.find({
      sender: connectWithId,
      reciever: user.id,
    });
    const messagesFromYou = await Model.Message.find({
      sender: user.id,
      reciever: connectWithId,
    });
    const messages = [
      ...(await messagesFromYou),
      ...(await messagesToYou),
    ].sort((x, y) => x.createdAt - y.createdAt);
    await res.status(200).json(messages[messages.length - 1]);
  } catch (error) {
    res.status(400).json(Util.Error.getErrorMessage(error));
  }
};
const getMessageNotifications = async (req, res) => {
  try {
    let user = await Model.User.findById(req.id);
    res.status(200).json(await user.messageNotifications);
  } catch (error) {
    res.status(400).json(Util.Error.getErrorMessage(error));
  }
};
const deleteMessageNotifications = async (req, res) => {
  try {
    let user = await Model.User.findById(req.id);
    let messageNotifications=Util.Arry.deleteOneFromArray(req.body.id,user.messageNotifications);
    await user.updateOne({messageNotifications:await messageNotifications})
    res.status(200).json(await messageNotifications);
  } catch (error) {
    res.status(400).json(Util.Error.getErrorMessage(error));
  }
};
module.exports = {
  signup,
  login,
  getAllUser,
  getUser,
  deleteAllusers,
  LoginByToken,
  sendResetPasswordLink,
  resetPassword,
  validToken,
  searchNewFriend,
  searchYourFriend,
  searchRequest,
  getAllFriends,
  getRequests,
  clearRequestNotifications,
  getMostRecentlyUsedEmoji,
  addToMostRecentlyUsedEmoji,
  getLastMessage,
  getMessageNotifications,
  deleteMessageNotifications,
};
