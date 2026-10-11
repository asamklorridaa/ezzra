(function () {
  var root = document.documentElement;

  // Tema terang/gelap (diingat di browser)
  try {
    var saved = localStorage.getItem("theme");
    if (saved) root.setAttribute("data-theme", saved);
  } catch (e) {}

  document.getElementById("theme").addEventListener("click", function () {
    var cur = root.getAttribute("data-theme");
    if (!cur) cur = window.matchMedia("(prefers-color-scheme:dark)").matches ? "dark" : "light";
    var next = cur === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) {}
  });

  // Tahun di footer
  document.getElementById("year").textContent = new Date().getFullYear();

  // Salin tautan halaman
  var toast = document.getElementById("toast"), timer;
  function say(msg) {
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(timer);
    timer = setTimeout(function () { toast.classList.remove("show"); }, 2200);
  }
  document.getElementById("copy").addEventListener("click", function () {
    var url = location.href;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(
        function () { say("Tautan disalin"); },
        function () { say("Gagal menyalin tautan"); }
      );
    } else {
      say("Salin tautan dari bilah alamat browser");
    }
  });

  // Kartu profil miring mengikuti kursor (desktop saja)
  var card = document.getElementById("card");
  var reduce = window.matchMedia("(prefers-reduced-motion:reduce)").matches;
  if (!reduce && window.matchMedia("(hover:hover)").matches) {
    card.addEventListener("pointermove", function (e) {
      var r = card.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width - 0.5;
      var y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = "perspective(700px) rotateY(" + (x * 8) + "deg) rotateX(" + (-y * 8) + "deg)";
    });
    card.addEventListener("pointerleave", function () { card.style.transform = ""; });
  }
})();