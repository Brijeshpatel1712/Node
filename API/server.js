const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const users = [
    {
        id: 1,
        name: "Aarav Patel",
        role: "Software Engineer",
        image: "https://i.pravatar.cc/150?u=aarav",
        bio: "Passionate about building scalable web applications."
    },
    {
        id: 2,
        name: "Isha Sharma",
        role: "UI/UX Designer",
        image: "https://i.pravatar.cc/150?u=isha",
        bio: "Creating beautiful and intuitive user experiences."
    },
    {
        id: 3,
        name: "Kabir Singh",
        role: "Full Stack Developer",
        image: "https://i.pravatar.cc/150?u=kabir",
        bio: "Expert in MERN stack and cloud technologies."
    },
    {
        id: 4,
        name: "Ananya Gupta",
        role: "DevOps Engineer",
        image: "https://i.pravatar.cc/150?u=ananya",
        bio: "Automating workflows and managing infrastructure."
    }
];

app.get('/api', (req, res) => {
    res.json(users);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
