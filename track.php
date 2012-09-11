<?php 
/*
|---------------------------------------------------------------
| DEFAULT TIMEZONE
|---------------------------------------------------------------
|
| Set the default timezone for date/time functions to use if
| none is set on the server.
| See: http://philsturgeon.co.uk/news/2009/12/CodeIgniter-on-PHP-5.3
| See: http://uk2.php.net/manual/en/timezones.php
|
*/

if( ! ini_get('date.timezone') ) {
   date_default_timezone_set('GMT');
} 
$g = $_GET;
$user = '(LAT='.$g['lat'].'|LONG='.$g['long'].')';
$ip = trim($_SERVER['REMOTE_ADDR']);
if ($ip === '122.54.245.197') {
	echo 'done';
	exit;
}

$now = date('m/d/Y @ h:i a');
$ua = trim($_SERVER['HTTP_USER_AGENT']);

//$file = $_SERVER['DOCUMENT_ROOT'].'/'.'visits.txt';
$file = 'visits.txt';
$old_contents = file_get_contents($file);
$old_contents .= $now.' - '.$user.'['.$ip.'] ['.$ua.']'."\n";
if (file_put_contents($file, $old_contents)) {
	echo 'done';
	//echo $file;
}
else {
	echo 'something went wrong';
}
?>