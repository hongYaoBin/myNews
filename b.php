<?php
$nids = $_GET["nids"];

$url = 'https://m.news.baidu.com/news?tn=bdapibaiyue&t=recommendinfo';

$data = array ('wf' => 1, 'remote_device_type' => 1, 'os_type' => 2, 'screen_size_width' => 375, 'screen_size_height' => 667, 'nids' => $nids);
$data = http_build_query($data);//生成 url-encoded 之后的请求字符串描述
$opts = array (
	'http' => array (
	'method' => 'POST',
	'header'=> "Content-type: application/x-www-form-urlencodedrn" .
	"Content-Length: " . strlen($data) . "rn",
	'content' => $data
	)
);
$context = stream_context_create($opts);//创建并返回一个文本数据流并应用各种选项，可用于fopen(),file_get_contents()等过程的超时设置、代理服务器、请求方式、头信息设置的特殊过程。 
echo file_get_contents($url, false, $context);
//该函数是用于把文件的内容读入到一个字符串中的首选方法。

// https://m.baidu.com/searchbox?action=feed&nomust=searchbox&service=bdbox&cmd=103&wfr=newsapp&context=%7B%22sourceFrom%22%3A%22bjh%22%2C%22nid%22%3A%22news_3094411234655686045%22%7D
?>