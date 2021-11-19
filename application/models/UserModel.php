<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class UserModel extends CI_Model {
    public function __construct() {
        parent::__construct();
        $this->load->helper('shared_helper');
    }

    public function getAdminByAdminname($user, $password) {

        $conn = openDBConn();

        if ($conn->connect_error) {
            return false;
        }

        $sql = "SELECT id, user  FROM users where user = '" . $user . "' and password = '" . $password."'"  ;

        if (!$result = $conn->query($sql)) {
            error_log($conn->error);
            return false;
        }


        return $row = $result->fetch_assoc();
        
    }

    public function getUsersModel() {
        $conn = openDBConn();

        if ($conn->connect_error) {
            return false;
        }

        $sql = 'SELECT * FROM users;';

        if (!$result = $conn->query($sql)) {
            error_log($conn->error);
            return false;
        }

        $data = array();

        while ($row = $result->fetch_assoc()) {


            array_push($data, $row);
        }

        return $data;
    }

    public function getUpdateUsers($user, $userId) {
        
        $conn = openDBConn();
        
        $username = $user['username'];
        $first_name = $user['first_name'];
        $last_name = $user['last_name'];
        $email = $user['email'];
        $address = $user['address'];
        $postcode = $user['postcode'];
        $city = $user['city'];
        //$userId = $userId['userId'];

        
        if ($conn->connect_error) {
            return false;
        }

        
        $sql = "UPDATE users SET user='$username', first_name='$first_name', last_name='$last_name', email='$email', address='$address', postcode='$postcode', city='$city' WHERE id = '$userId'" ;
        //var_dump($sql);

        if (!$result = $conn->query($sql)) {
            error_log($conn->error);
            return false;
        }

        return $result;
    }

    public function addUser($data) {
        $conn = openDBConn();
        
        $username = $data['username'];
        $first_name = $data['first_name'];
        $last_name = $data['last_name'];
        $email = $data['email'];
        $address = $data['address'];
        $postcode = $data['postcode'];
        $city = $data['city'];
        $password = $data['password'];

        if ($conn->connect_error) {
            return false;
        }

        
        $sql = "INSERT INTO users (`user`, `first_name`, `last_name`, `email`, `address`, `postcode`, `city`, `password`) VALUES ('$username', '$first_name', '$last_name', '$email', '$address', '$postcode', '$city', '$password')";
        //var_dump($sql);
        if (!$result = $conn->query($sql)) {
            error_log($conn->error);
            return false;
        }

        return $result;
    }

    public function changePassword($userId, $confirmPassword, $newPassword) {
        $conn = openDBConn();
        

        if ($conn->connect_error) {
            return false;
        }

        if($confirmPassword === $newPassword) {
            $sql = "UPDATE users SET password='$newPassword' WHERE id='$userId'  ";
        } else {
            echo "passwords do not match";
        }

        if (!$result = $conn->query($sql)) {
            error_log($conn->error);
            return false;
        }

        return $result;
    }

    public function deleteUser($userId) {
        $conn = openDBConn();

        if ($conn->connect_error) {
            return false;
        }

        $sql = "DELETE FROM users WHERE id='$userId' ";

        if (!$result = $conn->query($sql)) {
            error_log($conn->error);
            return false;
        }

        return $result;
    }
}