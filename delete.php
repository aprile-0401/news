<?php
header("Content-type:application/json; charset=utf-8;");
$con = mysql_connect("localhost","root","");

if ($con){
	mysql_select_db("axin", $con);
	mysql_query("SET NAMES UTF8");
	$newsid=$_POST["id"];
	
	$sql="DELETE FROM `news` WHERE `newsid`='{$newsid}'";
	$result=mysql_query($sql,$con);
	echo json_encode(array('删除成功' => 'ok' ));
	
}else{
	die('Could not connect: ' . mysql_error());
}
mysql_close($con);

?>