// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            // Unobserve after showing (run once)
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.hidden').forEach((el) => {
    observer.observe(el);
});

// Parallax/Anti-Gravity effect for floating elements
document.addEventListener('mousemove', (e) => {
    const x = (window.innerWidth - e.pageX * 2) / 100;
    const y = (window.innerHeight - e.pageY * 2) / 100;

    document.querySelectorAll('.float-item').forEach((item, index) => {
        // Multiplier based on element index to give different depth feelings
        const multiplier = index + 1;
        item.style.transform = `translate(${x * multiplier}px, ${y * multiplier}px)`;
    });
});

// EmailJS Form Submission
(function() {
    // PUBLIC_KEY 부분에 EmailJS에서 발급받은 Public Key를 입력하세요.
    // 예: emailjs.init("xxxxx_xxxxxxxxx");
    emailjs.init({
      publicKey: "HnkWFx4O-lNlvSskp",
    });
})();

const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const submitBtn = document.getElementById('submit-btn');
        const formStatus = document.getElementById('form-status');

        submitBtn.disabled = true;
        submitBtn.innerText = '전송 중...';
        formStatus.style.display = 'none';

        // 'YOUR_TEMPLATE_ID' 부분에 EmailJS에서 생성한 Template ID를 입력하세요.
        // 서비스 ID는 제공해주신 'service_qwcnh5u'를 사용합니다.
        emailjs.sendForm('service_qwcnh5u', 'template_jh64du5', this)
            .then(() => {
                formStatus.innerText = '성공적으로 전송되었습니다! 빠른 시일 내에 연락드리겠습니다.';
                formStatus.style.color = '#4caf50';
                formStatus.style.display = 'block';
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.innerText = '보내기';
            }, (error) => {
                formStatus.innerText = '전송에 실패했습니다. 나중에 다시 시도해주세요. (에러: ' + error.text + ')';
                formStatus.style.color = '#f44336';
                formStatus.style.display = 'block';
                submitBtn.disabled = false;
                submitBtn.innerText = '보내기';
            });
    });
}
