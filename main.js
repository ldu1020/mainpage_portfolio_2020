const testdiv = document.querySelector('.ani_test')
testdiv.addEventListener('click',()=>{
  const a = document.createElement('div');
  a.setAttribute('class',"item")
  testdiv.appendChild(a)
  a.style.width ="30%"
  a.style.height ="30%"
  a.style.backgroundColor="white"

})

