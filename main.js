/** @format */

const hamburgerMenu = document.querySelector('.hamburger-menu');
const nav = document.querySelector('.navigation');
const navList = document.querySelectorAll('.navigation__lists li');
const beforeUnLoadAni = document.querySelector('.beforeOnLoadAnimation');
const onLoadAni = document.querySelector('.onLoadAniMation');
const content = document.querySelector('.content');

// color
const darkgray = '#4b4b4b';
const superLightGray = '#fafafa';
const white = '#fff';
const blue = '#4ec7f3';
const green = '#42c58a';
const pink = '#ff6961';

const routes = {
  '/': './path/home.html',
  '/project': '/path/project.html',
  '/about-me': '/path/about-me.html',
};

const mobileBoolean = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
  navigator.userAgent
)
  ? true
  : false;

let path;

window.addEventListener('load', (event) => {
  console.log(location.pathname);
  switch (location.pathname) {
    case '/project':
      fetchSet('/project');
      return;
    case '/about-me':
      fetchSet('/about-me');
      return;
    default:
      fetchSet('/');
      return;
  }
});

window.addEventListener('popstate', (event) => {
  console.log('[popstate]', event.state);
  const _path = event.state ? event.state.path : '/';
  fetchSet(_path);
});

function fetchSet(path) {
  FetchData(path).then(() => {
    switchInitScript(path);
    switchThemeColor(path);
    switchAccentColor(path);
  });
}

hamburgerMenu.addEventListener('click', () => {
  hamburgerMenu.classList.toggle('change');
  nav.classList.toggle('visible');
});

onLoadAni.addEventListener('animationend', () => {
  onLoadAni.style.display = 'none';
  beforeUnLoadAni.removeEventListener('animationend', beforeUnloadEvent);
});

function beforeUnloadEvent() {
  window.innerWidth < 750 && hamburgerMenu.classList.toggle('change');
  window.innerWidth < 750 && nav.classList.toggle('visible');
  console.log(path);
  FetchData(path).then(() => {
    switchThemeColor(path);
    switchInitScript(path);
    beforeUnLoadAni.style.display = 'none';
    onLoadAni.style.display = 'inline';
  });
}

navList.forEach((li) => {
  const link = li.firstChild;
  link.addEventListener('click', (event) => {
    event.preventDefault();
    path = event.target.getAttribute('href');
    beforeUnLoadAni.addEventListener('animationend', beforeUnloadEvent);
    switchAccentColor(path);
    beforeUnLoadAni.style.display = 'inline';
    history.pushState({ path }, null, path);
  });
});

async function FetchData(path) {
  try {
    const url = routes[path];
    const res = await fetch(url);
    content.innerHTML = await res.text();
  } catch (err) {
    console.log(err);
  }
}

function switchInitScript(path) {
  switch (path) {
    case '/project':
      initProject();
      return;
    case '/about-me':
      initAboutMe();
      return;
    default:
      return;
  }
}

function switchThemeColor(path) {
  switch (path) {
    case '/project':
      changeThemeColor(darkgray, white);
      return;
    case '/about-me':
      changeThemeColor(superLightGray, darkgray);
      return;
    default:
      changeThemeColor(white, darkgray);
      return;
  }
}

function switchAccentColor(path) {
  switch (path) {
    case '/project':
      changeAccentColor(blue);
      return;
    case '/about-me':
      changeAccentColor(pink);
      return;
    default:
      changeAccentColor(green);
      return;
  }
}

function changeThemeColor(background, text) {
  document.documentElement.style.setProperty('--background-color', background);
  document.documentElement.style.setProperty('--text-color', text);
}

function changeAccentColor(accent) {
  document.documentElement.style.setProperty('--accent-color', accent);
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

const skills = document.querySelectorAll('.aboutMe__skill-box li');
skills.forEach((li) => {
  li.addEventListener('click', (event) => {
    console.log(event.target.classList);
  });
});

function initAboutMe() {
  addArccodian();
}

function addArccodian() {
  document
    .querySelector('.aboutMe__sentence-show-btn')
    .addEventListener('click', () => {
      document
        .querySelector('.aboutMe__sentence-detail')
        .classList.toggle('open-detail');
      document
        .querySelector('.aboutMe__sentence-show-btn')
        .classList.toggle('up-down-toggle');
    });
}
