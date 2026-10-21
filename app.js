'use strict';
const $=s=>document.querySelector(s), esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const storageKey='workroom-v1';
let state={favorites:[],notes:{},custom:[]};
try{const stored=JSON.parse(localStorage.getItem(storageKey));if(stored)state=validate(stored);}catch{ /* A malformed backup must not prevent access to the built-in library. */ }
let view='overview',query='',type='',sort='project';
function validUrl(url){try{return new URL(url).protocol==='https:';}catch{return false;}}
function validate(s){
 if(!s||!Array.isArray(s.favorites)||!s.notes||typeof s.notes!=='object'||Array.isArray(s.notes)||!Array.isArray(s.custom))throw Error('Invalid backup format.');
 if(s.custom.length>2000)throw Error('Backup contains too many resources.');
 const ids=new Set(resources.map(r=>r.id));
 const custom=s.custom.map(r=>{if(!r||typeof r.id!=='string'||ids.has(r.id)||typeof r.title!=='string'||!r.title.trim()||!validUrl(r.url)||!Array.isArray(r.projects)||!r.projects.length||r.projects.some(p=>!projects.some(x=>x.id===p)))throw Error('Backup contains an invalid resource.');ids.add(r.id);return {id:r.id,title:r.title.slice(0,180),url:r.url,projects:[...new Set(r.projects)],category:String(r.category||'Reference'),note:String(r.note||''),flag:''};});
 return {favorites:[...new Set(s.favorites.filter(id=>typeof id==='string'&&ids.has(id)))],notes:Object.fromEntries(Object.entries(s.notes).filter(([id,n])=>ids.has(id)&&typeof n==='string')),custom};
}
function all(){return [...resources,...state.custom];}
function notify(message){$('#toast').textContent=message;$('#toast').style.display='block';clearTimeout(notify.timer);notify.timer=setTimeout(()=>$('#toast').style.display='none',3500);}
function save(){try{localStorage.setItem(storageKey,JSON.stringify(state));}catch{notify('Browser storage unavailable. Export a backup to keep your changes.');}}
function projectName(id){return projects.find(p=>p.id===id)?.name||id;}
function go(id){view=id;query='';type='';$('#search').value='';$('#category').value='';render();window.scrollTo({top:0,behavior:'smooth'});}
function renderNav(){
 const items=[['overview','◫','Overview',all().length],['favorites','☆','Favorites',state.favorites.length],['shared','⌘','Shared resources',all().filter(r=>r.projects.length>1).length],['review','⚑','Link review',all().filter(r=>r.flag).length]];
 $('#nav').innerHTML=items.map(([id,icon,name,count])=>navItem(id,icon,name,count)).join('')+'<div class="divider"></div>'+projects.map(p=>navItem(p.id,p.icon,p.name,all().filter(r=>r.projects.includes(p.id)).length)).join('');
 $('#nav').querySelectorAll('button').forEach(b=>b.onclick=()=>go(b.dataset.view));
}
function navItem(id,icon,name,count){return `<button data-view="${id}" class="${view===id?'active':''}" ${view===id?'aria-current="page"':''}><span class="nav-icon">${icon}</span>${esc(name)}<span class="count">${count}</span></button>`;}
function render(){
 renderNav();
 const project=projects.find(p=>p.id===view), special={overview:['Everything in its place.','Your projects, documents, and tools. One connected workspace.'],favorites:['Your everyday essentials.','Keep the resources you reach for most, close at hand.'],shared:['Connected across projects.','One destination, visible wherever you need it.'],review:['A little link housekeeping.','Different labels point to the same tab. Open the resource and confirm its purpose.']};
 $('#title').textContent=project?.name||special[view][0];$('#subtitle').textContent=project?.subtitle||special[view][1];$('#breadcrumb').textContent=project?.name||({overview:'Overview',favorites:'Favorites',shared:'Shared resources',review:'Link review'})[view];
 const shared=all().filter(r=>r.projects.length>1);
 $('#stats').innerHTML=[['◫',projects.length,'Project spaces'],['▤',all().length,'Unique resources'],['⌘',shared.length,'Shared resources'],['☆',state.favorites.length,'Your favorites']].map(([icon,n,t])=>`<div class="stat"><div class="stat-icon">${icon}</div><div><strong>${n}</strong><small>${t}</small></div></div>`).join('');
 const showProjects=view==='overview'&&!query&&!type;$('#projects-section').hidden=!showProjects;
 $('#project-count').textContent=projects.length;
 $('#project-grid').innerHTML=projects.map(p=>{let rs=all().filter(r=>r.projects.includes(p.id));return `<button class="project-card" data-project="${p.id}" style="--accent:${p.color}"><div class="project-top"><span class="project-icon">${p.icon}</span><span class="project-arrow">↗</span></div><h3>${esc(p.name)}</h3><p>${esc(p.subtitle)}</p><div class="project-bottom"><span>▤ ${rs.length} resources</span><span>${rs.filter(r=>r.projects.length>1).length} shared</span></div></button>`;}).join('');
 $('#project-grid').querySelectorAll('button').forEach(b=>b.onclick=()=>go(b.dataset.project));
 $('#connections').hidden=!showProjects;
 $('#connections').innerHTML='<span class="connection-icon">⌘</span><div><strong>Less searching. More connecting.</strong><p>Resources shared across projects stay together. Start with the connections you already have.</p><div class="connection-chips"><button data-target="shared">LAUNCH LA ↔ Pico Warehouse</button><button data-target="shared">ClassVR ↔ Apps & Tools</button><button data-target="shared">School Transfers ↔ Apps & Tools</button></div></div>';
 $('#connections').querySelectorAll('button').forEach(b=>b.onclick=()=>go(b.dataset.target));
 let list=all().filter(r=>(!project||r.projects.includes(view))&&(view!=='favorites'||state.favorites.includes(r.id))&&(view!=='shared'||r.projects.length>1)&&(view!=='review'||r.flag)&&(!type||r.category===type));
 const words=query.toLocaleLowerCase().trim().split(/\s+/).filter(Boolean);
 list=list.filter(r=>words.every(w=>[r.title,r.category,r.note,r.flag,state.notes[r.id],...r.projects.map(projectName)].join(' ').toLocaleLowerCase().includes(w)));
 if(sort==='alpha')list.sort((a,b)=>a.title.localeCompare(b.title));
 $('#library-title').innerHTML=`${project?'Project resources':view==='favorites'?'Favorite resources':view==='review'?'Links to verify':view==='shared'?'Shared resources':'Resource library'} <span>${list.length}</span>`;
 $('#resource-list').innerHTML=list.length?list.map(resourceRow).join(''):`<div class="empty"><strong>${view==='favorites'&&!query?'Your favorites start here.':'No resources found.'}</strong>${view==='favorites'&&!query?'Star any resource to keep it in this view.':'Try a different search or resource type.'}</div>`;
 $('#resource-list').querySelectorAll('.star').forEach(b=>b.onclick=()=>{const id=b.dataset.id;state.favorites=state.favorites.includes(id)?state.favorites.filter(x=>x!==id):[...state.favorites,id];save();render();});
 $('#resource-list').querySelectorAll('.note-toggle').forEach(b=>b.onclick=()=>{const panel=document.getElementById('note-'+b.dataset.id);panel.hidden=!panel.hidden;b.setAttribute('aria-expanded',String(!panel.hidden));if(!panel.hidden)panel.querySelector('textarea').focus();});
 $('#resource-list').querySelectorAll('textarea').forEach(t=>t.oninput=()=>{state.notes[t.dataset.id]=t.value;save();});
 $('#resource-list').querySelectorAll('.project-tag').forEach(b=>b.onclick=()=>go(b.dataset.project));
}
function resourceRow(r){const favorite=state.favorites.includes(r.id);return `<article class="resource"><span class="file-icon" aria-hidden="true">${r.category==='Folder'?'▱':r.category==='Web app'?'↗':'▤'}</span><div><a class="resource-title" href="${esc(r.url)}" target="_blank" rel="noopener noreferrer">${esc(r.title)}<span class="external">↗</span></a><div class="resource-meta">${r.projects.map(p=>`<button class="project-tag" data-project="${p}">${esc(projectName(p))}</button>`).join('')}<span>${new URL(r.url).hostname}</span><button class="note-toggle" data-id="${esc(r.id)}" aria-expanded="false" aria-controls="note-${esc(r.id)}">${state.notes[r.id]?'✎ Edit note':'+ Add note'}</button></div>${r.note?`<p style="font-size:11px;margin-top:5px">${esc(r.note)}</p>`:''}${r.flag?`<div class="flag">⚑ ${esc(r.flag)}</div>`:''}</div><span class="type-tag">${esc(r.category)}</span><button class="star ${favorite?'saved':''}" data-id="${esc(r.id)}" aria-label="${favorite?'Remove from':'Add to'} favorites: ${esc(r.title)}" aria-pressed="${favorite}">${favorite?'★':'☆'}</button><div class="note-panel" id="note-${esc(r.id)}" hidden><textarea rows="2" data-id="${esc(r.id)}" aria-label="Personal note for ${esc(r.title)}" placeholder="Add a reminder, owner, or next step…">${esc(state.notes[r.id]||'')}</textarea><small>Saved automatically in this browser.</small></div></article>`;}
function categories(){const current=$('#category').value;$('#category').innerHTML='<option value="">All resource types</option>'+[...new Set(all().map(r=>r.category))].sort().map(c=>`<option value="${esc(c)}">${esc(c)}</option>`).join('');$('#category').value=current;}
$('#search').oninput=e=>{query=e.target.value;render();};$('#category').onchange=e=>{type=e.target.value;render();};$('#sort').onchange=e=>{sort=e.target.value;render();};
document.addEventListener('keydown',e=>{if(e.key==='/'&&!['INPUT','TEXTAREA','SELECT'].includes(document.activeElement.tagName)&&!$('#resource-dialog').open){e.preventDefault();$('#search').focus();}});
$('.brand').onclick=e=>{e.preventDefault();go('overview');};
$('#project-options').innerHTML=projects.map(p=>`<label><input type="checkbox" name="projects" value="${p.id}">${esc(p.name)}</label>`).join('');
$('#add').onclick=()=>{$('#resource-form').reset();$('#form-error').textContent='';if(projects.some(p=>p.id===view))$('#project-options input[value="'+view+'"]').checked=true;$('#resource-dialog').showModal();};
$('#close-dialog').onclick=()=>$('#resource-dialog').close();
$('#resource-form').onsubmit=e=>{e.preventDefault();const form=new FormData(e.target),groups=form.getAll('projects'),url=form.get('url').trim(),title=form.get('title').trim();if(!title||!groups.length||!validUrl(url)){$('#form-error').textContent='Enter a name, an HTTPS link, and at least one project.';return;}const existing=all().find(r=>r.url===url);if(existing){$('#form-error').textContent='This exact link is already in the library: '+existing.title+'.';return;}state.custom.push({id:'custom-'+crypto.randomUUID(),title,url,projects:groups,category:form.get('category'),note:form.get('note').trim(),flag:''});save();categories();view=groups[0];query='';type='';$('#search').value='';$('#category').value='';render();$('#resource-dialog').close();notify('Resource added to your workspace.');};
$('#export').onclick=()=>{const blob=new Blob([JSON.stringify({version:1,...state},null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),link=document.createElement('a');link.href=url;link.download='workroom-backup-'+new Date().toISOString().slice(0,10)+'.json';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);notify('Backup exported: favorites, personal notes, and added links.');};
$('#import').onclick=()=>$('#import-file').click();$('#import-file').onchange=async e=>{const file=e.target.files[0];if(!file)return;try{if(file.size>5e6)throw Error('Backup is too large.');const incoming=validate(JSON.parse(await file.text()));const merged=new Map(state.custom.map(r=>[r.id,r]));for(const r of incoming.custom)merged.set(r.id,r);state=validate({favorites:[...new Set([...state.favorites,...incoming.favorites])],notes:{...state.notes,...incoming.notes},custom:[...merged.values()]});save();categories();render();notify('Backup imported. Existing resources and favorites retained.');}catch(err){notify('Could not import: '+err.message);}e.target.value='';};
categories();render();
