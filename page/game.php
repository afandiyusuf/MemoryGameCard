<?php

require_once('../php/config.php');
require_once('../php/validate_access_token.php');

?>
<html>
<head>
	<script src="https://code.jquery.com/jquery-2.2.2.min.js"   integrity="sha256-36cp2Co+/62rEAAYHLmRCPIych47CvdM+uTBJwSzWjI="   crossorigin="anonymous"></script>
	<script type="text/javascript" src="../js/easeljs/create.js"></script>
	<script type="text/javascript" src="../js/build/main.js"></script>
	<link rel="stylesheet" href="../css/main.css">
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
</head>

<body onLoad="init();">

	<canvas id="game" width="300" height="100" style=" position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);" >
</canvas>
<div id="access_token" style="display:none"><?php echo $access_token ?></div>
<div id="base_api_url" style="display:none"><?php echo $base_api_url ?></div>
<div id="state"></div>
<div id="progress">0%</div>
<div id="progressbar">
	<div class="bar"></div>
</div>

</body>

</html>
