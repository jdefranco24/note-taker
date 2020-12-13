const router = require("express").Router();
const store = require("../db/store");
// var data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));


module.exports = function(app) {

    router.get("/notes", (req, res) => {
        store
            .getNotes()
            .then((notes)=> res.json(notes))
            .catch((err) => res.status(500).json(err));
    });
// fix after
    router.get("/api/notes/:id", function(req, res) {

        res.json(data[Number(req.params.id)]);

    });


    router.post("/notes", function(req, res) {
        store.addNote(req.body).then((note) => res.json(note));            

    });

    
    router.delete("/api/notes/:id", function(req, res) {

        let noteId = req.params.id;
        let newId = 0;
        console.log(`Deleting note with id ${noteId}`);
        data = data.filter(currentNote => {
            return currentNote.id != noteId;
        });
        for (currentNote of data) {
            currentNote.id = newId.toString();
            newId++;
        }
        fs.writeFileSync("./db/db.json", JSON.stringify(data));
        res.json(data);
    }); 

}