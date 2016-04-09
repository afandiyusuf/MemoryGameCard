<?php

session_start();
$state = "";
$tw_id = "";

if(isset($_SESSION['tw_id']) && isset($_SESSION['state']))
{
	if($_SESSION['state'] == 'register_tw')
	{
		$state = "register_tw";
		$tw_id = $_SESSION['tw_id'];
		$screen_name = $_SESSION['screen_name'];
	}
}
?>
<html>
<?php require_once('php/config.php'); ?>

<head>
	<meta property="og:type"               content="article" />
	<meta property="og:title"              content="Memory Tebak Game Si Boss kecil" />

	<meta property="og:url"                content="http://www.siboskecil.com" />
	<meta property="og:description"        content="Aku sudah bermain tebak si boss kecil, Ayo kalian juga ikut main!!" />
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

<body <?php
if($state == "register_tw")
{
	echo 'onload="register_tw()"';
}
?> >
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
	<strong id="login-text">Login dengan akun sosial media kamu</strong>
	<br/>
	<a href="#" onclick="fb_login();">
		<img style="max-width:100%;" src="asset/splash screen/FB Button.png" border="0" alt="">
	</a>
	<br/>
	<br/>
	<a href="http://www.siboskecil.com/tw_socmed/">
		<img style="max-width:100%;" src="asset/splash screen/Twitter Button.png" border="0" alt="">
	</a>
	<br/>
	<div style="font-size:10px; margin-top:5px;">
		Dengan mengeklik tombol login diatas, berarti saya telah menyetujui <a id="tncButton"> term and condition </a> yang berlaku.
	</div>
	<br/>

		<button id="howto-btn"class="btn btn-primary">Cara Bermain</button>
		<a href="http://www.siboskecil.com/page/leaderboard.php" id="howto-btn"class="btn btn-primary">Leaderboard</a>

	<br/>
	<br/>
	<div style="margin-top:5px" class="fb-share-button" data-href="http://www.siboskecil.com" data-layout="button"></div>
	<div style="margin-top:5px"><a href="https://twitter.com/share" class="twitter-share-button" data-url="http://www.siboskecil.com" data-text="Ayo bermain tebak si bos kecil disini">Tweet</a></div>
<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');</script>
	<br/>
	<br/>
</div>
</div>
</div>
</div>

