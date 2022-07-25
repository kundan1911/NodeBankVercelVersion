
var menu = document.querySelector(".Menu")

function changeContent() {
  if (document.documentElement.clientWidth <= 550) {
    menu.innerHTML = ""
  }
  else {
    menu.innerHTML = "Menu"
  }
}

window.addEventListener("resize", changeContent)

console.log("ininin")

function popup(mylink, windowname) {
  if (!window.focus)
    return true;
  var href;
  if (typeof (mylink) == 'string')
    href = mylink;
  else href = mylink.href;
  window.open(href, windowname, 'width=200,height=200');
  return false;
}
const allbutton = document.querySelectorAll('.buttons');
const favDialog = document.getElementById('favDialog');
const selectEl = favDialog.querySelector('select');
const confirmBtn = document.querySelector("#confirmBtn");
const transfermoney = document.querySelector("#Transferamount")
var transferaccount = 0;
var sender = "non";
var receiver = "non";
var closeModal = 0;
// If a browser doesn't support the dialog, then hide the
// dialog contents by default.
if (typeof favDialog.showModal !== 'function') {
  favDialog.hidden = true;

}
console.log("event")
// buttons opens the <dialog> modally
allbutton.forEach(element => {
  element.addEventListener('click', () => {
    sender = element.getAttribute("value");
    document.querySelector(".thesender").setAttribute("value", sender)
    favDialog.showModal()
  })
})



selectEl.addEventListener("change", function () {
  receiver = selectEl.value;
  console.log(receiver)
})

transfermoney.addEventListener("change", function () {
  transferaccount = transfermoney.value
  console.log(transferaccount)
})

confirmBtn.addEventListener("click", function () {
  favDialog.style.display = "none"
  closeModal = 1;
  sendalert()
})

function sendalert() {
  alert("Money of amount " + transferaccount + " is successfully transferred from " + sender + " to " + receiver)
}
