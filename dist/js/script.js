// hamburger
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');


 hamburger.addEventListener('click', function () {
    hamburger.classList.toggle('hamburger-active');
    navMenu.classList.toggle('hidden');

});

// navbar fixed
const navlinks = document.querySelectorAll('.nav-link');
window.onscroll = function() {
    const header = document.querySelector('header');
    const fixedNav = header.offsetTop;
    

    if (window.pageYOffset > fixedNav) {
       // --- SAAT SCROLL KE BAWAH ---
        header.classList.add('navbar-fixed');
        
        navLinks.forEach(link => {
            // 1. Tambah warna hitam (slate-800)
            link.classList.add('text-slate-800');
            // 2. HAPUS semua class yang bisa bikin teks jadi putih
            link.classList.remove('text-white', 'dark:text-white');
        });
    } else {
// --- SAAT KEMBALI KE PALING ATAS ---
        header.classList.remove('navbar-fixed');
        
        
    }
};

// dark mode toggle
document.addEventListener('DOMContentLoaded', function () {
  const toggle = document.getElementById('theme-toggle');
  const html = document.documentElement;

  const iconDark = document.getElementById('icon-dark');
  const iconLight = document.getElementById('icon-light');

  if (!toggle) return; // biar ga error

  // load awal
  if (localStorage.getItem('theme') === 'dark') {
    html.classList.add('dark');
    iconDark.classList.add('hidden');
    iconLight.classList.remove('hidden');
  }

  toggle.addEventListener('click', () => {
    console.log('klik detected'); // debug

    html.classList.toggle('dark');

    if (html.classList.contains('dark')) {
      localStorage.setItem('theme', 'dark');
      iconDark.classList.add('hidden');
      iconLight.classList.remove('hidden');
    } else {
      localStorage.setItem('theme', 'light');
      iconDark.classList.remove('hidden');
      iconLight.classList.add('hidden');
    }
  });
});

// contact form

const form = document.querySelector("form");
const notif = document.getElementById("notif");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const button = form.querySelector("button");
  button.innerText = "Mengirim...";
  button.disabled = true;

  const data = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    message: document.getElementById("message").value,
  };

  try {
    const res = await fetch("http://localhost:3000/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    notif.classList.remove("hidden");

    // reset warna dulu
    notif.classList.remove("bg-green-500", "bg-red-500");

    if (res.ok) {
      notif.classList.add("bg-green-500");
      notif.innerText = "✅ Pesan berhasil dikirim!";
    } else {
      notif.classList.add("bg-red-500");
      notif.innerText = "❌ Gagal mengirim pesan!";
    }

    // hilang otomatis
    setTimeout(() => {
      notif.classList.add("hidden");
    }, 3000);

    form.reset();

  } catch (err) {
    notif.classList.remove("hidden");
    notif.classList.add("bg-red-500");
    notif.innerText = "kemungkinan server kami tidak aktif. Coba lagi nanti.";

    setTimeout(() => {
      notif.classList.add("hidden");
    }, 3000);
  }

  button.innerText = "Kirim Pesan";
  button.disabled = false;
});

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100; // offset biar pas
    const sectionHeight = section.clientHeight;

    if (window.pageYOffset >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("text-teal-500", "font-bold");

    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("text-teal-500", "font-bold");
    }
  });
});

// musik
// const music = document.getElementById("music");
// const statusText = document.getElementById("voice-status");


// const SpeechRecognition =
//   window.SpeechRecognition || window.webkitSpeechRecognition;

//   if (!SpeechRecognition) {
//   statusText.innerText = "Browser tidak support voice 😢";
// } else {
//   const recognition = new SpeechRecognition();

//   recognition.lang = "id-ID";
//   recognition.continuous = true; // denger terus
//   recognition.interimResults = false;

//   let isListening = false;

//   // 🚀 START setelah 1x klik
//   function startVoice() {
//     if (isListening) return;

//     recognition.start();
//     isListening = true;

//     statusText.innerText = "🎤 Voice aktif...";
//     console.log("Voice ON");
//   }

//   // 👆 WAJIB: 1x interaksi user
//   document.body.addEventListener(
//     "click",
//     () => {
//       startVoice();
//     },
//     { once: true }
//   );

//   // 🎤 hasil suara
// recognition.onresult = (event) => {
//   const text =
//     event.results[event.results.length - 1][0].transcript.toLowerCase();

//   console.log("Kamu bilang:", text);
//   statusText.innerText = "🎤 " + text;

//   // 🛑 STOP MUSIK
//   if (text.includes("stop")) {
//     music.pause();
//     music.currentTime = 0;

//     speak("Baik bos, musik dihentikan");

//     recognition.start(); // ✅ NYALAIN LAGI MIC

//     statusText.innerText = "⛔ Musik dihentikan";
//     return;
//   }

//   // ▶️ PLAY MUSIK
//   if (text.includes("musik")) {
//     recognition.stop(); // ❗ INI KUNCI UTAMA (MATIKAN MIC)

//     music.play().catch(() => {
//       statusText.innerText = "⚠️ Klik dulu biar bisa play audio";
//     });

//     speak("Baik bos, musik dijalankan");

//     statusText.innerText = "🎵 Memutar musik...";
//   }
// };

//   // 🔁 auto restart kalau mati
//   recognition.onend = () => {
//     console.log("Restarting voice...");
//     recognition.start();
//   };

//   recognition.onerror = (err) => {
//     console.error("Voice error:", err);
//   };
// }

// function speak(text) {
//   const speech = new SpeechSynthesisUtterance(text);
//   speech.lang = "id-ID";
//   speech.rate = 1;
//   speech.pitch = 1;
//   speech.volume = 1;

//   window.speechSynthesis.speak(speech);
// }

// // blog
// async function addBlog() {
//   const title = document.getElementById("title").value;
//   const description = document.getElementById("description").value;
//   const image = document.getElementById("image").value;

//   if (!title || !description) {
//     alert("Isi dulu bro 😅");
//     return;
//   }

//   try {
//     const res = await fetch("http://localhost:3000/api/blogs", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ title, description, image }),
//     });

//     const data = await res.json();

//     alert(data.message);

//     // reset form
//     document.getElementById("title").value = "";
//     document.getElementById("description").value = "";
//     document.getElementById("image").value = "";

//   } catch (err) {
//     alert("Server error 😢");
//   }
// }

// async function loadBlogs() {
//   try {
//     const res = await fetch("http://localhost:3000/api/blogs");
//     const blogs = await res.json();

//     const container = document.getElementById("blog-container");
//     container.innerHTML = "";

//     blogs.forEach((blog) => {
//       container.innerHTML += `
//         <div class="w-full px-4 lg:w-1/2 xl:w-1/3">
//           <div class="bg-white rounded-xl shadow-lg overflow-hidden mb-10">
//             <img src="${blog.image || 'https://via.placeholder.com/400'}" class="w-full h-auto">
//             <div class="p-6">
//               <h3 class="font-bold text-xl text-slate-900 mb-2 truncate">
//                 ${blog.title}
//               </h3>
//               <p class="text-base text-slate-500">
//                 ${blog.description}
//               </p>
//             </div>
//           </div>
//         </div>
//       `;
//     });

//   } catch (err) {
//     console.log("Gagal load blog");
//   }
// }

// loadBlogs();

