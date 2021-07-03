// html creation
const ce_main_container = document.createElement("div");
// const ce_burger_1 = document.createElement("div");
// const ce_burger_2 = document.createElement("div");
// const ce_burger_3 = document.createElement("div");
const ce_button = document.createElement("div");
const ce_child_container = document.createElement("div");
const nsp_container = document.createElement("div");
const nsp_child_container = document.createElement("div");
const nsp_pwd_text = document.createElement("div");
const nsp_pwd_btn = document.createElement("div");
const nsp_cp_btn = document.createElement("div");
const cp_text = document.createElement("p");
const fill_btn = document.createElement("div");

//Adding Classes
nsp_pwd_text.classList.add("nsp_text");
nsp_pwd_btn.classList.add("nsp_btn");
nsp_cp_btn.classList.add("nsp_btn");
fill_btn.classList.add("fill_btn");

//Adding Ids
cp_text.id = "cp_text";
ce_main_container.classList.add("ce_main");
ce_button.id = "ce_button";
ce_child_container.id = "ce_child";
nsp_container.id = "nsp_container";
nsp_child_container.id = "nsp_child";
nsp_cp_btn.id = "cp_btn";

//Appending to containers
ce_main_container.appendChild(ce_button);
ce_main_container.appendChild(ce_child_container);

//Adding to nsp container
nsp_container.appendChild(nsp_child_container);
nsp_container.appendChild(cp_text);
nsp_container.appendChild(fill_btn);
nsp_child_container.appendChild(nsp_pwd_text);
nsp_child_container.appendChild(nsp_pwd_btn);
nsp_child_container.appendChild(nsp_cp_btn);

//Adding Inner Htmls
fill_btn.innerHTML = "Fill Password";
cp_text.innerHTML = "Copied";
ce_button.innerHTML =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="#fff" d="M0 0h24v24H0z"/><path d="M4 22a8 8 0 1 1 16 0H4zm8-9c-3.315 0-6-2.685-6-6s2.685-6 6-6 6 2.685 6 6-2.685 6-6 6z"/></svg>';
nsp_pwd_btn.innerHTML =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" style="fill: #fff;"><path fill="none" d="M0 0h24v24H0z"></path><path d="M5.463 4.433A9.961 9.961 0 0 1 12 2c5.523 0 10 4.477 10 10 0 2.136-.67 4.116-1.81 5.74L17 12h3A8 8 0 0 0 6.46 6.228l-.997-1.795zm13.074 15.134A9.961 9.961 0 0 1 12 22C6.477 22 2 17.523 2 12c0-2.136.67-4.116 1.81-5.74L7 12H4a8 8 0 0 0 13.54 5.772l.997 1.795z"></path></svg>';
nsp_cp_btn.innerHTML =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" style="fill: #fff"><path fill="none" d="M0 0h24v24H0z"/><path d="M7 6V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-3v3c0 .552-.45 1-1.007 1H4.007A1.001 1.001 0 0 1 3 21l.003-14c0-.552.45-1 1.007-1H7zM5.003 8L5 20h10V8H5.003zM9 6h8v10h2V4H9v2z"/></svg>';
// if (document.querySelector("input[type='password']")) {
//   document.querySelector("body").appendChild(ce_main_container);
// }

// Variable Initialization
let password = "Click Refresh";

//functions
const generatePassword = () => {
  var specials = "!@#$%^&*()_+{}:\"<>?|[];',./`~";
  var lowercase = "abcdefghijklmnopqrstuvwxyz";
  var uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var numbers = "0123456789";

  var all = specials + lowercase + uppercase + numbers;

  String.prototype.pick = function (min, max) {
    var n,
      chars = "";

    if (typeof max === "undefined") {
      n = min;
    } else {
      n = min + Math.floor(Math.random() * (max - min));
    }

    for (var i = 0; i < n; i++) {
      chars += this.charAt(Math.floor(Math.random() * this.length));
    }

    return chars;
  };

  String.prototype.shuffle = function () {
    var array = this.split("");
    var tmp,
      current,
      top = array.length;

    if (top)
      while (--top) {
        current = Math.floor(Math.random() * (top + 1));
        tmp = array[current];
        array[current] = array[top];
        array[top] = tmp;
      }

    return array.join("");
  };

  var genPassword = (
    specials.pick(1) +
    lowercase.pick(1) +
    uppercase.pick(1) +
    all.pick(10, 16)
  ).shuffle();
  password = genPassword;
};

const copyTextToClipboard = (text) => {
  if (!navigator.clipboard) {
    return;
  }
  navigator.clipboard.writeText(text).then(
    function () {
      console.log("Copy successful!");
    },
    function (err) {
      console.error("Copy failed because of", err);
    }
  );
};

//Extension main logic
//Extracting parent of the password input field
let pwdParent = document.querySelector("input[type='password']").parentElement;

pwdParent.style.position = "relative";
pwdParent.appendChild(ce_main_container);

//on click on main icon show the popup of gen passoword
ce_main_container.addEventListener("click", () => {
  document.querySelector("#ce_child").appendChild(nsp_container);
  nsp_container.classList.add("open_popup");
});

nsp_pwd_text.innerHTML = password;
nsp_pwd_btn.addEventListener("click", () => {
  generatePassword();
  cp_text.style.display = "none";
  nsp_pwd_text.innerHTML = password;
});

nsp_cp_btn.addEventListener("click", () => {
  copyTextToClipboard(password);
  chrome.storage.local.set({
    password: password,
  });
  cp_text.style.display = "block";
});

fill_btn.addEventListener("click", () => {
  document.querySelector('input[type="password"]').value = password;
});
