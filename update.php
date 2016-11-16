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
	$newsid=$_POST["id"];
	$sql="UPDATE `news` SET `newstype`='{$newstype}',`newsimg`='{$newsimg}',`newstitle`='{$newstitle}',`newstime`='{$newstime}',`newsicon`='{$newsicon}' WHERE `newsid`='{$newsid}'";
	$result=mysql_query($sql,$con);
	echo json_encode(array('修改' => 'ok' ));
}else{
	die('Could not connect: ' . mysql_error());
}
mysql_close($con);


?>