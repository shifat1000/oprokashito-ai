document.addEventListener("DOMContentLoaded",()=>{
const c=window.OPROKASHITO_CONFIG;
firebase.initializeApp(c.firebase);const auth=firebase.auth();
const form=document.getElementById("loginForm"),status=document.getElementById("status");
auth.onAuthStateChanged(u=>{if(u)location.href="app.html"});
form.addEventListener("submit",async e=>{e.preventDefault();try{
await auth.signInWithEmailAndPassword(email.value,password.value);
}catch(err){status.textContent="Login ব্যর্থ হয়েছে। Email/Password যাচাই করুন।"}});
});