<html>
<?php require_once('php/config.php'); ?>

<head>
	<meta property="og:type"               content="article" />
	<meta property="og:title"              content="Memory Game Si Boss kecil" />

	<meta property="og:url"                content="http://www.siboskecil.com" />
	<meta property="og:description"        content="Aku sudah bermain game si boss kecil, Ayo kalian juga ikut main!!" />
	<meta property="og:image:url"              content="http://www.siboskecil.com/asset/other/fbImage5.png" />

		<meta property="fb:app_id"					content="1700571170226419"/>


	<!-- Latest compiled and minified CSS -->
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">

	<!-- Optional theme -->
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap-theme.min.css" integrity="sha384-fLW2N01lMqjakBkx3l/M9EahuwpSfeNvV63J5ezn3uZzapT0u7EYsXMjQV+0En5r" crossorigin="anonymous">


	<link rel="stylesheet" href="css/main.css">
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
	<script src="https://code.jquery.com/jquery-2.2.2.min.js"   integrity="sha256-36cp2Co+/62rEAAYHLmRCPIych47CvdM+uTBJwSzWjI="   crossorigin="anonymous"></script>
	<script src="js/build/frontPage.js"> </script>
		<script src="js/build/forceLandscape.js"> </script>
</head>

<body >
	<div id="base-url" style="display:none"><?php echo $base_url; ?></div>
	<div id="base-api-url" style="display:none"><?php echo $base_api_url; ?></div>
	<div class="container">
		<div class="col-xs-2">
			<image id="logo-main" src="asset/final/Tao Kae Noi.png"/>
		</div>
	</div>
	<div class="container">
		<div class="container-logo-big col-xs-12">
			<div class="col-xs-8">
				<image id="logo-big" src="asset/final/Title.png"/>
			</div>

			<div id="form-container" class="col-xs-4">
				<!--
				<div class="col-xs-6 right-content left">
					<div>
						Login with your account
						<br/>
						<br/>
						<div class="form-group">
							<input type="username" class="form-control" id="username" placeholder="username">
						</div>

						<div class="form-group">
							<input type="password" class="form-control" id="password" placeholder="Password">
						</div>
						<div class="form-group">
							<button class="btn btn-default" id="button-login-submit">Submit</button> <div id="warning-login"></div>
						</div>
					</div>
				</div>-->
				<div class="col-xs-12 right-content right">
					<strong id="login-text">Login</strong>

					<br/>
					<a href="#" onclick="fb_login();">
						<img style="max-width:100%;" src="asset/splash screen/FB Button.png" border="0" alt="">
<br/>
<br/>
						<div class="fb-share-button" data-href="http://www.siboskecil.com" data-layout="button"></div>
					</a>
					<br/>
					<br/>

				</div>
			</div>
		</div>
	</div>

	<div id= "all-register-page">

		<div class="login-page">

			<a href="#" class="close-button">x close</a>
		  <div class="form">
					<div id="please-wait-screen" style="{color:red}"> Please wait</div>
		    <div class="login-form" id="form-login">
					<div id="title-register"> REGISTER </div>
					<div id="keterangan"></div>
					<input type="text" placeholder="Username" id="username-register">
					<input type="text" id="nama" value="test" readonly>
					<input type="text" placeholder="Address" id="alamat">
					<input type="text" value ="test" id="email" readonly>
					<input type="text" placeholder="Phone" id="no_hp">
					<input type="password" placeholder="password" id="password-register">
					<input type="password" placeholder="confirm-passowrd" id="confirm-passowrd">
		      <button id="register-button-submit">Register</button>
		    </div>
		  </div>
		</div>
	</body>
	</div>
	<div id="warning-parent">
		<div id="image-warning-rotate">
		<image src = "asset/other/icon-horizontal.png"/>
		<br/><br/><br/>
		<strong> Please Rotate Your device <br/>and<br/> Refresh Your Browser </strong>
	</div>
	</div>
</body>

</html>
