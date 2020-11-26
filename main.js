/** @format */

const hamburgerMenu = document.querySelector('.hamburger-menu');
const nav = document.querySelector('.navigation');
const navList = document.querySelectorAll('.navigation__lists li');
const beforeOnLoadAni = document.querySelector('.beforeOnLoadAnimation');
const onLoadAni = document.querySelector('.onLoadAniMation');
const content = document.querySelector('.content');
const routes = {
  '/': './home.html',
  '/project': '/project.html',
};

const mobileBoolean = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
  navigator.userAgent
)
  ? true
  : false;

let path;
FetchData('/');

window.addEventListener('popstate', (event) => {
  console.log('[popstate]', event.state);
  FetchData(event.state.path);
});

hamburgerMenu.addEventListener('click', () => {
  hamburgerMenu.classList.toggle('change');
  nav.classList.toggle('visible');
});

onLoadAni.addEventListener('animationend', () => {
  onLoadAni.style.display = 'none';
  beforeOnLoadAni.removeEventListener('animationend', beforeUnloadEvent);
});

function beforeUnloadEvent() {
  window.innerWidth < 750 && hamburgerMenu.classList.toggle('change');
  window.innerWidth < 750 && nav.classList.toggle('visible');
  FetchData(path).then(() => {
    beforeOnLoadAni.style.display = 'none';
    onLoadAni.style.display = 'inline';
  });
}

navList.forEach((li) => {
  li.addEventListener('click', (event) => {
    event.preventDefault();
    path = event.target.getAttribute('href');
    beforeOnLoadAni.addEventListener('animationend', beforeUnloadEvent);
    beforeOnLoadAni.style.display = 'inline';
    history.pushState({ path }, null, path);
  });
});

async function FetchData(path) {
  try {
    const url = routes[path];
    const res = await fetch(url);
    content.innerHTML = await res.text();

    switch (path) {
      case '/project':
        initProject();
        nav.style.backgroundColor = '#4b4b4b';
        document.querySelectorAll('.navigation__lists li').forEach((li) => {
          li.style.color = '#fff';
        });
        return;

      default:
        nav.style.backgroundColor = '#fff';
        document.querySelectorAll('.navigation__lists li').forEach((li) => {
          li.style.color = '#4b4b4b';
        });
        return;
    }
  } catch (err) {
    console.log(err);
  }
}

function initProject() {
  !mobileBoolean &&
    VanillaTilt.init(document.querySelectorAll('.project__card'));
  addProjectDetail();
  addProjectSlide();
}

function addProjectDetail() {
  const BtnsCardDetail = document.querySelectorAll(
    '.project__card-button--detail'
  );

  BtnsCardDetail.forEach((btn) => {
    btn.addEventListener('click', (event) => {
      const targetChildren = event.target.parentNode.parentNode.children;
      const infoMain = targetChildren[0];
      const infoDetail = targetChildren[1];
      infoMain.classList.toggle('invisible');
      infoDetail.classList.toggle('invisible');
      console.log(btn.textContent);
      btn.textContent =
        btn.textContent === '상세설명' ? '돌아가기' : '상세설명';
    });
  });
}

function addProjectSlide() {
  const projectCards = document.querySelectorAll('.project__card');
  projectCards.forEach((card) => {
    const imgWrapper = card.children[1];
    const info = card.children[2];
    const controller = card.children[3];

    // Slide
    const imgWrapperWidth = imgWrapper.getBoundingClientRect().width;
    const imgLists = imgWrapper.children[0];
    const imgListLength = imgLists.children.length;

    imgLists.style.width = `${imgWrapperWidth * imgListLength}px`;
    imgLists.style.display = 'flex';

    const buttons = controller.children;
    const pre = buttons[0];
    const next = buttons[1];
    let flag = 0;

    pre.addEventListener('click', () => {
      if (flag !== 0) {
        flag += 1;
      }
      const move = (100 / imgListLength) * flag;
      imgLists.style.transform = `translate(${move}%)`;
    });

    next.addEventListener('click', () => {
      if (flag + imgListLength > 1) {
        flag -= 1;
      }
      const move = (100 / imgListLength) * flag;
      imgLists.style.transform = `translate(${move}%)`;
      console.log();
    });
  });
}
