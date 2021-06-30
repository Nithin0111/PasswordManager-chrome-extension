let password = "DefaultPassword";
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

function copyTextToClipboard(text) {
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
}

document.getElementById("generatePwd").addEventListener("click", () => {
  generatePassword();
  document.getElementById("pwdField").innerHTML = password;
  document.getElementById("copyBtn").style.display = "inline-block";
});

document.getElementById("copyBtn").addEventListener("click", () => {
  copyTextToClipboard(password);
  chrome.storage.local.set({
    password: password,
  });
  document.getElementById("copyText").style.display = "block";
});

chrome.storage.local.get("password", (data) => {
  document.getElementById(
    "lastPwd"
  ).innerHTML = `Last copied password is: <br> <span style="color:#e6f07d">${data.password}<span>`;
});
