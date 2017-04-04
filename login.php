<?php
$username = $_GET["username"];
$password = $_GET["password"];
header("Content-Type: text/html;charset=utf-8");
// 1. 创建和数据库的连接
// 默认连接的是3306,本主机中使用mariaDB，接口为3308
// 默认3306为wamp中的mysql
$conn = new mysqli("localhost", "root", "root", "mynews", 3308);
// 2. 定义sql语句
$sql = "select * from users where username='".$username."'";
// 3. 执行sql语句
$res = $conn->query($sql);

if($res->num_rows){
	while($row = mysqli_fetch_array($res)) {
		if($row['password'] == $password){
			echo 1;
			//用户输入的密码与数据库中一致，登录成功页面跳转
		}
	    // echo json_encode($row);
	}
}else{
	echo 0;
}
$conn->close();
exit();
?>