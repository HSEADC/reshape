// document.addEventListener("DOMContentLoaded", () => {
//   const container = document.getElementById("canvasContainer");
//   const canvas = document.createElement("canvas");
//   const ctx = canvas.getContext("2d");
//   // const width = window.innerWidth - 150;
//   // const height = window.innerHeight + 52;
//   const width = window.innerWidth ;
//   const height = window.innerHeight;
//   canvas.width = width;
//   canvas.height = height;
//   container.appendChild(canvas);
//   ctx.fillStyle = "white";
//   ctx.fillRect(0, 0, canvas.width, canvas.height);
//   ctx.beginPath();
//   ctx.moveTo(canvas.width, 0);
//   ctx.lineTo(0, canvas.height);
//   ctx.stroke();
// });
filterSelection("all");

function filterSelection(c) {
  var x, i;
  x = document.getElementsByClassName("filterDiv");
  if (c == "all") c = ""; // Add the "show" class (display:block) to the filtered elements, and remove the "show" class from the elements that are not selected

  for (i = 0; i < x.length; i++) {
    w3RemoveClass(x[i], "show");
    if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
  }
} // Show filtered elements


function w3AddClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");

  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {
      element.className += " " + arr2[i];
    }
  }
} // Hide elements that are not selected


function w3RemoveClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");

  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);
    }
  }

  element.className = arr1.join(" ");
} // Add active class to the current control button (highlight it)


var btnContainer = document.getElementById("myBtnContainer");
var btns = btnContainer.getElementsByClassName("btn");

for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function () {
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}

var burgerMenu = document.querySelector('.burger-menu');
var mobileNavigation = document.querySelector('.mobile-navigation');
burgerMenu.addEventListener('click', function () {
  mobileNavigation.classList.toggle('show');
});