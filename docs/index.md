## Add positioning to SRT subtitles for Youtube

Youtube uses VTT files for subtitles with enhanced features such as positioning. If you have an SRT file, but you'd like to position the subtitles, you can use this tool to add positioning information.

### Upload SRT

This is the base subtitle file, it's essentially just a text file with timings for the captioning.

<label for="srtfile">SRT file:</label>
<input type="file" name="srtfile" id="srtupload">

#### Upload Timing (optional)

To save time you can upload a CSV with positions. It should be formatted as follows:  
start, stop, position  

If recognized, the timings will be loaded into the form below once the file is uploaded.

<label for="timingcsv">CSV timing file:</label>
<input type="file" name="timingcsv" id="timingupload">

### Adjust Positioning

Use this form to adjust the positioning of the subtitles. You can specify start and stop times to allow the subtitles to move to different positions throughout the video.

<table id="timingtable">
<tr><th>Start</th><th>Stop</th><th>Position</th><th></th></tr>
<tr id="firstrow">
<td><input type="text" id="start1" name="start" placeholder="00:01:02.980" size="12" /></td>
<td><input type="text" id="stop1" name="stop" placeholder="00:01:04.630" size="12" /></td>
<td>
  <select id="position1" name="position">
    <option value="top-left">Top Left</option>
    <option value="top-center">Top Center</option>
    <option value="top-right">Top Right</option>
    <option value="middle-right">Middle Left</option>
    <option value="middle-center">Middle Center</option>
    <option value="middle-right">Middle Right</option>
    <option value="bottom-left">Bottom Left</option>
    <option value="bottom-right" selected>Bottom Center</option>
    <option value="bottom-right">Bottom Right</option>
  </select>
</td>
<td><button class="delete-row">❌</button></td>
</tr>
</table>

*leave times blank to affect entire file*

<button id="add-row">Add Row</button>

### Download VTT File

The VTT file will contain the same subtitles, but with added positioning information.

<button id="convert">Download VTT</button>

<!-- Javascript Section -->
<script src="papaparse.min.js"></script>
<script src="script.js"></script>