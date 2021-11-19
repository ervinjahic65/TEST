<?php
defined('BASEPATH') OR exit('No direct script access allowed');

$route['default_controller'] = 'welcome';
$route['404_override'] = '';
$route['translate_uri_dashes'] = FALSE;


$route['app/login/getUsers'] = 'welcome/getUsers';
$route['app/login/loginUser']['post'] = 'welcome/loginUser';

$route['app/dashboard/getUpdateUsers']['post'] = 'welcome/getUpdateUsers';

$route['app/dashboard/addUser']['post'] = 'welcome/addUser';

$route['app/dashboard/changePassword']['post'] = 'welcome/changePassword';

$route['app/dashboard/deleteUser']['post'] = 'welcome/deleteUser';