(function() {
  document.getElementById("convert").disabled = true;
  var outputname = "filename";

  var positionset = {
    'top-left': " line:5% align:left",
    'top-center': " line:5%",
    'top-right': " line:5% align:right",
    'middle-left': " line:45% align:left",
    'middle-center': " line:45%",
    'middle-right': " line:45% align:right",
    'bottom-left': " align:left",
    'bottom-center': "",
    'bottom-right': " align:right"
  };

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
  var csvreader = new FileReader();
  csvreader.onload = handleCsvRead;
  var srtlines = [];

  srtreader.onload = (event) => {
    const file = event.target.result;
    const allLines = file.split(/\r\n|\n/);
    allLines.forEach((line) => {
        srtlines.push(line);
    });
    window.localStorage.setItem(srtfile, file);
  };

  function handleSrtUpload(event) {
    var file = event.target.files[0];
    if (file.name.substring(file.length - 4) === ".srt") {
      outputname = file.name.slice(0, -4);
    } else {
      outputname = file.name;      
    }
    srtreader.readAsText(file);
    document.getElementById("convert").disabled = false;
  }

  function handleCsvUpload(event) {
    var file = event.target.files[0];
    csvreader.readAsText(file);
  }

  function ts2ms(timestamp) {
    var t = timestamp.split(":");
    seconds = (t[0]*3600)+(t[1]*60)+t[2];
    return seconds*1000;
  }

  function handleCsvRead(event) {
    Papa.parse(event.target.result, {
      step: function(row) {
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

  function downloadVtt(event) {
    var data = localStorage.getItem(srtfile);
    data = "WEBVTT\n\n";
    var trows = {};
    const starts = document.getElementsByName("start");
    const stops = document.getElementsByName("stop");
    const positions = document.getElementsByName("position");
    for (var i = 0; i < starts.length; i++) {
      var start = starts[i].value;
      var stop = stops[i].value;
      var position = positions[i].value;
      trows[start] = {
        stop,
        position
      };
    }
    var timekeys = Object.keys(trows).sort();
    var timematrix = {0:positionset['bottom-center']};
    var endset = {};
    var layers = ['bottom-center'];
    for (var i = 0; i < timekeys.length; i++) {
      var pos = trows[timekeys[i]].position;
      var ts = 0;
      if (timekeys[i] != "") {
        ts = ts2ms(timekeys[i])
      }
      timematrix[ts] = positionset[pos];
      layers.push(pos);
      end = trows[timekeys[i]].stop;
      if (end != "") {
        endset[ts2ms(end)] = layers.length;
      }
      var ek = Object.keys(endset).sort();
      var nextts = timekeys[i];
      if (i + 1 < timekeys.length) {
        console.log(timekeys[i] + "\n" + timekeys[i+1])
        nextts = ts2ms(timekeys[i+1]);
      } else {
        nextts = ek[ek.length];
      }
      for (j = 0; j < ek.length; j++) {
        if (ek[j] <= nextts) {
          if (ek[j] === layers.length) {
            newpos = layers[layers.length-1];
            timematrix[ek[j]] = newpos;
          }
          layers.splice(endset[ek[j]], 1);
        }
      }
    }
    var cycle = 0;
    for (var i = 0; i < srtlines.length; i++) {
      if (srtlines[i] === "") {
        cycle = 0;
        data += "\n";
        continue;
      }
      if (cycle === 0) {
        cycle++;
        continue;
      }
      if (cycle === 1) {
        cycle++;
        var timerange = srtlines[i].replace(",", ".");
        var trts = ts2ms(timerange.substring(0,12));
        if (trts >= nexts) {
          pos++
          nexts = spoints[pos];
          currentposition = positions[pos];
        }
        data += timerange + currentposition + "\n";
        continue;
      }
      if (cycle >= 2) {
        cycle++;
        data += srtlines[i] + "\n"
        continue;
      }
    }    
    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:attachment/text,' + encodeURI(data);
    hiddenElement.target = '_blank';
    hiddenElement.download = outputname+'.vtt';
    hiddenElement.click();
  }

})();