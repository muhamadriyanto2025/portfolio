const form = document.querySelector('#loginForm');
const errorText = document.getElementById('error');


form.addEventListener('submit', async (e) => {
    e.preventDefault(); // kode biar ga reload halaman
    if (localStorage.getItem("isLogin") !== "true") {
    window.location.href = "login.html";
    }
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
     
    if(email === "admin@gmail.com" && password === "123456") {
        localStorage.setItem("isLogin", "true");
        window.location.href = "dashboard/index.html";
    }else {
        errorText.innerText = "email atau password salah!";
        errorText.classList.remove("hidden");
    }

    

// try {
//     const res = await fetch("http://localhost:3000/api/auth/login", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ email, password }),
//     });

//     const data = await res.json();

//     if (res.ok) {
//       // simpan token
//       localStorage.setItem("token", data.token);

//       // pindah ke dashboard
//       window.location.href = "dashboard.html";
//     } else {
//       errorText.innerText = data.message;
//       errorText.classList.remove("hidden");
//     }

//   } catch (err) {
//     errorText.innerText = "Server error!";
//     errorText.classList.remove("hidden");
//   }
});