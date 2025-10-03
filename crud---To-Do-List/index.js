const express = require("express");
const app = express();
const port = 3030;
const fs = require("fs");
const { json } = require("stream/consumers");

app.use(express.json());

let obj = {
  name: "ipone 17",
  category: "electronics",
  price: "105000$",
};

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/products", (req, res) => {
  fs.readFile("./user.json", "utf8", (err, data) => {
    if (err) {
      res.end("Error reading file");
    } else {
      res.end(data);
    }
  });
});

app.post("/addproduct", async(req, res) => {
  await fs.readFile("./user.json", "utf-8", async(err, data) => {
    if (err) {
      res.end("data is not found");
    } else {
      const datafromuser = JSON.parse(data);
      

      let productID =
        datafromuser.prodtcts[datafromuser.prodtcts.length - 1].id;
      // console.log(productID);

      const newsingalid = { ...obj, id: ++productID };
      // console.log(newsingalid)

      
       datafromuser.prodtcts.push(newsingalid);
      // console.log(datafromuser)



     await fs.writeFile("./user.json", JSON.stringify(datafromuser), (err) => {
        if (err) {
          res.end("data is not a send ");
        } else {
          res.send(data);
        }
      });
    }
  });
});

app.delete("/products/:id", (req, res) => {
  const { id } = req.params;
  fs.readFile("./user.json", "utf-8", (err, data) => {
    if (err) {
      res.send("data is not deleted ");
    } else {
      const datafromdab = JSON.parse(data);
      const filterdata = datafromdab.prodtcts.filter((el) => el.id != id);
      console.log(filterdata);
      fs.writeFile(
        "./user.json",
        JSON.stringify({ prodtcts: filterdata }),
        (err) => {
          if (err) {
            res.send("data is not found");
          } else {
            res.send("data is deleted sucssesfully");
          }
        }
      );
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port  http://localhost:${port}`);
});
