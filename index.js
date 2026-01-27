import{a as p,S as m,i as n}from"./assets/vendor-DF5lYoi4.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function r(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}})();const g="https://pixabay.com/api/",y="54321560-f6f3fd1bbb688b32de8acdaed";async function h(a){const o={key:y,q:a,image_type:"photo",orientation:"horizontal",safesearch:!0};try{return(await p.get(g,{params:o})).data}catch(s){throw new Error(`Failed to fetch images: ${s.message}`)}}const b=new m(".gallery a",{captionsData:"alt",captionDelay:250}),c=document.querySelector(".gallery"),f=document.querySelector(".loader-container");function L(a){const o=a.map(({webformatURL:s,largeImageURL:r,tags:e,likes:t,views:i,comments:u,downloads:d})=>`
      <li class="gallery-item">
        <a href="${r}" class="gallery-link">
          <img src="${s}" alt="${e}" loading="lazy" class="gallery-image"/>
        </a>
        <div class="gallery-info">
          <p class="info-item">
            <b>Likes</b>
            ${t}
          </p>
          <p class="info-item">
            <b>Views</b>
            ${i}
          </p>
          <p class="info-item">
            <b>Comments</b>
            ${u}
          </p>
          <p class="info-item">
            <b>Downloads</b>
            ${d}
          </p>
        </div>
          
      </li>
      `).join("");c.insertAdjacentHTML("beforeend",o),b.refresh()}function B(){c.innerHTML=""}function w(){f.style.display="flex"}function l(){f.style.display="none"}const P=document.querySelector(".form");P.addEventListener("submit",a=>{a.preventDefault();const o=a.target.elements["search-text"],s=o.value.trim();if(o.value="",!s){n.error({title:"Error",message:"Please enter a search query.",position:"topRight"});return}B(),w(),h(s).then(r=>{if(l(),!r.hits||r.hits.length===0){n.info({title:"info",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",progressBarColor:"#B51B1B"});return}L(r.hits)}).catch(r=>{l(),n.error({title:"Error",message:r.message||"Failed to fetch images. Please try again.",position:"topRight",progressBarColor:"#B51B1B"}),console.error(r)})});
//# sourceMappingURL=index.js.map
