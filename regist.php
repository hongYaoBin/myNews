<?php
$username = $_GET["username"];
$password = $_GET["password"];
header("Content-Type: text/html;charset=utf-8");
$conn = new mysqli("localhost", "root", "root", "mynews", 3308);
$sql = "select ".$username." from users";

$res = $conn->query($sql);
if($res != ""){
	echo 0;
} else{
	$insql = "insert into users(id,username,password) values(,".$username.",".$password.")";
	$res2 = $conn->query($insql);
	echo 1;
}
?>