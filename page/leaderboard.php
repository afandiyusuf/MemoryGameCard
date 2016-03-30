<?php
require_once('../php/config.php');
require_once('../php/validate_gt.php')
?>
<html>
<head>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">

  <!-- Optional theme -->
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap-theme.min.css" integrity="sha384-fLW2N01lMqjakBkx3l/M9EahuwpSfeNvV63J5ezn3uZzapT0u7EYsXMjQV+0En5r" crossorigin="anonymous">


  <link rel="stylesheet" href="../css/main.css">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">

  <script src="https://code.jquery.com/jquery-2.2.2.min.js"   integrity="sha256-36cp2Co+/62rEAAYHLmRCPIych47CvdM+uTBJwSzWjI="   crossorigin="anonymous"></script>
    <script src="../js/build/frontPage.js"  ></script>
  <link rel="stylesheet" href="../css/main.css">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
</head>

<body>
  <div class="container" id="leaderboard-container">
    <div class="col-xs-6" id="current_score">
      <div class="col-xs-12 white-backGround">
        <br/>
        <br/>
        <?php if(isset($username)) { ?>
        <h3>CONGRATS <?php echo $username; ?> YOUR SCORE IS</h3>
        <h3 id=""><?php echo 960-$total_scores; ?> detik</h3>
        <?php }?>
      </div>
    </div>
    <div class="col-xs-6" id="leaderboard">
      <div class="col-xs-12 white-backGround" id="leaderboard-content">
        <h3>LEADERBOARD</h3>
        <?php
          for($i=0;$i<count($leaderboardData);$i++)
          {
            echo "<div class ='col-xs-2'>";
            echo $i+1;
            echo "</div>";
            echo "<div class='col-xs-5'>";
            echo $leaderboardData[$i]->nama_depan;
            echo "</div>";
            echo "<div class='col-xs-5'>";
            echo  (960 - ($leaderboardData[$i]->score));
            echo " detik";
            echo "</div>";
          }
         ?>
      </div>
    </div>
    <div class="container">
      <button class="col-xs-12" id="home-button">
        BACK TO HOME
      </button>
  </div>
  <div class="container" style="text-align:center">
    All right reserved
  </div>
  </div>

</body>

</html>
