document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn ? themeToggleBtn.querySelector('i') : null;
    const body = document.body;

    // 1. Kullanıcının daha önce seçtiği temayı kontrol et
    const savedTheme = localStorage.getItem('cv-theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        if (themeIcon) {
            themeIcon.classList.replace('fa-moon-o', 'fa-sun-o');
        }
    }

    // 2. Dark / Light Mode Geçişi
    if (themeToggleBtn && themeIcon) {
        themeToggleBtn.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            
            if (body.classList.contains('dark-mode')) {
                themeIcon.classList.replace('fa-moon-o', 'fa-sun-o');
                localStorage.setItem('cv-theme', 'dark');
            } else {
                themeIcon.classList.replace('fa-sun-o', 'fa-moon-o');
                localStorage.setItem('cv-theme', 'light');
            }
        });
    }

    // 3. E-Posta Adresini Tek Tıkla Panoya Kopyalama (Üst ve Alt Alanlar İçin)
    const toast = document.getElementById('toast-msg');

    function copyEmail(element) {
        if (element) {
            const emailText = element.querySelector('span').innerText;
            navigator.clipboard.writeText(emailText).then(() => {
                if (toast) {
                    toast.classList.add('show');
                    setTimeout(() => {
                        toast.classList.remove('show');
                    }, 2500);
                }
            });
        }
    }

    // Üst profil e-posta alanı
    const copyEmailBtn = document.getElementById('copy-email');
    if (copyEmailBtn) {
        copyEmailBtn.addEventListener('click', () => copyEmail(copyEmailBtn));
    }

    // Alt iletişim e-posta alanı
    const copyEmailBottomBtn = document.getElementById('copy-email-bottom');
    if (copyEmailBottomBtn) {
        copyEmailBottomBtn.addEventListener('click', () => copyEmail(copyEmailBottomBtn));
    }

    // 4. Sayfa Kaydırıldıkça Sol Menüdeki Aktif Sekmeyi Vurgulama (Scroll Spy)
    const mainContent = document.querySelector('.main-content');
    const sections = document.querySelectorAll('.main-content > div[id]');
    const navLinks = document.querySelectorAll('.nav ul li a');

    const handleScroll = () => {
        let currentSection = '';
        const scrollPosition = window.innerWidth <= 768 ? window.scrollY : (mainContent ? mainContent.scrollTop : 0);

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (scrollPosition >= sectionTop) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    };
// 5. PDF Olarak İndir / Yazdır Butonu
    const downloadPdfBtn = document.getElementById('download-pdf-btn');
    if (downloadPdfBtn) {
        downloadPdfBtn.addEventListener('click', () => {
            window.print();
        });
    }
    
    // Hem masaüstü (main-content içi) hem mobil (pencere) kaydırmasını dinle
    if (mainContent) {
        mainContent.addEventListener('scroll', handleScroll);
    }
    window.addEventListener('scroll', handleScroll);
});

