const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");//it used for validity not empty 
const Notes = require("../models/Notes");
const fetchuser = require("../middleware/fetchUser");

//ROUTE 1 : Get All the Notes using Get "/api/notes/getuser". Login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Errors");
  }
});


// ROUTE 2 : Add a new Notes using: POST "/api/notes/addnote". Login required
router.post(
  '/addnote',
  fetchuser,
  [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({min: 5}),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;

      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      })

      const savedNote = await note.save()
      res.json(savedNote)
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Internal Server Error');
    }
  }
);
//ROUTE 3 : update an existing Notes using: Put "/api/notes/updatenote/:id". Login required
router.put(
  "/updatenote/:id",
  fetchuser,async (req, res) => {
    const{title, description, tag} = req.body;
    try {
    // Create a newNote object
    const newNote = {};
    if(title){newNote.title = title};
    if(description){newNote.description = description};
    if(tag){newNote.tag = tag};

    //Find the note to be updated and update it
    let note =  await Notes.findById(req.params.id);
    if(!note){return res.status(404).send("Not Found")}

    if(note.user.toString() !== req.user.id){
      return res.status(401).send("Not Allowed")
    }

    note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true})
    res.json({note});
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Errors");
  }
  });

  //ROUTE 4 : Delete an existing Notes using: DELETE "/api/notes/deletenote/:id". Login required
router.delete(
  "/deletenote/:id",
  fetchuser,async (req, res) => {
    try {
    //Find the note to be deleted and delete it
    let note =  await Notes.findById(req.params.id);
    if(!note){return res.status(404).send("Not Found")}

    //Allowed deletion only if user owns this Note
    if(note.user.toString() !== req.user.id){
      return res.status(401).send("Not Allowed")
    }

    note = await Notes.findByIdAndDelete(req.params.id)
    res.json({"success":"Note has been deleted", note: note});
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Errors");
  }
  });

module.exports = router;
