<?php
header("Content-type:application/json; charset=utf-8;");
$con = mysql_connect("localhost","root","");

if ($con){
	mysql_select_db("axin", $con);
	mysql_query("SET NAMES UTF8");
	$newstype=htmlspecialchars($_POST["newstype"]);
	$newsimg=htmlspecialchars($_POST["newsimg"]);
	$newstitle=htmlspecialchars($_POST["newstitle"]);
	$newstime=htmlspecialchars($_POST["newstime"]);
	$newsicon=htmlspecialchars($_POST["newsicon"]);
	$sql="INSERT INTO `news`( `newstype`, `newsimg`, `newstitle`, `newstime`, `newsicon`) VALUES ('{$newstype}','{$newsimg}','{$newstitle}','{$newstime}','{$newsicon}')";
	$result=mysql_query($sql,$con);
	echo json_encode(array('success' => 'ok' ));
	
}else{
	die('Could not connect: ' . mysql_error());
}
mysql_close($con);

?>