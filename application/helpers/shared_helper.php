<?php
defined('BASEPATH') OR exit('No direct script access allowed');

if ( ! function_exists('openDBConn'))
{
    function openDBConn()
    {
		static $conn = null;

		if (!$conn) {
			$conn = new mysqli('localhost', 'root', '', 'habultron');
			$conn->set_charset('utf8');
			$conn->query("SET collation_connection = utf8_unicode_ci");
		}
		
		$conn->autocommit(true);

        return $conn;
    }
}

