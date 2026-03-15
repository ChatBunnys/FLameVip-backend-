/ create new post
router.post("/create", verifyToken, (req, res) => {

  const { content } = req.body;

  if(!content){
    return res.status(400).json({ message:"Post content required" });
  if (!content) {
    return res.status(400).json({ message: "Post content required" });
  }

  const post = {
@@ -30,7 +29,9 @@ router.post("/create", verifyToken, (req, res) => {
  posts.unshift(post);

  res.json(post);

});

export default router;


  
