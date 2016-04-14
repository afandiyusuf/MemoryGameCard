<?php

require_once('../php/config.php');
require_once('../php/validate_access_token.php');
$_SESSION['state'] = "udah maen";
?>
<html>
<head>
	<title>Tebak Si Bos Kecil </title>

	<script src="https://code.jquery.com/jquery-2.2.2.min.js"   integrity="sha256-36cp2Co+/62rEAAYHLmRCPIych47CvdM+uTBJwSzWjI="   crossorigin="anonymous"></script>
	<script type="text/javascript" src="../js/easeljs/create.js"></script>
	<script type="text/javascript" src="../js/build/main.min.js"></script>
	<script type="text/javascript" src="../js/build/forceLandscape.js"></script>
<script type="text/javascript" src="../js/build/frontPage.min.js"></script>
	<link rel="stylesheet" href="../css/main.css">
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
</head>

<body onLoad="init();" style="background-repeat-x:repeat" id="game-body">

	<canvas id="game" width="300" height="100" style=" position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);" >
</canvas>
<img src="../asset/final/Tao Kae Noi.png" id="#image_logo" style="position: absolute;
    top: 3%;
    left: 2%;
    width: 15%;">
<div id="isOut" style="display:none"><?php echo $_SESSION['is_out_heart'] ?></div>
<div id="access_token" style="display:none"><?php echo $access_token ?></div>
<div id="base_api_url" style="display:none"><?php echo $base_api_url ?></div>
<div id="state"></div>
<div id="progress">0%</div>
<div id="progressbar">
	<div class="bar"></div>
</div>

</body>

</html>
