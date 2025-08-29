let heartCount = 0;
let coinCount = 100;
let copyCount = 0;
const heartCountEl = document.getElementById('heart-count');
const coinCountEl = document.getElementById('coin-count');
const copyCountEl = document.getElementById('copy-count');
const callHistoryList = document.querySelector('.call-history-list');
function getCurrentTime() {
    const now = new Date();
    let h = now.getHours();
    const m = now.getMinutes().toString().padStart(2, '0');
    const s = now.getSeconds().toString().padStart(2, '0');
    const ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    return `${h}:${m}:${s} ${ampm}`;
}
document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const card = this.closest('.hotline-card');
        const number = card.querySelector('.card-number').textContent;
        navigator.clipboard.writeText(number);
        copyCount++;
        document.getElementById('copy-count-btn').textContent = copyCount + ' Copy';
        alert(`Number ${number} copied to clipboard!`);
        this.textContent = 'Copied!';
        setTimeout(() => {
            this.textContent = 'Copy';
        }, 1200);
    });
});
document.querySelectorAll('.call-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const card = this.closest('.hotline-card');
        const name = card.querySelector('h3').textContent;
        const number = card.querySelector('.card-number').textContent;
        if (coinCount < 20) {
            alert('Not enough coins to make a call!');
            return;
        }
        coinCount -= 20;
        coinCountEl.textContent = coinCount;
        alert(`Calling ${name} at ${number}`);
        const li = document.createElement('li');
        li.innerHTML = `<span>${name}<br>${number}</span><span class="call-time">${getCurrentTime()}</span>`;
        callHistoryList.prepend(li);
    });
});
document.querySelector('.clear-history-btn').addEventListener('click', () => {
    callHistoryList.innerHTML = '';
});
document.querySelectorAll('.fav-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        if (!this.classList.contains('active')) {
            heartCount++;
            heartCountEl.textContent = heartCount;
        } else {
            heartCount--;
            heartCountEl.textContent = heartCount;
        }
        this.classList.toggle('active');
    });
});
