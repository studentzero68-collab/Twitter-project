const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const modal = document.getElementById('tweetModal');
const openModalBtn = document.getElementById('openModal');
const closeModalBtn = document.getElementById('closeModal');
const mobileComposeBtn = document.getElementById('mobileComposeBtn');
const composerText = document.getElementById('composerText');
const modalComposerText = document.getElementById('modalComposerText');
const postBtn = document.getElementById('postBtn');
const modalPostBtn = document.getElementById('modalPostBtn');
const charCount = document.getElementById('charCount');
const feed = document.getElementById('feed');
const thumbnailPool = [
  './assets/How to cook like a boss.jpg',
  './assets/FOCUS.jpg',
  './assets/Procracstination.jpg',
  './assets/thumbnail design 🔥.jpg',
  './assets/Reaction image I got from tt.jpg'
];

const isLightMode = localStorage.getItem('twitter-theme') === 'light';
if (isLightMode) {
  body.classList.add('light-mode');
}

function updateThemeIcon() {
  if (!themeToggle) return;
  const icon = themeToggle.querySelector('i');
  if (!icon) return;
  icon.className = body.classList.contains('light-mode') ? 'bi bi-sun' : 'bi bi-moon-stars';
}

function toggleTheme() {
  body.classList.toggle('light-mode');
  const isLight = body.classList.contains('light-mode');
  localStorage.setItem('twitter-theme', isLight ? 'light' : 'dark');
  updateThemeIcon();
}

function openModal() {
  if (!modal) return;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  const textArea = modalComposerText || composerText;
  textArea?.focus();
}

function closeModal() {
  if (!modal) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
}

function updatePostButtonState(textArea, button) {
  const value = textArea.value.trim();
  const isReady = value.length > 0 && value.length <= 280;
  button?.classList.toggle('active', isReady);
  button?.classList.toggle('disabled', !isReady);
  button.disabled = !isReady;
  if (charCount) {
    charCount.textContent = String(280 - value.length);
    charCount.classList.toggle('warning', value.length > 220);
    charCount.classList.toggle('danger', value.length > 260);
  }
}

function addThumbnails() {
  document.querySelectorAll('.tweet').forEach((tweet, index) => {
    if (tweet.querySelector('.tweet-thumbnail')) return;

    const body = tweet.querySelector('.tweet-body');
    if (!body) return;

    const thumb = document.createElement('div');
    thumb.className = 'tweet-thumbnail';
    const img = document.createElement('img');
    img.src = thumbnailPool[index % thumbnailPool.length];
    img.alt = 'Post thumbnail';
    thumb.appendChild(img);
    body.appendChild(thumb);
  });
}

function createPost(text) {
  if (!feed || !text.trim()) return;

  const post = document.createElement('div');
  post.className = 'tweet';
  post.innerHTML = `
    <img src="./assets/bomb cat welcome discord banner.jpg" alt="Your avatar" class="avatar-sm" />
    <div class="tweet-body">
      <div class="tweet-header">
        <a href="profile.html" class="tweet-name">Mukelani</a>
        <span class="tweet-handle">@studentzero68</span>
        <span class="tweet-dot">·</span>
        <span class="tweet-time">Just now</span>
      </div>
      <p class="tweet-content">${text}</p>
      <div class="tweet-thumbnail">
        <img src="./assets/How to cook like a boss.jpg" alt="Post thumbnail" />
      </div>
      <div class="tweet-actions">
        <button class="tweet-action reply" aria-label="Reply"><i class="bi bi-chat"></i><span>0</span></button>
        <button class="tweet-action retweet" aria-label="Retweet"><i class="bi bi-repeat"></i><span>0</span></button>
        <button class="tweet-action like" aria-label="Like"><i class="bi bi-heart"></i><span>0</span></button>
        <button class="tweet-action" aria-label="Share"><i class="bi bi-upload"></i></button>
      </div>
    </div>
  `;

  feed.prepend(post);
  if (composerText) composerText.value = '';
  if (modalComposerText) modalComposerText.value = '';
  updatePostButtonState(composerText || modalComposerText, postBtn || modalPostBtn);
  closeModal();
}

if (themeToggle) {
  themeToggle.addEventListener('click', toggleTheme);
}

updateThemeIcon();

[composerText, modalComposerText].forEach((field) => {
  if (!field) return;
  field.addEventListener('input', () => {
    const button = field.id === 'composerText' ? postBtn : modalPostBtn;
    updatePostButtonState(field, button);
  });
});

if (postBtn) {
  postBtn.addEventListener('click', () => createPost(composerText.value));
}

if (modalPostBtn) {
  modalPostBtn.addEventListener('click', () => createPost(modalComposerText.value));
}

if (openModalBtn) openModalBtn.addEventListener('click', openModal);
if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
if (mobileComposeBtn) mobileComposeBtn.addEventListener('click', openModal);

window.addEventListener('click', (event) => {
  if (event.target === modal) closeModal();
});

addThumbnails();
updatePostButtonState(composerText || modalComposerText, postBtn || modalPostBtn);
