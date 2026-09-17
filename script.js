document.addEventListener("DOMContentLoaded", () => {

    // 1. SIDEBAR MENU FUNCTIONALITY (CodingNepal Pattern)
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("overlay");
    const menuToggleBtn = document.getElementById("menu-toggle");
    const closeBtn = document.getElementById("close-btn");

    function openSidebar() {
        sidebar.classList.add("open");
        overlay.classList.add("active");
    }

    function closeSidebar() {
        sidebar.classList.remove("open");
        overlay.classList.remove("active");
    }

    menuToggleBtn.addEventListener("click", openSidebar);
    closeBtn.addEventListener("click", closeSidebar);
    overlay.addEventListener("click", closeSidebar);

    // 2. SWIPER CAROUSEL INITIALIZATION (Perbaikan Geser Slider 1, 2, 3)
    const swiper = new Swiper(".mySwiper", {
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });

    // 3. FETCH YOUTUBE ARCHIVE
    const CHANNEL_ID = 'UC2TptaJdg05H5zrIyffgPiQ';
    fetchArchive(CHANNEL_ID);
});

async function fetchArchive(channelId) {
    const list = document.getElementById('video-list');
    const loading = document.getElementById('loading-msg');
    
    try {
        const cacheBuster = new Date().getTime();
        const res = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}&t=${cacheBuster}`);
        const data = await res.json();
        
        if (data.status === 'ok') {
            if (loading) loading.style.display = 'none';
            if (list) list.innerHTML = '';

            data.items.forEach(item => {
                const vId = item.link.split('v=')[1]?.split('&')[0];
                const isShort = item.title.toLowerCase().includes('#shorts') || item.link.includes('/shorts/');

                if (vId && !isShort && list) {
                    list.innerHTML += `
                        <div class="video-card" onclick="playVideo('${vId}')">
                            <img src="${item.thumbnail}">
                            <h3>${item.title}</h3>
                        </div>
                    `;
                }
            });
        }
    } catch (err) { 
        if (loading) loading.innerText = "Gagal memuat siaran terbaru."; 
    }
}

function playVideo(videoId) {
    window.scrollTo({ top: 500, behavior: 'smooth' });
    document.getElementById('live-player').src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
                          }
          
