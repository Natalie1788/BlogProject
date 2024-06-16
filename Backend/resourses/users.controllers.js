import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client"


const prisma = new PrismaClient()

//--------------------------------Create User-------------------------------//
export const createUser = async (req, res) => {
  const { email, password} = req.body;

  //Crypt password
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  try{
    //is there such user in database
const existingUser = await prisma.user.findUnique({ 
  where: {email: email}
})
  

  if (existingUser) {
  return res.status(400).json({message: "User already exist"})
  }

  const user = await prisma.user.create({
    data: {
      email: email,
      password: hashedPassword
  }
  })
  return res.status(200).json({message: `User with id ${user.id} created`})
}catch(error) {
  console.error(error);
  res.status(500).json({error: "Internal server error"})
}
}

//--------------------------------LogIn User-------------------------------//
export const logIn = async (req, res) => {
  const { email, password } = req.body;

  try {
      const user = await prisma.user.findUnique({
          where: {
              email: email
          }
      });

      if (!user) {
          return res.status(400).send("User does not exist. Please register");
      }

      const validPassword = await bcrypt.compare(password, user.password);

      if (!validPassword) {
          return res.status(400).send("Password does not match!");
      }

      if (!process.env.JWT_SECRET) {
          return res.status(500).json({ error: "Internal server error" });
      }

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

      res.status(200).json({ message: "Token created", token: token });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
  }
}


//--------------------------------Get User---------------------------------//
export const getUser = async (req, res) => {
  const { id } = req.params;

  try {
      const user = await prisma.user.findUnique({
          where: {
              id: parseInt(id)
          }
      });

      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json(user);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
  }
};



//--------------------------------Edit User-------------------------------//
export const editUser = async (req, res) => {
  const { id } = req.params; 
  const { username, email, password } = req.body;

  try {
 
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) } 
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // updating
    const updatedUserData = {};
    if (username) updatedUserData.username = username;
    if (email) updatedUserData.email = email;
    if (password) {
      const saltRounds = 10;
      updatedUserData.password = await bcrypt.hash(password, saltRounds);
    }

 
    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data: updatedUserData
    });

    return res.status(200).json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

//--------------------------------Delete User-------------------------------//
export const deleteUser = async (req, res) => {
  const { id } = req.params; // get user id

  try {
    
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) } 
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    
    await prisma.user.delete({
      where: { id: parseInt(id) }
    });

    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

//--------------------------------Get All Users-------------------------------//
export const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    return res.status(200).json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};



//-----------------------------------Account-----------------------------//
export const account = async (req, res) => {
  try {
      const user = await prisma.user.findUnique({
          where: { id: req.user.id },
          include: { posts: true } // Assuming 'posts' is the name of the relation in your Prisma schema
      });

      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({ user, posts: user.posts });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
  }
}

//--------------------------------------Log out--------------------------//
export const logOut = async (req, res) => {
  // get token from Authorization
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
  }

  // Decode token to get user info
  try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      return res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
      console.error(error);
      return res.status(400).json({ message: 'Invalid token' });
  }
};

