<?php
$username = $_GET["username"];
$password = $_GET["password"];
header("Content-Type: text/html;charset=utf-8");
// 1. 创建和数据库的连接
// 第一个参数：连接数据的主机；第二个参数：连接数据的账号；
//第三个参数：密码；第四个参数：数据库
// 默认连接的是3306
$conn = new mysqli("localhost", "root", "root", "mynews", 3308);
// 2. 定义sql语句
$sql = "select ".$username." from users";
// 3. 执行sql语句
$res = $conn->query($sql);
if($res == $password){
	echo "true";
}else{
	echo "false";
}
?>