const express = require('express');
const { User } = require('./db');

const app = express();
const PORT = 2020;

app.use(express.json());

app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status.json(users);
  } catch (err) {
    res.status.json({ message: 'Error fetching users' });
  }
});

app.post('/users', async (req, res) => {
  try {
    const { name, email, age } = req.body;
    const user = new User({ name, email, age });

    await user.save();
    res.status.json({ message: 'User created', user });
  } catch (err) {
    res.status.json({ message: 'Error creating user' });
  }
});
app.delete('/deleteproduct/:id',(req,res)=>{
    const {id} = req.params
    fs.readFile('./db.json',"utf-8",(err,data)=>{
        if(err)
        {
            res.send(err)
        }
        else
        {
            const dataFromdb = JSON.parse(data)
            const filterProduct = dataFromdb.product.filter((el)=>el.id!=id)
            fs.writeFile('./db.json',JSON.stringify({product:filterProduct}),(err)=>{
                if(err)
                {
                    res.send(err)
                }
                else
                {
                    res.send("Data is deleted")
                }
            })
        }
    })
    res.send("Data Deleted")
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
