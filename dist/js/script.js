// hamburger
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

 hamburger.addEventListener('click', function () {
    hamburger.classList.toggle('hamburger-active');
    navMenu.classList.toggle('hidden');

});

// navbar fixed
window.onscroll = function () {
    const header = document.querySelector('header');
    const fixedNav = header.offsetTop;
    

    if (window.pageYOffset > fixedNav) {
        header.classList.add('navbar-fixed');
    } else {
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
const btn = document.getElementById("voiceBtn");
const music = document.getElementById("music");

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (!SpeechRecognition) {
  alert("Browser tidak support voice 😢");
} else {
  const recognition = new SpeechRecognition();
  recognition.lang = "id-ID";

  btn.addEventListener("click", () => {
    recognition.start();
  });

  recognition.onresult = (event) => {
    const text = event.results[0][0].transcript.toLowerCase();
    console.log("Kamu bilang:", text);

    // 🎵 PLAY
    if (text.includes("musik")) {
      music.play();
    }

    // 🛑 STOP
    if (text.includes("stop")) {
      music.pause();
      music.currentTime = 0;
    }
  };
}