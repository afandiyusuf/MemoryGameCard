<?php
require_once('../php/config.php');
require_once('../php/validate_gt.php')
?>
<html>
<head>
  <meta property="og:type"               content="article" />
	<meta property="og:title"              content="Cek skorku di Tebak Si Boss kecil" />
	<meta property="og:description"        content="Aku sudah bermain Tebak Si Boss Kecil, cek skorku di sini" />
	<meta property="og:image:url"              content="http://www.siboskecil.com/asset/other/fbImage5.png" />

	<meta property="fb:app_id"					content="1700571170226419"/>
  <link href='https://fonts.googleapis.com/css?family=Luckiest+Guy' rel='stylesheet' type='text/css'>
  <link href='https://fonts.googleapis.com/css?family=Dosis:800' rel='stylesheet' type='text/css'>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">

  <!-- Optional theme -->
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap-theme.min.css" integrity="sha384-fLW2N01lMqjakBkx3l/M9EahuwpSfeNvV63J5ezn3uZzapT0u7EYsXMjQV+0En5r" crossorigin="anonymous">


  <link rel="stylesheet" href="../css/main.css">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">

  <script src="https://code.jquery.com/jquery-2.2.2.min.js"   integrity="sha256-36cp2Co+/62rEAAYHLmRCPIych47CvdM+uTBJwSzWjI="   crossorigin="anonymous"></script>
    <script src="../js/build/frontPage.js"  ></script>
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
</head>

<body>
  <div class="container" class="leaderboard-container">
    <div class="col-xs-0" id="current_score" >
        <?php if(isset($username)) { ?>
      <div class="col-xs-0 white-backGround leaderboard-content">
        <br/>
        <br/>

        <h3> <?php
        if(isset($_GET['state'])){
          echo "SCORE ";
          echo $username;
          echo " ADALAH";
        }else{
          echo "SELAMAT ";
          echo $username;
          echo " SKOR KAMU ADALAH";
        }
          ?></h3>
        <h3 id=""><?php echo 960-$total_scores; ?> detik</h3>

        <br/>
        <br/>
        <br/>
      </div>
      <?php }else{?>
        <div id="left-image"/>
          <img width=80% id="left-image-content" src="../asset/final/Title.png"/>
        </div>
        <?php }?>

    </div>


    <div class="col-xs-12" id="leaderboard">


      <?php
      $adaLead = false;
      if(count($leaderboardData)>0){
        $adaLead = true;
      ?>
      <div class="col-xs-8 col-xs-offset-2 white-backGround leaderboard-content">
        <div class="col-xs-12">
        <div class="fb-share-button" style="display:inline-block" data-href="<?php echo "http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]" ?>?state=shared" data-layout="button"></div>
        <a href="https://twitter.com/share" class="twitter-share-button" data-url="<?php echo "http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]" ?>?state=shared" data-text="Ayo cek skorku disini tebak si bos kecil disini">Tweet</a>
        <script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');</script>
        </div>
        <img id="title-leaderboard" height="50px" src="../asset/final/leaderboardTitle.png">
        <?php
          for($i=0;$i<count($leaderboardData)&&$i<10;$i++)
          {
            echo "<div class='col-xs-12' id='leaderboard-data'>";

            echo "<div class ='profile-pict'>";
            echo "<img class='profile-content' height=50px width=50px src='https://graph.facebook.com/".$leaderboardData[$i]->fb_id."/picture?type=small'>";
            echo "</div>";
            echo "<div class='user-data'>";
            echo "<div class='nama-lead'>";
            echo " ".$leaderboardData[$i]->user_name." ".($i+1);
            echo "</div>";
            echo "<div class='score-lead'>";
            echo  " ".(960 - ($leaderboardData[$i]->score))." Second";
            echo "</div>";
            echo "</div>";
            echo "</div>";
          }

         ?>

      </div>
      <?php } ?>
      <a href="http://www.siboskecil.com"<?php if(!$adaLead){echo "style='margin-top:70%'";}?> class="col-xs-8 col-xs-offset-2 btn btn-primary btn-home-lead " id="home-button">
        BACK TO HOME
      </a>
    </div>
  </div>

</body>

</html>
