
document.addEventListener('DOMContentLoaded',()=>{
 const input=document.querySelector('[data-search]');
 if(input){input.addEventListener('input',()=>{const q=input.value.trim().toLowerCase();document.querySelectorAll('.species-card').forEach(c=>{c.style.display=c.innerText.toLowerCase().includes(q)?'':'none'});});}
 document.querySelectorAll('[data-filter]').forEach(btn=>btn.addEventListener('click',()=>{const q=btn.dataset.filter.toLowerCase();document.querySelectorAll('.species-card').forEach(c=>{c.style.display=(c.dataset.tags||c.innerText).toLowerCase().includes(q)?'':'none'});}));
});
