import { PrismaClient } from "@prisma/client"


const prisma = new PrismaClient()


//--------------------------------Create Post-------------------------------//
export const createPostByUser = async (req, res) => {
  try {
      const { userId } = req.params;
      const { title, content } = req.body;

      const post = await prisma.post.create({
          data: {
              title,
              content,
              authorId: parseInt(userId)
          }
      });

      res.status(201).json({ id: post.id, message: "Post created!" });
  } catch (error) {
      console.error("Error details:", error);
      res.status(500).json({ error: "Database query failed!" });
  }}

  //--------------------------------Update Post-------------------------------//
  export const updatePost = async (req, res) => {
    //rewrite to prisma with error handling
    try {
        const { id } = req.params;
        const { title, content } = req.body;

        const post = await prisma.post.update({
            where: {
                id: parseInt(id) 
            },
            data: {
                title,
                content
            }
        });

        if (!post)
        return res.status(404).json({ error: "Post not updated!" });

        res.status(200).json({ message: "Post updated!" });
    } catch (error) {
        console.error("Error details:", error);
        res.status(500).json({ error: "Database query failed!" });
    }}

    // -----------------------Delete Post------------------------------------//
    export const deletePost = async (req, res) => {

      try {
          const { id } = req.params;
  
          const post = await prisma.post.delete({
              where: {
                id: parseInt(id) 
              }
          });
  
          if (!post)
          return res.status(404).json({ error: "Post not deleted!" });
  
          res.status(200).json({ message: "Post deleted!" });
      } catch (error) {
          console.error("Error details:", error);
          res.status(500).json({ error: "Database query failed!" });
      }}

      //---------------------------------Get Post by User ---------------------------//
      export const getPostsByUser = async (req, res) => {
        try {
            const { userId } = req.params;
    
            const posts = await prisma.post.findMany({
                where: {
                    authorId: parseInt(userId)
                }
            });
    
            if (!posts.length)
            return res.status(404).json({ message: "No posts found for this user" });
    
            res.status(200).json(posts);
        } catch (error) {
            console.error("Error details:", error);
            res.status(500).json({ error: "Database query failed!" });
        }}
    
        //-------------------------------------Get Post -----------------------------//
        export const getPost = async (req, res) =>  {
          try {
              const { id } = req.params;
      
              const post = await prisma.post.findUnique({
                  where: { 
                    id: parseInt(id) 
                }
              });
      
              if (!post)
              return res.status(404).json({ message: "Post not found" });
      
              res.status(200).json(post);
          } catch (error) {
              console.error("Error details:", error);
              res.status(500).json({ error: "Database query failed!" });
          }}

//-------------------------------------Get all Posts -----------------------------//
          export const getPosts = async (req, res) => {
           
            try {
                const posts = await prisma.post.findMany();
        
                if (!posts.length)
                return res.status(404).json({ message: "No posts found" });
        
                res.status(200).json(posts);
            } catch (error) {
                console.error("Error details:", error);
                res.status(500).json({ error: "Database query failed!" });
            }}