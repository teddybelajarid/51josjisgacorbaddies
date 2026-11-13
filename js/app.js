/* ===== Class 5.1 Website App ===== */
(function () {
  'use strict';

  // ---------- Data ----------
  let members = [];
  const quotes = [
    "One Class, One Story, Nineteen Memories.",
    "Kebersamaan adalah kunci kebahagiaan.",
    "Di kelas ini, kita belajar lebih dari sekadar pelajaran.",
    "Setiap tawa adalah kenangan yang abadi.",
    "Bersama kita hebat, sendiri kita biasa.",
    "Hari ini kita menulis cerita yang akan dikenang selamanya.",
    "Friendship is the best subject we learn here.",
    "20 jiwa, satu tujuan: tumbuh bersama.",
    "Jangan takut berbeda, takutlah jika sama saja.",
    "Kelas 5.1: tempat di mana mimpi saling mendukung."
  ];

  const jarMemories = [
    "Ingat waktu hujan deras dan kita semua berlarian ke kelas sambil ketawa?",
    "Pertama kali presentasi kelompok, semua nervous tapi akhirnya berhasil!",
    "Saat ada yang ulang tahun, kue dan doa selalu hadir.",
    "Piket bareng yang berubah jadi gossip session 😄",
    "Momen diam-diam saling bantu PR sebelum dikumpul.",
    "Foto bersama di hari terakhir sebelum libur yang penuh air mata bahagia.",
    "Inside joke yang cuma kita yang ngerti.",
    "Saat wali kelas kasih motivasi yang bikin semangat lagi."
  ];

  const bingoItems = [
    "Ada yang telat", "Bawa snack berlebih", "Nyanyi tiba-tiba",
    "Lupa bawa buku", "Ketawa sampai nangis", "Saling pinjam alat tulis",
    "Diskusi serius lalu lepas kontrol", "Ada yang ketiduran", "Bagi-bagi catatan"
  ];

  const scheduleData = {
    Senin: ["Desain Grafis", "Tafsir", "Tarbiyah", "Fisika", "Bahasa Indonesia"],
    Selasa: ["Kimia", "Bahasa Inggris", "Ushul Fiqh", "Fiqh", "Sosial Media Marketing"],
    Rabu: ["Desain Grafis", "Ekonomi", "Sosial Media Marketing", "Shorof", "Biologi", "Ulumul Hadist"],
    Kamis: ["Desain Grafis", "Nahwu", "Bahasa Inggris", "Grammar"],
    Jumat: ["Matematika", "Bahasa Indonesia", "Sosial Media Marketing", "Tarikh", "Hadist"]
  };

  const piketData = {
    Senin: ["Putri", "Shafiyyah", "Bunga", "Kartika"],
    Selasa: ["Nadin", "Ziya", "Widiya", "Khansa"],
    Rabu: ["Salsa", "Bintang", "Hafiza", "Nisa"],
    Kamis: ["Luna", "Nadya", "Samsa", "Nindy"],
    Jumat: ["Donita", "Rily", "Manda", "Haniffah"]
  };

  // ---------- DOM ----------
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  // ---------- Loading ----------
  window.addEventListener('load', () => {
    setTimeout(() => {
      $('#loading-screen').classList.add('hide');
      // Check if we need enter overlay for audio
      const audio = $('#bg-music');
      if (audio) {
        // Try silent play to detect autoplay policy
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.then(() => {
            audio.pause();
            audio.currentTime = 0;
            // Autoplay allowed, no overlay needed
          }).catch(() => {
            // Blocked, show enter overlay
            $('#enter-overlay').classList.remove('hidden');
          });
        }
      }
    }, 1200);
  });

  // ---------- Enter / Music ----------
  const audio = $('#bg-music');
  let isPlaying = false;
  let isMuted = false;

  function updatePlayBtn() {
    $('#play-pause-btn').textContent = isPlaying ? '⏸️' : '▶️';
  }
  function updateMuteBtn() {
    $('#mute-btn').textContent = isMuted ? '🔇' : '🔊';
  }

  $('#enter-btn')?.addEventListener('click', () => {
    $('#enter-overlay').classList.add('hidden');
    if (audio) {
      audio.play().then(() => {
        isPlaying = true;
        updatePlayBtn();
      }).catch(() => {});
    }
  });

  $('#play-pause-btn')?.addEventListener('click', () => {
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      isPlaying = false;
    } else {
      audio.play().then(() => { isPlaying = true; }).catch(() => {});
    }
    updatePlayBtn();
  });

  $('#mute-btn')?.addEventListener('click', () => {
    if (!audio) return;
    isMuted = !isMuted;
    audio.muted = isMuted;
    updateMuteBtn();
  });

  // ---------- Navigation ----------
  function showSection(id) {
    $$('.section').forEach(s => s.classList.remove('active'));
    const target = document.getElementById(id);
    if (target) {
      target.classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    // Update nav states
    $$('.nav-link, .bn-item').forEach(el => {
      el.classList.toggle('active', el.dataset.section === id);
    });
    // Close sidebar
    $('#sidebar').classList.remove('open');
    $('#sidebar-overlay').classList.remove('show');
  }

  $$('.nav-link, .bn-item, .logo').forEach(el => {
    el.addEventListener('click', (e) => {
      const href = el.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        showSection(href.slice(1));
      }
    });
  });

  $('#menu-btn')?.addEventListener('click', () => {
    $('#sidebar').classList.add('open');
    $('#sidebar-overlay').classList.add('show');
  });
  $('#close-sidebar, #sidebar-overlay')?.addEventListener('click', () => {
    $('#sidebar').classList.remove('open');
    $('#sidebar-overlay').classList.remove('show');
  });

  // Hash routing
  window.addEventListener('hashchange', () => {
    const hash = location.hash.slice(1) || 'home';
    showSection(hash);
  });
  if (location.hash) showSection(location.hash.slice(1));

  // ---------- Greeting & Clock ----------
  function updateGreeting() {
    const h = new Date().getHours();
    let g = 'Good Evening';
    if (h < 11) g = 'Good Morning';
    else if (h < 15) g = 'Good Afternoon';
    else if (h < 19) g = 'Good Evening';
    $('#greeting').textContent = g + ' 👋';
  }

  function updateClock() {
    const now = new Date();
    const time = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const date = now.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    $('#live-clock').textContent = time;
    $('#live-date').textContent = date;
  }

  function updateCountdown() {
    // Example: countdown to next semester holiday (adjust date as needed)
    const target = new Date('2027-01-15T00:00:00');
    const now = new Date();
    const diff = target - now;
    if (diff <= 0) {
      $('#countdown').textContent = 'Sudah libur! 🎉';
      return;
    }
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    $('#countdown').textContent = `${days} hari lagi`;
  }

  updateGreeting();
  updateClock();
  updateCountdown();
  setInterval(updateClock, 1000);
  setInterval(updateCountdown, 60000);

  // ---------- Quotes ----------
  function setRandomQuote() {
    const q = quotes[Math.floor(Math.random() * quotes.length)];
    $('#class-quote').textContent = `"${q}"`;
  }
  setRandomQuote();
  $('#refresh-quote')?.addEventListener('click', setRandomQuote);

  // ---------- Members ----------
  async function loadMembers() {
    try {
      const res = await fetch('data/members.json');
      members = await res.json();
      renderMembers(members);
      populateAbsenFilter();
      renderBirthdays();
    } catch (e) {
      console.error('Failed to load members', e);
      $('#members-grid').innerHTML = '<p>Gagal memuat data anggota. Pastikan file data/members.json ada.</p>';
    }
  }

  function renderMembers(list) {
    const grid = $('#members-grid');
    if (!list.length) {
      grid.innerHTML = '<p style="grid-column:1/-1;text-align:center;color:var(--text-muted)">Tidak ada anggota yang cocok.</p>';
      return;
    }
    grid.innerHTML = list.map(m => `
      <article class="member-card" data-id="${m.id}" tabindex="0" role="button" aria-label="Lihat profil ${m.nama}">
        <span class="member-absen">${m.absen}</span>
        <div class="member-avatar">🧕</div>
        <h3 class="member-name">${m.nama.split(' ')[0]}</h3>
        <p class="member-nick">${m.nickname}</p>
      </article>
    `).join('');

    grid.querySelectorAll('.member-card').forEach(card => {
      card.addEventListener('click', () => openMemberModal(+card.dataset.id));
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openMemberModal(+card.dataset.id);
        }
      });
    });
  }

  function populateAbsenFilter() {
    const sel = $('#absen-filter');
    sel.innerHTML = '<option value="">Semua Absen</option>' +
      members.map(m => `<option value="${m.absen}">Absen ${m.absen}</option>`).join('');
  }

  function filterMembers() {
    const q = ($('#member-search').value || '').toLowerCase().trim();
    const absen = $('#absen-filter').value;
    let filtered = members;
    if (q) {
      filtered = filtered.filter(m =>
        m.nama.toLowerCase().includes(q) ||
        m.nickname.toLowerCase().includes(q)
      );
    }
    if (absen) filtered = filtered.filter(m => String(m.absen) === absen);
    renderMembers(filtered);
  }

  $('#member-search')?.addEventListener('input', filterMembers);
  $('#absen-filter')?.addEventListener('change', filterMembers);
  $('#reset-filter')?.addEventListener('click', () => {
    $('#member-search').value = '';
    $('#absen-filter').value = '';
    renderMembers(members);
  });

  // Global search
  $('#global-search')?.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase().trim();
    if (q.length < 2) return;
    // Simple: go to members and filter
    showSection('members');
    $('#member-search').value = q;
    filterMembers();
  });

  // Modal
  function openMemberModal(id) {
    const m = members.find(x => x.id === id);
    if (!m) return;
    const body = $('#modal-body');
    body.innerHTML = `
      <div class="modal-avatar">🧕</div>
      <h2 class="modal-name">${m.nama}</h2>
      <p class="modal-nick">"${m.nickname}" · Absen ${m.absen}</p>
      <div class="profile-grid">
        <div class="profile-item"><label>Motto</label><span>${m.motto}</span></div>
        <div class="profile-item"><label>Hobi</label><span>${m.hobi}</span></div>
        <div class="profile-item"><label>Makanan Favorit</label><span>${m.makanan}</span></div>
        <div class="profile-item"><label>Minuman Favorit</label><span>${m.minuman}</span></div>
        <div class="profile-item"><label>Warna Favorit</label><span>${m.warna}</span></div>
        <div class="profile-item"><label>Cita-cita</label><span>${m.cita}</span></div>
        <div class="profile-item full"><label>Fun Fact</label><span>${m.funfact}</span></div>
        <div class="profile-item full"><label>Quote Pribadi</label><span>"${m.quote}"</span></div>
        <div class="profile-item full"><label>Favorite Moment</label><span>${m.favoriteMoment}</span></div>
        <div class="profile-item"><label>Ulang Tahun</label><span>${formatDate(m.birthday)}</span></div>
        <div class="profile-item"><label>Tanda Tangan</label><span>${m.signature}</span></div>
      </div>
    `;
    $('#member-modal').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    $('#member-modal').classList.add('hidden');
    document.body.style.overflow = '';
  }
  $('#modal-close')?.addEventListener('click', closeModal);
  $('.modal-backdrop')?.addEventListener('click', closeModal);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  function formatDate(iso) {
    if (!iso) return '-';
    const d = new Date(iso);
    return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long' });
  }

  // ---------- Schedule & Piket ----------
  function renderSchedule() {
    const container = $('#schedule-container');
    const days = Object.keys(scheduleData);
    container.innerHTML = days.map(day => `
      <div class="day-card">
        <h3>📅 ${day}</h3>
        <ul class="subject-list">
          ${scheduleData[day].map(s => `<li>${s}</li>`).join('')}
        </ul>
      </div>
    `).join('');
  }

  function renderPiket() {
    const container = $('#piket-container');
    const days = Object.keys(piketData);
    const icons = { Senin: '🧹', Selasa: '🪣', Rabu: '✨', Kamis: '🧼', Jumat: '🌟' };
    container.innerHTML = days.map(day => `
      <div class="piket-card">
        <h3>${icons[day] || '🧹'} ${day}</h3>
        <div class="piket-names">
          ${piketData[day].map(n => `<span>${n}</span>`).join('')}
        </div>
      </div>
    `).join('');
  }

  // ---------- Birthdays ----------
  function renderBirthdays() {
    const list = [...members].sort((a, b) => {
      const da = new Date(a.birthday); const db = new Date(b.birthday);
      return (da.getMonth() - db.getMonth()) || (da.getDate() - db.getDate());
    });
    const now = new Date();
    const container = $('#birthday-list');
    container.innerHTML = list.map(m => {
      const d = new Date(m.birthday);
      const thisYear = new Date(now.getFullYear(), d.getMonth(), d.getDate());
      const diff = Math.ceil((thisYear - now) / (1000 * 60 * 60 * 24));
      const soon = diff >= 0 && diff <= 30;
      return `
        <div class="bday-card ${soon ? 'soon' : ''}">
          <div class="bday-avatar">🎂</div>
          <div class="bday-info">
            <strong>${m.nickname}</strong>
            <span>${formatDate(m.birthday)}${soon ? ` · ${diff === 0 ? 'Hari ini!' : diff + ' hari lagi'}` : ''}</span>
          </div>
        </div>
      `;
    }).join('');
  }

  // ---------- Mood ----------
  const moodKey = 'class51_moods';
  function getMoods() {
    try { return JSON.parse(localStorage.getItem(moodKey)) || {}; }
    catch { return {}; }
  }
  function saveMood(mood) {
    const moods = getMoods();
    const today = new Date().toDateString();
    if (!moods[today]) moods[today] = {};
    // Simple: increment count (anonymous)
    moods[today][mood] = (moods[today][mood] || 0) + 1;
    localStorage.setItem(moodKey, JSON.stringify(moods));
    renderMoodStats();
    showToast('Mood tersimpan! Terima kasih 😊');
  }
  function renderMoodStats() {
    const moods = getMoods();
    const today = new Date().toDateString();
    const data = moods[today] || {};
    const stats = $('#mood-stats');
    if (!Object.keys(data).length) {
      stats.innerHTML = '<p style="color:var(--text-muted)">Belum ada yang share mood hari ini. Jadilah yang pertama!</p>';
      return;
    }
    stats.innerHTML = Object.entries(data)
      .sort((a, b) => b[1] - a[1])
      .map(([m, c]) => `<div class="mood-stat">${m} × ${c}</div>`)
      .join('');
  }
  $$('.mood-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('.mood-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      saveMood(btn.dataset.mood);
    });
  });
  renderMoodStats();

  // ---------- Who Am I ----------
  let currentWho = null;
  $('#start-whoami')?.addEventListener('click', () => {
    if (!members.length) return;
    currentWho = members[Math.floor(Math.random() * members.length)];
    const clues = [
      `Hobinya: ${currentWho.hobi}`,
      `Makanan favorit: ${currentWho.makanan}`,
      `Fun fact: ${currentWho.funfact}`,
      `Warna favorit: ${currentWho.warna}`,
      `Cita-cita: ${currentWho.cita}`
    ];
    const clue = clues[Math.floor(Math.random() * clues.length)];
    $('#whoami-clue').textContent = clue;
    $('#whoami-guess').value = '';
    $('#whoami-result').textContent = '';
    $('#whoami-game').classList.remove('hidden');
  });
  $('#whoami-check')?.addEventListener('click', () => {
    if (!currentWho) return;
    const guess = ($('#whoami-guess').value || '').trim().toLowerCase();
    const correct = guess === currentWho.nickname.toLowerCase() ||
      guess === currentWho.nama.toLowerCase() ||
      currentWho.nama.toLowerCase().includes(guess);
    $('#whoami-result').textContent = correct
      ? `🎉 Benar! Itu ${currentWho.nickname} (${currentWho.nama})`
      : `❌ Belum tepat. Coba lagi! (Jawaban: ${currentWho.nickname})`;
    $('#whoami-result').style.color = correct ? 'green' : 'crimson';
  });

  // ---------- Bingo ----------
  function renderBingo() {
    const board = $('#bingo-board');
    board.innerHTML = bingoItems.map((item, i) =>
      `<div class="bingo-cell" data-i="${i}">${item}</div>`
    ).join('');
    board.querySelectorAll('.bingo-cell').forEach(cell => {
      cell.addEventListener('click', () => cell.classList.toggle('marked'));
    });
  }
  renderBingo();

  // ---------- Guestbook ----------
  const gbKey = 'class51_guestbook';
  function getGuestbook() {
    try { return JSON.parse(localStorage.getItem(gbKey)) || []; }
    catch { return []; }
  }
  function saveGuestbook(list) {
    localStorage.setItem(gbKey, JSON.stringify(list));
  }
  function renderGuestbook() {
    const list = getGuestbook().reverse();
    const container = $('#guestbook-list');
    if (!list.length) {
      container.innerHTML = '<p style="text-align:center;color:var(--text-muted)">Belum ada pesan. Jadilah yang pertama! 💌</p>';
      return;
    }
    container.innerHTML = list.map(m => `
      <div class="gb-msg">
        <strong>${escapeHtml(m.name)}</strong>
        <p>${escapeHtml(m.message)}</p>
        <time>${new Date(m.date).toLocaleString('id-ID')}</time>
      </div>
    `).join('');
  }
  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }
  $('#guestbook-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = $('#gb-name').value.trim();
    const message = $('#gb-message').value.trim();
    if (!name || !message) return;
    const list = getGuestbook();
    list.push({ name, message, date: new Date().toISOString() });
    saveGuestbook(list);
    $('#gb-name').value = '';
    $('#gb-message').value = '';
    renderGuestbook();
    showToast('Pesan berhasil dikirim! 💌');
  });
  renderGuestbook();

  // ---------- Jar of Memories ----------
  $('#jar-btn')?.addEventListener('click', () => {
    const msg = jarMemories[Math.floor(Math.random() * jarMemories.length)];
    $('#jar-message').textContent = msg;
  });

  // ---------- Surprise Me ----------
  $('#surprise-btn')?.addEventListener('click', () => {
    const sections = ['members', 'memories', 'birthday', 'mood', 'games', 'guestbook', 'piket'];
    const random = sections[Math.floor(Math.random() * sections.length)];
    showSection(random);
    showToast('Surprise! ✨');
  });

  // ---------- Text size ----------
  $$('.text-size-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('.text-size-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.body.classList.remove('text-small', 'text-large');
      if (btn.dataset.size === 'small') document.body.classList.add('text-small');
      if (btn.dataset.size === 'large') document.body.classList.add('text-large');
    });
  });

  // ---------- Scroll progress & back to top ----------
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    $('#scroll-progress').style.width = progress + '%';
    $('#back-to-top').classList.toggle('show', scrollTop > 400);
  });
  $('#back-to-top')?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ---------- Toast ----------
  function showToast(msg) {
    const t = $('#toast');
    t.textContent = msg;
    t.classList.remove('hidden');
    setTimeout(() => t.classList.add('hidden'), 2800);
  }

  // ---------- Theme toggle (simple) ----------
  $('#theme-toggle')?.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    // Minimal dark support can be expanded
    $('#theme-toggle').textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
  });

  // ---------- Init ----------
  loadMembers();
  renderSchedule();
  renderPiket();

  // Scroll to memories button
  $('#scroll-memories')?.addEventListener('click', () => showSection('memories'));

  // Keyboard accessibility for sidebar links already handled via click
})();
