// REGISTRASI
if (document.getElementById("registerForm")) {
    document.getElementById("registerForm").addEventListener("submit", function (e) {
      e.preventDefault();
  
      const nama = document.getElementById("nama").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const telepon = document.getElementById("telepon").value;
      const tanggalLahir = document.getElementById("tanggalLahir").value;
      const alamat = document.getElementById("alamat").value;
      const foto = document.getElementById("fotoProfil").files[0];
  
      const reader = new FileReader();
      reader.onload = function () {
        const fotoBase64 = reader.result;
        localStorage.setItem("user", JSON.stringify({ nama, email, password, telepon, tanggalLahir, alamat, fotoBase64 }));
        window.location.href = "index.html";
      };
      reader.readAsDataURL(foto);
    });
  }
  
  // LOGIN
  if (document.getElementById("loginForm")) {
    document.getElementById("loginForm").addEventListener("submit", function (e) {
      e.preventDefault();
  
      const email = document.getElementById("loginEmail").value;
      const password = document.getElementById("loginPassword").value;
      const user = JSON.parse(localStorage.getItem("user"));
  
      if (user && user.email === email && user.password === password) {
        sessionStorage.setItem("loggedIn", "true");
        window.location.href = "profile.html";
      } else {
        alert("Email atau password salah!");
      }
    });
  }
  
  // PROFIL
  if (window.location.pathname.includes("profile.html")) {
    const user = JSON.parse(localStorage.getItem("user"));
    const isLoggedIn = sessionStorage.getItem("loggedIn");
  
    if (!user || isLoggedIn !== "true") {
      window.location.href = "index.html";
    } else {
      document.getElementById("fotoDisplay").src = user.fotoBase64;
      document.getElementById("namaDisplay").textContent = user.nama;
      document.getElementById("emailDisplay").textContent = user.email;
      document.getElementById("teleponDisplay").textContent = user.telepon;
      document.getElementById("alamatDisplay").textContent = user.alamat;
  
      // Hitung umur
      const birthYear = new Date(user.tanggalLahir).getFullYear();
      const thisYear = new Date().getFullYear();
      document.getElementById("umurDisplay").textContent = thisYear - birthYear;
    }
  }
  
  // LOGOUT
  function logout() {
    sessionStorage.clear();
    window.location.href = "index.html";
  }