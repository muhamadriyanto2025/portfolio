let blogs = [];

app.get("/api/blogs", (req, res) => {
    res.json(blogs);
});

app.post("/api/blogs", (req, res) => {
    const { title, description, image } = req.body;

    if (!title || !description || !image) {
        return res.status(400).json({ message: "Title, description, and image are required!" });
    }

    const newBlog = { id: Date.now(), title, description, image };
    blogs.push(newBlog);
    res.json({ message: "Blog berhasil ditambahkan!" });
});

app.delete("/api/blogs/:id", (req, res) => {
    const id = parseInt(req.params.id);
    blogs = blogs.filter(blog => blog.id !== id);
    res.json({ message: "Blog berhasil dihapus!" });
});

