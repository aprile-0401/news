<?php
header("Content-type:application/json; charset=utf-8;");
$con = mysql_connect("localhost","root","");

if ($con){
	mysql_select_db("axin", $con);
	mysql_query("SET NAMES UTF8");
	$newsid=$_POST["id"];
	
	$sql="SELECT `newsid`, `newstype`, `newsimg`, `newstitle`, `newstime`, `newsicon` FROM `news` WHERE `newsid`='{$newsid}'";
	$result=mysql_query($sql,$con);
	// $sentdate=array();

	  while($row = mysql_fetch_array($result))
		  {
			  
			  // array_push($sentdate, array(
			  	$sentdate=array(
			  					"newsid"=>$row['newsid'] ,
			  					"newstype"=>htmlspecialchars_decode($row['newstype']) ,
			  					"newstitle"=>htmlspecialchars_decode($row["newstitle"]),
			  					"newsimg"=>htmlspecialchars_decode($row['newsimg']) ,
			  					"newstime"=>htmlspecialchars_decode($row['newstime']) ,
			  					"newsicon"=>htmlspecialchars_decode($row['newsicon']) 
			  	);
			};
	echo json_encode($sentdate);
	

	
}else{
	die('Could not connect: ' . mysql_error());
}
mysql_close($con);

?>