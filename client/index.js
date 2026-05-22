import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import multer from 'multer'
import fs from 'fs'
import path from 'path'

const app = express()

app.use(cors())

app.use(express.json())

/*
===================================
MONGODB
===================================
*/

mongoose.connect(
  'mongodb://127.0.0.1:27017/deepthi'
)

console.log(
  'MongoDB Connected'
)

/*
===================================
USER MODEL
===================================
*/

const User =
  mongoose.model(

    'User',

    {

      username: String,

      email: String,

      password: String

    }

  )

/*
===================================
JWT MIDDLEWARE
===================================
*/

function verifyToken(
  req,
  res,
  next
) {

  const token =
    req.headers.authorization

  if (!token) {

    return res.status(401).json({

      message:
        'Access Denied'

    })

  }

  try {

    jwt.verify(
      token,
      'secretkey'
    )

    next()

  } catch (error) {

    res.status(401).json({

      message:
        'Invalid Token'

    })

  }

}

/*
===================================
MULTER
===================================
*/

const storage =
  multer.diskStorage({

    destination: (
      req,
      file,
      cb
    ) => {

      cb(
        null,
        'uploads'
      )

    },

    filename: (
      req,
      file,
      cb
    ) => {

      cb(
        null,
        Date.now() +
        '-' +
        file.originalname
      )

    }

  })

const upload =
  multer({

    storage

  })

/*
===================================
REGISTER
===================================
*/

app.post(
  '/register',

  async (req, res) => {

    try {

      const {

        username,

        email,

        password

      } = req.body

      const existingUser =
        await User.findOne({

          email

        })

      if (existingUser) {

        return res.status(400).json({

          message:
            'User already exists'

        })

      }

      const hashedPassword =
        await bcrypt.hash(
          password,
          10
        )

      const newUser =
        new User({

          username,

          email,

          password:
            hashedPassword

        })

      await newUser.save()

      res.status(200).json({

        message:
          'Registration Successful'

      })

    } catch (error) {

      console.log(error)

      res.status(500).json({

        message:
          'Server Error'

      })

    }

  }
)

/*
===================================
LOGIN
===================================
*/

app.post(
  '/login',

  async (req, res) => {

    try {

      const {

        email,

        password

      } = req.body

      const user =
        await User.findOne({

          email

        })

      if (!user) {

        return res.status(400).json({

          message:
            'Invalid Email'

        })

      }

      const isMatch =
        await bcrypt.compare(

          password,

          user.password

        )

      if (!isMatch) {

        return res.status(400).json({

          message:
            'Invalid Password'

        })

      }

      const token =
        jwt.sign(

          {

            id: user._id,

            email:
              user.email

          },

          'secretkey',

          {

            expiresIn: '1d'

          }

        )

      res.status(200).json({

        message:
          'Login Successful',

        token,

        user: {

          username:
            user.username,

          email:
            user.email

        }

      })

    } catch (error) {

      console.log(error)

      res.status(500).json({

        message:
          'Server Error'

      })

    }

  }
)

/*
===================================
UPLOAD FILE
===================================
*/

app.post(

  '/upload-file',

  verifyToken,

  upload.single('file'),

  (req, res) => {

    res.status(200).json({

      message:
        'File Uploaded'

    })

  }

)

/*
===================================
GET FILES
===================================
*/

app.get(

  '/files',

  verifyToken,

  (req, res) => {

    const files =
      fs.readdirSync(
        './uploads'
      )

    res.status(200).json(
      files
    )

  }
)

/*
===================================
DOWNLOAD FILE
===================================
*/

app.get(

  '/download/:filename',

  verifyToken,

  (req, res) => {

    const filePath =
      path.join(

        process.cwd(),

        'uploads',

        req.params.filename

      )

    res.download(filePath)

  }
)

/*
===================================
DELETE FILE
===================================
*/

app.delete(

  '/delete-file/:filename',

  verifyToken,

  (req, res) => {

    const filePath =
      path.join(

        process.cwd(),

        'uploads',

        req.params.filename

      )

    fs.unlinkSync(filePath)

    res.status(200).json({

      message:
        'File Deleted'

    })

  }
)

/*
===================================
SERVER
===================================
*/

app.listen(

  5000,

  () => {

    console.log(

      'Server started on port 5000'

    )

  }

)