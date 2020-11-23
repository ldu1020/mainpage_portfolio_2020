/** @format */

const hamburgerMenu = document.querySelector('.hamburger-menu');
const nav = document.querySelector('.navigation');
const navList = document.querySelectorAll('.navigation__lists li');
const beforeOnLoadAni = document.querySelector('.beforeOnLoadAnimation');
const onLoadAni = document.querySelector('.onLoadAniMation');
const article = document.querySelector('.article');

hamburgerMenu.addEventListener('click', () => {
  hamburgerMenu.classList.toggle('change');
  nav.classList.toggle('visible');
});

beforeOnLoadAni.addEventListener('animationend', () => {
  beforeOnLoadAni.style.display = 'none';
  onLoadAni.style.display = 'inline';
  hamburgerMenu.classList.toggle('change');
  nav.classList.toggle('visible');
});

onLoadAni.addEventListener('animationend', () => {
  onLoadAni.style.display = 'none';
});

navList.forEach((li) => {
  li.addEventListener('click', (event) => {
    event.preventDefault();
    beforeOnLoadAni.style.display = 'inline';
    switch (li.textContent) {
      case 'HOME':
        FetchData('./home');
        return;
      case 'PROJECT':
        FetchData('./project');
        return;
    }
  });
});

function FetchData(path) {
  fetch(path).then((data) => {
    data.text().then((text) => {
      article.innerHTML = text;
    });
  });
  history.pushState('', '', path);
}
