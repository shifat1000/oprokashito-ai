(() => {
let auth,user,sessionMessages=[],controller=null;
const cfg=window.OPROKASHITO_CONFIG;
document.addEventListener("DOMContentLoaded",()=>{
firebase.initializeApp(cfg.firebase);auth=firebase.auth();
auth.onAuthStateChanged(u=>{if(!u)location.href="index.html";else{user=u;}});
bind();
});
const $=id=>document.getElementById(id);
const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]));
const md=s=>esc(s).replace(/```([\s\S]*?)```/g,"<pre><code>$1</code></pre>").replace(/\*\*(.*?)\*\*/g,"<strong>$1</strong>").replace(/`([^`]+)`/g,"<code>$1</code>").replace(/\n/g,"<br>");
function add(role,text){const m=$("messages"),w=document.createElement("div");w.className="message "+(role==="user"?"user":"ai");w.innerHTML=`<div class="bubble">${role==="assistant"?md(text):esc(text)}</div>`;m.appendChild(w);m.scrollTop=m.scrollHeight;return w.querySelector(".bubble")}
function reset(){sessionMessages=[];$("messages").innerHTML='<div class="welcome"><div class="brand-mark">অ</div><h2>অপ্রকাশিত</h2><p>যা বলা যায় না, তা বোঝার জন্য।</p></div>'}
async function send(e){e.preventDefault();const p=$("prompt"),text=p.value.trim();if(!text||!user)return;
add("user",text);p.value="";$("status").textContent="অপ্রকাশিত ভাবছে…";
sessionMessages.push({role:"user",content:text});
try{controller=new AbortController();const token=await user.getIdToken();
const r=await fetch(cfg.backendUrl,{method:"POST",headers:{"Content-Type":"application/json","Authorization":"Bearer "+token},body:JSON.stringify({messages:sessionMessages}),signal:controller.signal});
if(!r.ok)throw new Error("REQUEST_FAILED");const data=await r.json();sessionMessages.push({role:"assistant",content:data.content||""});add("assistant",data.content||"উত্তর পাওয়া যায়নি।");$("status").textContent="";}
catch(err){if(err.name==="AbortError"){$("status").textContent="Generation বন্ধ করা হয়েছে।"}else{add("assistant","এই মুহূর্তে অপ্রকাশিত উত্তর দিতে পারছে না।");$("status").textContent="Backend/provider configuration পরীক্ষা করুন।"}}
controller=null}
function bind(){
$("chatForm").addEventListener("submit",send);$("newChat").onclick=reset;$("clear").onclick=reset;$("logout").onclick=()=>auth.signOut();
$("menu").onclick=()=>$("sidebar").classList.toggle("open");
$("attach").onclick=()=>$("file").click();
$("file").onchange=e=>{$("status").textContent=e.target.files[0]?`Attachment selected: ${e.target.files[0].name}`:""};
$("voice").onclick=()=>{const SR=window.SpeechRecognition||window.webkitSpeechRecognition;if(!SR){$("status").textContent="এই browser-এ voice input support নেই।";return}const r=new SR();r.lang="bn-BD";r.onresult=e=>$("prompt").value=e.results[0][0].transcript;r.start()};
$("prompt").oninput=e=>{e.target.style.height="auto";e.target.style.height=Math.min(e.target.scrollHeight,180)+"px"};
}
})();