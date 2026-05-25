
const menuButton=document.querySelector('[data-menu]');
if(menuButton){menuButton.addEventListener('click',()=>document.body.classList.toggle('nav-open'));}
const searchInput=document.querySelector('[data-search]');
if(searchInput){searchInput.addEventListener('input',e=>{const q=e.target.value.toLowerCase();document.querySelectorAll('.species-card,.habitat-card').forEach(card=>{card.style.display=card.innerText.toLowerCase().includes(q)?'':'none';});});}
document.querySelectorAll('[data-filter]').forEach(btn=>btn.addEventListener('click',()=>{const term=btn.dataset.filter.toLowerCase();document.querySelectorAll('.species-card').forEach(card=>{card.style.display=(card.dataset.tags||'').toLowerCase().includes(term)?'':'none';});}));
