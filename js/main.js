// js/main.js - client-side demo auth and basic behaviors 
const auth = { 
// Demo credentials (client-side only): student/student123 or admin/admin123 
 login: (username, password) => { 
 if((username === 'student' && password === 'student123') || (username === 'admin' && 
 password === 'admin123')){ 
 sessionStorage.setItem('univ_user', username); 
 return true; 
 } 
 return false; 
  }, 
 logout: () =>
     { 
      sessionStorage.removeItem('univ_user'); 
      window.location.href = 'index.html'; 
    }, 
 currentUser: () => sessionStorage.getItem('univ_user') 
    }; 
 document.addEventListener('DOMContentLoaded', () => { 
 const path = window.location.pathname.split('/').pop(); 
 // Protect dashboard (client-side demo) 
 if(path === 'dashboard.html'){ 
 if(!auth.currentUser()){ 
 window.location.href = 'login.html?redirect=dashboard.html'; 
 } 
  else { 
     const nameEl = document.getElementById('welcomeName'); 
     if(nameEl) nameEl.textContent = auth.currentUser();
     } 
 }
 // Login form handler 
 const loginForm = document.getElementById('loginForm'); 
 if(loginForm){ 
 loginForm.addEventListener('submit', (e) => { 
 e.preventDefault(); 
 const u = document.getElementById('username').value.trim(); 
 const p = document.getElementById('password').value.trim(); 
 if(auth.login(u,p)){ 
 const params = new URLSearchParams(window.location.search); 
 const redirect = params.get('redirect') || 'dashboard.html'; 
 window.location.href = redirect; 
 } else { 
 alert('Invalid credentials. Try student/student123 or admin/admin123'); 
 } 
 }); 
 } 
 // Logout button 
 const logoutBtn = document.getElementById('logoutBtn'); 
 if(logoutBtn) logoutBtn.addEventListener('click', auth.logout); 
 // Contact form: open mail client as fallback (static demo) 
 const contactForm = document.getElementById('contactForm'); 
 if(contactForm){ 
 contactForm.addEventListener('submit', (e) => { 
 e.preventDefault(); 
 const name = document.getElementById('cname').value.trim(); 
 const email = document.getElementById('cemail').value.trim(); 
 const msg = document.getElementById('cmessage').value.trim(); 
 if(!name || !email || !msg){ alert('Please fill all fields'); return; } 
 const subj = encodeURIComponent('Website Contact from ' + name); 
 const body = encodeURIComponent('Message:\\n' + msg + '\\n\\nContact email: ' + 
 email); 
 window.location.href = `mailto:info@university.edu?subject=${subj}&body=${body}`; 
 }); 
 } 
});  