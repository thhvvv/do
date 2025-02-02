var currentdate = moment().format('LLLL');

setTimeout(function () {
  document.getElementById("time").innerHTML = currentdate;
}, 100);

setInterval(function () {
  var currentdate = new Date();
  document.getElementById("time").innerHTML = currentdate;
}, 10000);

function showform() {
  $("#add").attr("onclick", "hideform()");
  document.getElementById("form").className = "animated fadeIn";
  document.getElementById("form").style.display = "inherit";
}

function hideform() {
  $("#add").attr("onclick", "showform()");
  document.getElementById("form").className = "animated fadeOut";
  setTimeout(function () {
    document.getElementById("form").style.display = "none";
  }, 600);
}

function addData() {
  var title1 = document.getElementById("title").value;
  var body1 = document.getElementById("body").value;
  if (!title1) {
    document.getElementById("title").style.borderBottomColor = "red";
    document.getElementById("body").style.borderBottomColor = "#282828";
    document.getElementById("error").style.display = "inline";
    return;
  } else if (!body1) {
    document.getElementById("body").style.borderBottomColor = "red";
    document.getElementById("title").style.borderBottomColor = "#282828";
    document.getElementById("error").style.display = "inline";
  } else {
    document.getElementById("title").style.borderBottomColor = "#282828";
    document.getElementById("title").style.borderBottomColor = "#282828";
    document.getElementById("error").style.display = "none";
    var randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    var uniqid = randLetter + Date.now();
    var data = [];
    data.push({
      id: uniqid,
      title: title1,
      body: body1,
      time: currentdate
    });
    var old = localStorage.getItem("todo");
    var oldData = JSON.parse(old);
    if (oldData) {
      for (var i = 0; i < oldData.length; i++) {
        data.push(oldData[i]);
      }
    }
    localStorage.setItem("todo", JSON.stringify(data));
    document.getElementById("form").className = "animated fadeOut";
    setTimeout(function () {
      document.getElementById("form").style.display = "none";
    }, 600);
    showdata();
  }
}

function showdata() {
  var html = "";
  if (!localStorage.getItem("todo") || localStorage.getItem("todo") == "[]") {
    html += '<div style="margin:10vh 0px;"><h2>add an item to see it here :)</h2></div>';
  } else {
    var gotdata = JSON.parse(localStorage.getItem("todo"));
    for (var i = 0; i < gotdata.length; i++) {
      id = "'" + gotdata[i].id + "'";
      html += '<div class="todo" id="' + gotdata[i].id + '"><h2>' + gotdata[i].title + '</h2><h3>' + gotdata[i].body + '</h3> <div id="remove" onclick="remove(' + id + ');"><i class="far fa-trash-alt"></i></div> &nbsp; <b>' + gotdata[i].time + '</b></div>';
    }
  }
  $("#list").html(html);
}

function remove(idnumber) {
  var item = JSON.parse(localStorage.getItem("todo"));
  for (var i = 0; i < item.length; i++) {
    if (item[i].id == idnumber) {
      item.splice(i, 1);
      document.getElementById(idnumber).className += " animated pulse";
      document.getElementById(idnumber).innerHTML = "<br><h2>removed!!</h2>";
      setTimeout(function () {
        showdata();
      }, 1500);
      break;
    }
  }
  var item = JSON.stringify(item);
  localStorage.setItem("todo", item);
}
