
let portfolio_button = document.getElementById("portfolio-button");
let blog_button = document.getElementById("blog-button");
let resume_button = document.getElementById("resume-button");

portfolio_button.onclick = () => {
  var file = 
  var r = new FileReader();
  r.onload = function (e) {
    var contents = e.target.result;
    document.getElementById("ReadResult").innerHTML = contents;
  }
  r.readAsText(file);
  document.getElementById("main").innerHTML = r.result;
}