<div id= "all-register-page">
	<div id="tnc-page" class="info-bg">
		<div class="title-image">
			<image src="../asset/final/tncTItle.png"/>
		</div>
		<br/>
		<ol type="1">
			<li>Program Tebak Si Bos Kecil diselenggarakan oleh Tao Kae Noi Indonesia. </li>
			<li>Program Tebak Si Bos Kecil hanya berlaku di Indonesia. </li>
			<li>Tebak Si Bos Kecil diselenggarakan dari tanggal <font color="red">11 April s/d 30 Aprill 2016</font></li>
			<li>Tentang Permainan dan skor: </li>
			<ol type="a">
				<li>Wajib likes FB fanpages "Tao Kae Noi Indonesia" dan follow twitter @Taokaenoi_ID.</li>
				<li>Sign-in menggunakan akun Facebook atau Twitter.</li>
				<li>Cari dan tebak ikon Bos Kecil yang sama dari 16 ikon yang ada dalam setiap level.</li>
				<li>16 ikon tersebut terdiri dari 8 ikon yang berbeda untuk kemudian dicari ikon yang sama dari masing masing 8 ikon tersebut.</li>
				<li>Terdiri dari 5 level dengan durasi tiap level yang telah ditentukan. Total waktu keseluruhan dari 5 level adalah 16 menit.</li>
				<li>Pemain hanya memiliki kesempatan 1x bermain per harinya.</li>
				<li>Sistem skor dihitung berdasarkan waktu.</li>
				<li>Pemain yang dinyatakan sebagai peserta dan berkesempatan mendapatkan hadiah adalah pemain yang berhasil menyelesaikan 5 level dalam waktu maksimal.</li>
			</ol>
			<li>Pemenang adalah 10 peserta yang mendapatkan skor teratas.</li>
			<li>Tentang hadiah: </li>

			<ol type="a">
				<li>Pemenang 1: Samsung Galaxy J2 - 8GB ROM
					<br/>Pemenang 2: Asus Zenfone 4C ZC451CG - 2GB RAM
					<br/>Pemenang 3: Xiaomi Yi Action Camera Original - Putih
					<br/>Pemenang 4: JBL Jembe BT Bluetooth Speaker
					<br/>Pemenang 5: GV18 Smart Bluetooth Watch GSM NFC Camera TF Card Wristwatch
					<br/>Pemenang 6: Sades Wolfang SA-901 Headset Gaming Biru USB 2.0
					<br/>Pemenang 7: SENNHEISER Earphone CX 213
					<br/>Pemenang 8: Voucer MAP 300 Rb
					<br/>Pemenang 9: Voucer MAP 200 Rb
					<br/>Pemenang 10: Voucer MAP 100 Rb
					<li><font color="red">Hadiah akan dikirim ke alamat pemenang</font></li>
					<li>Pemenang akan dihubungi via pesan dari akun sosial media yang digunakan untuk mengikuti permainanTebak Si Bos Kecil.</li>
				</ol>


				<li>Kuis Tebak Si Bos Kecil ini berlaku untuk umum..</li>
				<li>Keputusan juri tidak dapat diganggu gugat.</li>
				<li>Kuis ini tidak berlaku untuk karyawan, agency, biro iklan dan pihak ketiga (termasuk anggota keluarga dari jajaran karyawan Tao Kae Noi) yang turut bekerjasama menyelenggarakan program ini.</li>
				<li>Pihak panitia berhak untuk memodifikasi syarat dan ketentuan serta peraturan-peraturan dari kuis ini tanpa pemberitahuan terlebih dahulu</li>
			</ol>
			<button id="tnc-ok" class="btn btn-primary ok-button">OK</button>
		</div>
		<div id="how-to-play-page" class="info-bg">
			<div class="title-image">
				<h1>HOW TO PLAY</h1>
				<!-- <image src="../asset/final/tncTItle.png"/> -->
			</div>
			<br/>
			<ol type="1">
				<li>Sign-in menggunakan akun Facebook atau Twitter. </li>
				<li>Cari dan tebak ikon Bos Kecil yang sama dari 16 ikon yang ada dalam setiap level. </li>
				<li>16 ikon tersebut terdiri dari 8 ikon yang berbeda untuk kemudian dicari ikon yang sama dari masing masing 8 ikon tersebut.</li>
				<li>Terdiri dari 5 level dengan durasi tiap level yang telah ditentukan. Total waktu keseluruhan dari 5 level adalah 16 menit. </li>
				<li>Pemain hanya memiliki kesempatan 1x bermain per harinya. </li>
				<li>Sistem skor dihitung berdasarkan waktu. </li>
				<li>Pemain yang dinyatakan sebagai peserta dan berkesempatan mendapatkan hadiah adalah pemain yang berhasil menyelesaikan 5 level dalam waktu maksimal.</li>
			</ol>
			<button id="howto-ok" class="btn btn-primary ok-button">OK</button>
		</div>
		<div class="login-page" id="login-page">
			<a href="#" class="close-button">x close</a>
			<div class="form">
				<div id="please-wait-screen" style="{color:red}"> Please wait</div>
				<div class="login-form" id="form-login">
					<div id="title-register"> REGISTER </div>
					<div id="keterangan"></div>
					<input type="text" placeholder="Username" id="username-register">
					<input type="hidden" id="fb_id">
					<input type="hidden" id="twitter_id" value=<?php  if($state=='register_tw'){echo "'".$_SESSION['tw_id']."'";}?>>
					<input type="hidden" id="at" value=<?php  if($state=='register_tw'){echo "'".$_SESSION['at']."'";}?>>
					<input type="hidden" id="ats" value=<?php  if($state=='register_tw'){echo "'".$_SESSION['ats']."'";}?>>
					<input type="hidden" id="reg_using" value=<?php  if($state=='register_tw'){echo "'twitter'";}?>>
					<input type="text" id="nama" value=<?php  if($state == "register_tw"){echo "'".$_SESSION['screen_name']."'";}?> readonly>
					<input type="text" placeholder="Address" id="alamat">
					<input type="text" placeholder ="Email" value ="" id="email" <?php if($state != "register_tw"){echo "redonly";}?>>
					<input type="text" placeholder="Phone" id="no_hp">
					<!-- <input type="password" placeholder="password" id="password-register">
					<input type="password" placeholder="confirm-passowrd" id="confirm-passowrd"> -->
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
