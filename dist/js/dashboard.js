const form = document.getElementById('blogForm');

form.addEventListener('submit', async (e) => {
    e.preventDefault(); // kode biar ga reload halaman

    const data = {
    title: document.getElementById("title").value,
    image: document.getElementById("image").value,
    description: document.getElementById("description").value,
  };

    await fetch("http://localhost:3000/api/blogs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  form.reset();
  loadBlogs();

});

async function loadBlogs() {
  const res = await fetch("http://localhost:3000/api/blogs");
  const blogs = await res.json();

  const container = document.getElementById("blogList");
  container.innerHTML = "";

  blogs.forEach(blog => {
    container.innerHTML += `
      <div>
        <h3>${blog.title}</h3>
        <button onclick="deleteBlog(${blog.id})">Hapus</button>
      </div>
    `;
  });
}

loadBlogs();

async function deleteBlog(id) {
  await fetch(`http://localhost:3000/api/blogs/${id}`, {
    method: "DELETE",
  });

  loadBlogs();
}