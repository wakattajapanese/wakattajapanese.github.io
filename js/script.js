document.addEventListener("DOMContentLoaded", function () {
  const texts = document.querySelectorAll(".changing-text");
  const languageElement = document.querySelector(".changing-language");

  // Data untuk setiap bahasa
  const languageData = [
    {
      name: "Jepang",
      texts: [
        "Paham <strong>Hiragana</strong> dalam 7 hari",
        "Pelajari <strong>Katakana</strong> dengan metode interaktif",
        "Hafalkan <strong>Kosakata</strong> sehari-hari dengan flashcard",
        "Pahami <strong>Tata Bahasa</strong> Jepang dasar",
      ],
      color: "#4dccbd",
      displayTime: 3000, // 3 detik per teks
      languageChangeDelay: 1000, // 1 detik jeda sebelum ganti bahasa
    },
    {
      name: "Korea",
      texts: [
        "Paham <strong>Hangul</strong> dalam 7 hari",
        "Pelajari <strong>Kosakata Korea</strong> sehari-hari dengan flashcard",
        "Pahami <strong>Grammar Korea</strong> dasar",
        "Latihan <strong>Percakapan</strong> sehari-hari",
      ],
      color: "#ff6b6b",
      displayTime: 3000,
      languageChangeDelay: 1000,
    },
    {
      name: "Jerman",
      texts: [
        "Kuasai <strong>Artikel Jerman</strong> (der, die, das)",
        "Pelajari <strong>Kosakata Jerman</strong> praktis",
        "Pahami <strong>Grammar Jerman</strong> tingkat dasar",
        "Latihan <strong>Aussprache</strong> (pelafalan)",
      ],
      color: "#ffd166",
      displayTime: 3000,
      languageChangeDelay: 1000,
    },
  ];

  let currentLanguageIndex = 0;
  let currentTextIndex = 0;
  let interval;
  let isChangingLanguage = false;

  // Fungsi untuk menampilkan teks spesifik
  function showText(textIndex, immediate = false) {
    const currentLanguage = languageData[currentLanguageIndex];

    // Sembunyikan semua teks
    texts.forEach((text) => {
      text.classList.remove("active");
      if (!immediate) {
        text.style.opacity = "0";
        text.style.transform = "translateY(20px)";
      }
    });

    // Tampilkan teks yang diminta
    if (texts[textIndex]) {
      texts[textIndex].innerHTML = currentLanguage.texts[textIndex];

      if (immediate) {
        texts[textIndex].classList.add("active");
        texts[textIndex].style.opacity = "1";
        texts[textIndex].style.transform = "translateY(0)";
      } else {
        setTimeout(() => {
          texts[textIndex].classList.add("active");
          texts[textIndex].style.opacity = "1";
          texts[textIndex].style.transform = "translateY(0)";
        }, 50);
      }
    }

    currentTextIndex = textIndex;
  }

  // Fungsi untuk ganti bahasa dengan animasi smooth
  function changeLanguage() {
    if (isChangingLanguage) return;
    isChangingLanguage = true;

    const currentLanguage = languageData[currentLanguageIndex];
    const nextLanguageIndex = (currentLanguageIndex + 1) % languageData.length;
    const nextLanguage = languageData[nextLanguageIndex];

    // 1. Animasikan perubahan bahasa di judul
    languageElement.style.opacity = "0";
    languageElement.style.transform = "translateY(-10px)";

    setTimeout(() => {
      languageElement.textContent = nextLanguage.name;
      languageElement.style.color = nextLanguage.color;
      languageElement.style.opacity = "1";
      languageElement.style.transform = "translateY(0)";
    }, 300);

    // 2. Animasikan teks keluar
    texts.forEach((text, index) => {
      setTimeout(() => {
        text.style.opacity = "0";
        text.style.transform = "translateY(20px)";
        text.classList.remove("active");
      }, index * 100); // Stagger animation
    });

    // 3. Setelah semua teks hilang, ganti bahasa dan tampilkan teks pertama
    setTimeout(() => {
      currentLanguageIndex = nextLanguageIndex;
      currentTextIndex = 0;

      // Update semua teks dengan konten bahasa baru
      texts.forEach((text, index) => {
        text.innerHTML = nextLanguage.texts[index] || "";
      });

      // Tampilkan teks pertama bahasa baru dengan jeda
      setTimeout(() => {
        showText(0, true);
        isChangingLanguage = false;

        // Mulai interval baru dengan timing yang konsisten
        if (interval) clearInterval(interval);
        startTextRotation();
      }, 500);
    }, texts.length * 100 + 300);
  }

  // Fungsi untuk rotasi teks dalam satu bahasa
  function rotateText() {
    const nextIndex = (currentTextIndex + 1) % texts.length;

    // Jika akan kembali ke teks pertama, berarti akan ganti bahasa
    if (nextIndex === 0) {
      // Tunggu sebentar sebelum ganti bahasa
      setTimeout(() => {
        changeLanguage();
      }, languageData[currentLanguageIndex].languageChangeDelay);
    } else {
      // Kalau masih dalam bahasa yang sama, ganti ke teks berikutnya
      showText(nextIndex);
    }
  }

  // Mulai rotasi teks
  function startTextRotation() {
    const currentLanguage = languageData[currentLanguageIndex];
    if (interval) clearInterval(interval);

    interval = setInterval(rotateText, currentLanguage.displayTime);
  }

  // Inisialisasi pertama
  function init() {
    // Tampilkan bahasa pertama, teks pertama
    const firstLanguage = languageData[0];
    languageElement.textContent = firstLanguage.name;
    languageElement.style.color = firstLanguage.color;

    // Isi semua teks
    texts.forEach((text, index) => {
      text.innerHTML = firstLanguage.texts[index] || "";
    });

    // Tampilkan teks pertama
    showText(0, true);

    // Mulai rotasi
    startTextRotation();
  }

  // Jalankan
  init();

  // Klik untuk ganti bahasa manual
  languageElement.addEventListener("click", function () {
    if (isChangingLanguage) return;

    clearInterval(interval);
    currentTextIndex = 0;
    changeLanguage();
  });

  // Tambah efek hover
  languageElement.style.cursor = "pointer";
  languageElement.title = "Klik untuk ganti bahasa";

  // Carousel animation (tetap sama)
  const carousel = document.getElementById("carouselExampleFade");
  if (carousel) {
    carousel.addEventListener("mouseenter", function () {
      this.style.transform = "perspective(1000px) rotateY(0deg) scale(1.02)";
    });

    carousel.addEventListener("mouseleave", function () {
      this.style.transform = "perspective(1000px) rotateY(-3deg)";
    });
  }
});

// Filter produk
document.addEventListener("DOMContentLoaded", function () {
  const filterButtons = document.querySelectorAll(".btn-filter");
  const productCards = document.querySelectorAll(".product-card");

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"));

      // Add active class to clicked button
      this.classList.add("active");

      const filterValue = this.getAttribute("data-filter");

      // Filter products
      productCards.forEach((card) => {
        const cardCategory = card.parentElement.getAttribute("data-category");

        if (filterValue === "all" || cardCategory === filterValue) {
          card.parentElement.style.display = "block";
          card.style.animation = "fadeInUp 0.5s ease forwards";
        } else {
          card.parentElement.style.display = "none";
        }
      });
    });
  });
});
