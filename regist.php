<?php
$username = $_GET["username"];
$password = $_GET["password"];
header("Content-Type: text/html;charset=utf-8");
$conn = new mysqli("localhost", "root", "root", "mynews", 3308);
$sql = "select * from users where username='".$username."'";
$insql = "insert into users(username,password) values('".$username."','".$password."')";
$res = $conn->query($sql);
if($res->num_rows > 0){
	echo 0;
} else if($insres = $conn->query($insql) === true){
	echo 1;
}
?>