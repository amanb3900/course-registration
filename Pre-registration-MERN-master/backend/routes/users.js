const router = require("express").Router();
const bcryptjs = require('bcryptjs');

/*Models*/
const User = require("../models/User.model");
const UserSession = require("../models/UserSession.model");
const UserCourses = require("../models/UserCourses.model");

const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const generateHash = function(password) {
  return bcryptjs.hashSync(password, bcryptjs.genSaltSync(8),null);
};
//Display user's informations ONLY
router.route("/").get(auth, (req, res) => {
  const userId = req.cookies["userId"] || req.query.userId;

  User.findById(userId)
    .then((user) => {
      UserCourses.findOne({ userId: userId })
        .then((data) => {
          res.json({ user: user, courses: data ? data.courses : [] });
        })
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/userImport").post((req, res) => {
  const user = new User({
    userID: req.body.userID,
    name: req.body.name,
    surname: req.body.surname,
    faculty: req.body.faculty,
    program: req.body.program,
    semester: req.body.semester,
    email: req.body.email,
  });

  user
    .save()
    .then(() => {
      res.status(201).json({
        message: "User added successfully!",
      });
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
      });
    });
});

router.route("/signup").post((req, res) => {
  console.log("hello", req.body.userID)
  User.findOne({ userID: req.body.userID }).then((user) => {
    if (user) {
      return res.status(404).json({
        message: "User  found!",
        error: new Error("User  found!"),
      });
    } else {
      // user.password = 
      const password = generateHash(req.body.password);
      const user1 = new User({
        password: password,
        userID: req.body.userID
      })
      console.log(user1);
      user1
        .save()
        .then(() => {
          res.status(201).json({
            message: "You have registered successfully!",
          });
        })
        .catch((error) => {
          res.status(500).json({
            error: error,
          });
        });
    }
  });
});

router.route("/login").post((req, res) => {
  User.findOne({ userID: req.body.userID })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          error: new Error("User not found!"),
        });
      }

      if (user.validPassword(req.body.password)) {
        const token = jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", {
          expiresIn: "24h",
        });

        UserSession.replaceOne(
          { userId: user._id },
          { userId: user._id, token: token },
          { upsert: true }
        )
          .then((session) => {
            //console.log("replaceOne worked " + session);
            if (user.isAdmin) {
              res.status(200).json({
                userId: user._id,
                token: token,
                expiresIn: 1,
                isAdmin: true,
              });
            } else {
              res.status(200).json({
                userId: user._id,
                token: token,
                expiresIn: 1,
                isAdmin: false,
                name: user.name,
                surname: user.surname,
              });
            }
          })
          .catch((err) => {
            res.status(401).json("Error replaceOne: " + err);
          });
      } else {
        return res.status(401).json({
          message: "Incorrect password",
          error: new Error("Incorrect password!"),
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
      });
    });
});

router.route("/logout").get(auth, (req, res) => {
  const userId = req.cookies["userId"] || req.query.userId;
  res.clearCookie("token");
  res.clearCookie("userId");
  UserSession.findOneAndDelete({ userId: userId })
    .then(() => {
      res.status(200).json("Done!");
      console.log(userId);
    })
    .catch((err) => {
      res.status(400).json("Error: " + err);
    });
});

router.route("/userInfo").get(auth, (req, res) => {
  User.findOne({ userID: req.body.userID }).then((user) => {
    res.status(200).json({
      name: user.name,
      surname: user.surname,
    });
  });
});

/*This endpoint allow the frontend to check if the user is login*/
router.route("/auth").get(auth, (req, res) => {
  res.status(200).json("True");
});

router.route("/userCourse").get(auth, (req, res) => {
  const userId = req.cookies["userId"] || req.query.userId;
  console.log(userId);
  UserCourses.aggregate([
    {
      $match: { userId: userId },
    },
    {
      $project: {
        courses: {
          $map: {
            input: "$courses",
            as: "item1",
            in: {
              $toObjectId: "$$item1",
            },
          },
        },
      },
    },
    {
      $lookup: {
        from: "courses",
        localField: "courses",
        foreignField: "_id",
        as: "information",
      },
    },
    {
      $project: {
        information: 1,
        courses: 1,
      },
    },
  ]).exec((err, result) => {
    if (err) {
      res.status(500).json(err);
    }
    if (result) {
      if (result.length === 0) res.status(400).json("Error: can't found data");
      else res.status(200).json(result);
    }
  });
});

router.route("/addCourse").post(auth, (req, res) => {
  console.log(req.body.userId || req.query.userId);

  const userId = req.cookies["userId"] || req.query.userId;
  const courseId = req.body.courseId;
  if (!courseId) {
    res.json("Error course not define in queries.");
  }
  //add to the user a course
  UserCourses.updateOne(
    { userId: userId.trim() },
    { userId: userId, $push: { courses: courseId } },
    { upsert: true }
  )
    .then(() => {
      res.json("courseId updated");
    })
    .catch((err) => res.status(401).json("Error: " + err));
});

router.route("/removeCourse").post(auth, (req, res) => {
  const userId = req.cookies["userId"] || req.query.userId;
  const courseId = req.query.courseId;
  if (!courseId) {
    res.json("Error course not define in queries.");
  }

  console.log("Deleting: " + courseId);

  //add to the user a course
  UserCourses.updateOne(
    { userId: userId.trim() },
    { userId: userId, $pull: { courses: courseId } },
    { upsert: true }
  )
    .then(() => {
      res.json("Removed");
    })
    .catch((err) => res.status(401).json(err));
});

router.route("/setUserCourses").post(auth, (req, res) => {
  console.log(req.body.userId || req.query.userId);
  //add to the user a course
  UserCourses.replaceOne(
    { userId: req.body.userId },
    { userId: req.body.userId, courses: req.body.courses },
    { upsert: true }
  )
    .then(() => {
      res.json("Added!");
    })
    .catch((err) => res.status(401).json("Error: " + err));
});

/* router.route("/delete").delete((req, res) => {
  User.findOneAndDelete({ name: req.body.name })
    .then(() => {
      res.status(200).json("Done!");
    })
    .catch((err) => {
      res.status(400).json("Error: " + err);
    });
}); */
//TODO: do update / edit / push / delete

/*
router.route('/:id').get((req,res)=> {
   User.findById(req.params.id)
       .then(user => res.json(user))
       .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req,res)=> {
    User.findByIdAndDelete(req.params.id)
        .then(() => res.json('Deleted!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req,res)=>{
    User.findById(req.params.id)
        .then(user => {
            user.username = req.body.username;
            user.password = req.body.password;

            user.save()
                .then(() => res.json('Saved!'))
                .catch(err => res.status(400).json('Error: ' + err));

        })
        .catch(err => res.status(400).json('Error: ' + err));
});*/

module.exports = router;
