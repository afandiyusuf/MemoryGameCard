<html>
<?php require_once('php/config.php'); ?>

<head>
	<!-- Latest compiled and minified CSS -->
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">

	<!-- Optional theme -->
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap-theme.min.css" integrity="sha384-fLW2N01lMqjakBkx3l/M9EahuwpSfeNvV63J5ezn3uZzapT0u7EYsXMjQV+0En5r" crossorigin="anonymous">


	<link rel="stylesheet" href="css/main.css">
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
	<script src="https://code.jquery.com/jquery-2.2.2.min.js"   integrity="sha256-36cp2Co+/62rEAAYHLmRCPIych47CvdM+uTBJwSzWjI="   crossorigin="anonymous"></script>
	<script src="js/build/frontPage.js"> </script>
</head>

<body >
	<div id="base-url"><?php echo $base_url; ?></div>
	<div class="container">
		<div class="col-sm-2">
			<image id="logo-main" src="asset/final/Tao Kae Noi.png"/>
		</div>
	</div>
	<div class="container">
		<div class="container-logo-big col-md-12">
			<div class="col-sm-8">
				<image id="logo-big" src="asset/final/Title.png"/>
			</div>

			<div id="form-container" class="col-sm-4">

				<div class="col-md-6 right-content left">
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
				</div>
				<div class="col-md-6 right-content right">
					Register Here
					<br/>
					<br/>
				<button id="register-button" type="submit" class="btn btn-default">Register</button>
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
					<input type="text" placeholder="Username" id="username-register"/>
					<input type="text" placeholder="Name" id="nama"/>
					<input type="text" placeholder="Address" id="alamat"/>
					<input type="text" placeholder="E-mail" id="email"/>
					<input type="text" placeholder="Phone" id="no_hp"/>
					<input type="password" placeholder="password" id="password-register"/>
					<input type="password" placeholder="confirm-passowrd" id="confirm-passowrd"/>
		      <button id="register-button-submit">Register</button>
		    </div>
		  </div>
		</div>
	</body>
	</div>
</body>

</html>
