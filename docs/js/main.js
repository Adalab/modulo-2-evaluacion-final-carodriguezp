const m=document.querySelector(".js-input"),h=document.querySelector(".js-button-search"),L=document.querySelector(".js-button-reset"),a=document.querySelector(".js-button-delete-all-fav"),u=document.querySelector(".js-total-number-results");let o=[];function v(e){const n=`https://api.jikan.moe/v4/anime?q=${e}`;fetch(n).then(t=>t.json()).then(t=>{o=t.data,c(o)})}function c(e){const n=document.querySelector(".js-container-results");n.innerHTML="";const t=d();u.innerHTML=`Tienes ${e.length} resultados en total`;for(let i=0;i<e.length;i++)t.findIndex(l=>l.mal_id===e[i].mal_id)!==-1?n.innerHTML+=`<li class="container__section-results-div_list-results-element js-element-list favorite-anime" id="${e[i].mal_id}">
                <img src="${e[i].images.jpg.image_url}" alt="Foto de la portada de ${e[i].title}">
                
                <p>${e[i].title}</p>
                <p>${e[i].aired.string}</p>

            </li>`:n.innerHTML+=`<li class="container__section-results-div_list-results-element js-element-list" id="${e[i].mal_id}">
                <img src="${e[i].images.jpg.image_url}" alt="Foto de la portada de ${e[i].title}">

                <section>
                
                <p>${e[i].title}</p>
                <p>${e[i].aired.string}</p>
                </section>
            </li>`,e[i].images.jpg.image_url==="https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png"&&(e[i].images.jpg.image_url="https://placehold.co/200x300?text=Not+Found");f(),p(o)}function S(e){e.preventDefault(),m.value&&v(m.value)}h.addEventListener("click",S);function s(e){const n=document.querySelector(".js-container-favorite");n.innerHTML="";for(let t=0;t<e.length;t++)n.innerHTML+=`<li class="container__section-favorite-div favorite-anime" id="${e[t].mal_id}">
                                            <img src="${e[t].images.jpg.image_url}" alt="Foto de la portada de ${e[t].title}">
                                            <p>${e[t].title}</p>
                                            <i id="${e[t].mal_id}" class="fa-solid fa-square-xmark js-button-remove-favorite"></i>
                                        </li>`,e[t].images.jpg.image_url==="https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png"&&(e[t].images.jpg.image_url="https://placehold.co/200x300?text=Not+Found");f(),I(),e.length?a.classList.remove("hidden"):a.classList.add("hidden")}function _(e){const n=d(),t=parseInt(e.currentTarget.id),i=o.find(l=>t===l.mal_id);n.findIndex(l=>l.mal_id===t)===-1&&n.push(i),s(n),g(n),c(o),a.classList.remove("hidden")}function f(){const e=document.querySelectorAll(".js-element-list");for(const n of e)n.addEventListener("click",_)}function j(){const e=d();e!==null?s(e):v()}j();function d(){return localStorage.getItem("FavoriteAnimes")?JSON.parse(localStorage.getItem("FavoriteAnimes")):[]}function g(e){localStorage.setItem("FavoriteAnimes",JSON.stringify(e))}function F(e){e.preventDefault(),localStorage.removeItem("FavoriteAnimes");const n=document.querySelector(".js-container-favorite");n.innerHTML="";const t=document.querySelector(".js-container-results");t.innerHTML="",m.value="",a.classList.add("hidden"),u.innerHTML=""}L.addEventListener("click",F);function $(e){const n=d(),t=parseInt(e.currentTarget.id),i=n.filter(r=>r.mal_id!==t);g(i),c(o),s(i)}function I(){const e=document.querySelectorAll(".js-button-remove-favorite");for(const n of e)n.addEventListener("click",$)}function q(){localStorage.removeItem("FavoriteAnimes"),c(o),s([])}a.addEventListener("click",q);function p(e){let n=[2,5,9];for(let t=0;t<n.length;t++)e.length<n[t]?console.log(`La longitud del array es menor que ${n[t]}`):e.length>n[t]?console.log(`La longitud del array es mayor que ${n[t]}`):console.log(`La longitud del array es igual que ${n[t]}`)}u.addEventListener("click",p);
//# sourceMappingURL=main.js.map
