
const app = require('express')();
const parser = require("body-parser");
const fs = require("fs");
const dir = __dirname;


app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());
let movies = []; 
let flag = 1;

function readData() {
    const filename = "store.json"; 
    const jsonContent = fs.readFileSync(filename, 'utf-8');
    movies = JSON.parse(jsonContent);
}

function saveData() {
    const filename = "store.json";
    const jsonData = JSON.stringify(movies);
    fs.writeFileSync(filename, jsonData, 'utf-8');
}
app.get("/movies", (req, res) => {
    readData();
    res.send(JSON.stringify(movies));
})



/*app.get("/movies/:id", (req, res) => {
    const userid = req.params.id;
    if (movies.length == 0) {
        readData();
    }
    let foundRec = movies.find((e) => e.userId == userid);
    if (foundRec == null)
        throw "User not found";
    res.send(JSON.stringify(foundRec))
})*/

/*app.put("/movies", (req, res) => {
    if (movies.length == 0)
        readData(); 
    let body = req.body;
    
    for (let index = 0; index < movies.length; index++) {
        let element = movies[index];
        if (element.userName == body.userName) { 
            
            
            element.userCity = body.userCity;
           // element.userEmail = body.userEmail;
            element.userMobile = body.userMobile;
            saveData();
            res.send("User updated successfully");
        }
    }
    
})*/

app.post('/movies', (req, res) => {
    if (movies.length == 0)
        readData(); 
    let body = req.body; 
    for (let index = 0; index < movies.length; index++) {
        let element = movies[index];
        if (element.userName == body.userName) {

            res.send("User name already exists");
            flag = 0;
        }

    }
    if (flag >= 1) {
        movies.push(body);
        saveData(); 
        res.send("User added successfully");
    }

})
/*sapp.delete("/movies/:id", (req, res) => {
    if (movies.length == 0)
        readData(); 
    let body = req.body; 
    for (let index = 0; index < movies.length; index++) {
        let element = movies[index];
        if (element.userId == body.userId) { 
            movies.splice(index,1);
            res.send("UserDeleted Successfully");
            flag = 0;
        }
     }
     if (flag >= 1) {
        res.send("Error in Deleting");
    }

    
})*/

app.listen(1234, () => {
    console.log("Server available at 1234");
})