(function() {
  document.getElementById("convert").disabled = true;

  function removerow(event) {
    event.srcElement.closest("tr").remove();
  }

  var srtfile = 'captions.srt';
  document.querySelector('#srtupload').addEventListener('change', handleSrtUpload, false);
  document.querySelector('#timingupload').addEventListener('change', handleCsvUpload, false);
  document.querySelector('#add-row').addEventListener('click', addBlankRow, false);
  document.querySelector('#convert').addEventListener('click', downloadVtt, false);
  document.querySelector('.delete-row').addEventListener('click', removerow, false);
  document.body.addEventListener( 'click', function ( event ) {
    if(event.srcElement.classList.contains('delete-row')) {
      removerow(event);
    };
  });
  var srtreader = new FileReader();
  srtreader.onload = handleSrtRead;
  var csvreader = new FileReader();
  csvreader.onload = handleCsvRead;

  function handleSrtUpload(event) {
    var file = event.target.files[0];
    srtreader.readAsText(file);
    document.getElementById("convert").disabled = false;
  }

  function handleCsvUpload(event) {
    var file = event.target.files[0];
    csvreader.readAsText(file);
  }

  function handleSrtRead(event) {
    var save = event.target.result;
    window.localStorage.setItem(srtfile, save);
  }

  function handleCsvRead(event) {
    Papa.parse(event.target.result, {
      step: function(row) {
        console.log("Row:", row.data);
        if (row.data.length === 3) {
          addrow(row.data[0],row.data[1],row.data[2]);          
        }
      },
      complete: function() {
        console.log("Done processing CSV timings.");
      }
    });
  }

  var rowcount = 1;
  var c1blank = document.getElementById('start1');
  var c2blank = document.getElementById('stop1')
  var c3blank = document.getElementById('position1')

  function addrow(start, stop, position) {
    row = document.querySelector('#timingtable').insertRow(-1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    rowcount++;
    var f1 = c1blank.cloneNode(true);
    f1.id = "start"+rowcount;
    if (typeof start !== 'undefined') {
      f1.value = start;
    }
    cell1.appendChild(f1);
    var f2 = c2blank.cloneNode(true);
    f2.id = "stop"+rowcount;
    if (typeof stop !== 'undefined') {
      f2.value = stop;
    }
    cell2.appendChild(f2);
    var f3 = c3blank.cloneNode(true);
    f3.id = "position"+rowcount;
    if (typeof position !== 'undefined') {
      f3.value = position;
    }
    cell3.appendChild(f3);
    cell4.innerHTML = '<button class="delete-row">❌</button>';
    row.append
  }

  function addBlankRow(event) {
    addrow();
  }

  function sortObj(obj) {
    return Object.keys(obj).sort().reduce(function (result, key) {
      result[key] = obj[key];
      return result;
    }, {});
  }

  function downloadVtt(event) {
    var data = localStorage.getItem(srtfile);
    var trows = {};
    var table = document.getElementById("timingtable");
    for (var i = 1, row; row = table.rows[i]; i++) {
      var start = row.getElementsByName("start").value;
      var stop = row.getElementsByName("stop").value;
      var position = row.getElementsByName("position").value;
      trows[start] = {
        stop,
        position
      };
    }
    var rows = sortObj(trows);
    console.log(data);
    console.log(rows);
  }

})();