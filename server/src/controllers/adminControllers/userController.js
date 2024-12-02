const User = require("../../models/userModel");

// make a controller for get all users
exports.allUser = (req, res) => {
  const { sortIndex } = req.query;
  User.find({ delected: null })
    .populate([{ path: "followers.user" }, { path: "following.user" }])
    .sort({ [sortIndex]: 1 })
    .then((users) => {
      res.status(201).json({ users: users });
    })
    .catch((err) => {
      res.status(500).json({ msg: "Can not read Users Information" });
    });
};

// make a controller for permission users
exports.permissionUser = (req, res) => {
  const id = req.params.id;
  const { role } = req.body;
  User.findById(id)
    .then((user) => {
      user.role = role;
      user.save().then(() => {
        res
          .status(200)
          .json({ msg: "User role changed successfully.", user: user });
      });
    })
    .catch(() => {
      res.status(500).json({ msg: "Server error" });
    });
};

// make a controller for delete users
exports.delUser = (req, res) => {
  const id = req.params.id;
  User.findById(id)
    .then((user) => {
      user.delected = new Date();
      user.save().then(() => {
        res.status(201).json({ msg: "User deleted successfully", user: user });
      });
    })
    .catch((err) => {
      res.status(400).json({ err: err });
    });
};

// make a controller for get a user
exports.getUser = (req, res) => {
  const id = req.params.id;
  User.findById(id)
    .populate([{ path: "followers.user" }, { path: "following.user" }])
    .then((user) => {
      res.status(201).json({ user: user });
    })
    .catch(() => {
      res.status(400).json({ msg: "Can not find user." });
    });
};

// make a controller for change profile information
exports.changeInfo = (req, res) => {
  const id = req.params.id;
  User.findByIdAndUpdate(id, req.body)
    .then((user) => {
      res
        .status(200)
        .json({ msg: "Profile information changed successfully.", user: user });
    })
    .catch(() => {
      res.status(404).json({ msg: "Can not find user." });
    });
};

// make a controller for change password
exports.changePassword = (req, res) => {
  const id = req.params.id;
  const { currentPassword, newPassword } = req.body;
  User.findById(id)
    .then((user) => {
      if (user.show_pwd(currentPassword, user.password)) {
        user.password = newPassword;
        user
          .save()
          .then(() => {
            res.status(200).json({
              msg: "Profile information changed successfully.",
              user: user,
            });
          })
          .catch(() => {
            res.status(500).json({ msg: "Server error" });
          });
      } else {
        res.status(401).json({ msg: "Don't Match Password" });
      }
    })
    .catch(() => {
      res.status(404).json({ msg: "Can not find user" });
    });
};

// make a controller for change password
exports.changeAvatar = (req, res) => {
  const id = req.params.id;
  const { avatar } = req.files;
  uploadPath = `./uploads/${id}.${avatar.name}`;

  avatar.mv(uploadPath, function (err) {
    if (err) return res.status(500).send(err);

    User.findById(id)
      .then((user) => {
        user.avatar = `${process.env.APP_BASE_URL}/uploads/${id}.${avatar.name}`;
        user
          .save()
          .then(() => {
            res.status(200).json({
              msg: "Profile avatar changed successfully.",
              user: user,
            });
          })
          .catch(() => {
            res.status(500).json({ msg: "Server error" });
          });
      })
      .catch(() => {
        res.status(404).json({ msg: "Can not find user" });
      });
  });
};

exports.addFollower = async (req, res) => {
  let id = req.params.id;
  const { from } = req.body;
  User.findById(id)
    .then((user) => {
      let flag = 0;
      user.followers.map((item, index) => {
        if (item.user == from) {
          flag = index + 1;
        }
      });
      if (flag) {
        user.followers.splice(flag - 1, 1);
        user.save().then(() => {
          User.findById(from).then((selectUser) => {
            selectUser.following.map((item, index) => {
              if (item.user == id) {
                flag = index + 1;
              }
            });
            selectUser.following.splice(flag - 1, 1);
            selectUser.save().then(() => {
              res
                .status(201)
                .json({ msg: "Success", user: selectUser, selectUser: user });
            });
          });
        });
      } else {
        user.followers.push({ user: from });
        user.save().then(() => {
          User.findById(from).then((selectUser) => {
            selectUser.following.push({ user: id });
            selectUser.save().then(() => {
              res
                .status(201)
                .json({ msg: "Success", user: selectUser, selectUser: user });
            });
          });
        });
      }
    })
    .catch((err) => {
      res.status(500).json({ msg: "Can not follow this user" });
    });
};
