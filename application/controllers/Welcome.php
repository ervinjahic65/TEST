<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Welcome extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
        $this->load->model('UserModel', 'user');

	}
	public function index()
	{
		$this->load->view('welcome_message');
	}

	public function getUsers() {
		if(!$user = $this->user->getUsersModel()) {
			$this->output->set_status_header(200);

			$this->output->set_content_type('application/json');

			$this->output->set_output(json_encode(array(
				'status' => false
			)));
		} else {
			$this->output->set_status_header(200);

			$this->output->set_content_type('application/json');

			$this->output->set_output(json_encode(array(
				'status' => true,
				'data' => $user
        )));
		}
	}

	public function loginUser() {
		$data = json_decode(file_get_contents('php://input'),true);
		$user = $data['username'];
		$password = $data['password'];

		$adminLogin = $this->user->getAdminByAdminname($user, $password);

		if(!$adminLogin) {
			$this->output->set_status_header(200);

			$this->output->set_content_type('application/json');

			$this->output->set_output(json_encode(array(
				'status' => false,
				'data' => 'Invalid user.'
			)));
		} else {
			$this->output->set_status_header(200);

			$this->output->set_content_type('application/json');
	
			$this->output->set_output(json_encode(array(
				'status' => true,
				'data' => $adminLogin	
			)));
		}
	}

	public function getUpdateUsers() {
		
		$data = json_decode(file_get_contents('php://input'),true);
		
		$userId = $data['userId'];
		

		$getUpdateUsers = $this->user->getUpdateUsers($data['user'], $userId);
		
		if(!$getUpdateUsers) {
			$this->output->set_status_header(200);

			$this->output->set_content_type('application/json');

			$this->output->set_output(json_encode(array(
				'status' => false,
				'data' => 'Nije updejtovano'
			)));
		} else {
			$this->output->set_status_header(200);

			$this->output->set_content_type('application/json');
	
			$this->output->set_output(json_encode(array(
				'status' => true,
				'data' => $getUpdateUsers	
			)));
		}
	}

	public function addUser() {
		$data = json_decode(file_get_contents('php://input'),true);
		$user = $data['user'];

		$addUser = $this->user->addUser($user);
		//var_dump($data);
		if(!$addUser) {
			$this->output->set_status_header(200);

			$this->output->set_content_type('application/json');

			$this->output->set_output(json_encode(array(
				'status' => false,
				'data' => 'Nije dodan korinsik'
			)));
		} else {
			$this->output->set_status_header(200);

			$this->output->set_content_type('application/json');
	
			$this->output->set_output(json_encode(array(
				'status' => true,
				'data' => $addUser	
			)));
		}
	}
	
	public function changePassword() {
		$data = json_decode(file_get_contents('php://input'),true);
		$userId = $data['userId'];
		$confirmPassword = $data['password']['passwordConfirm'];
		$newPassword = $data['password']['passwordNew'];

		$changePassword = $this->user->changePassword( $userId, $confirmPassword, $newPassword);

		if(!$changePassword) {
			$this->output->set_status_header(200);

			$this->output->set_content_type('application/json');

			$this->output->set_output(json_encode(array(
				'status' => false,
				'data' => 'Nije promijenjen password'
			)));
		} else {
			$this->output->set_status_header(200);

			$this->output->set_content_type('application/json');
	
			$this->output->set_output(json_encode(array(
				'status' => true,
				'data' => $changePassword	
			)));
		}
	}

	public function deleteUser() {
		$data = json_decode(file_get_contents('php://input'),true);
		$userId = $data['userId'];


		/* return $this->output->set_output(json_encode(array(
			'status' => true,
			'userId' => $userId	
		))); */

		$deleteUser = $this->user->deleteUser($userId);

		if(!$deleteUser) {
			$this->output->set_status_header(200);

			$this->output->set_content_type('application/json');

			$this->output->set_output(json_encode(array(
				'status' => false,
				'userId' => 'Korisnik nije obrisan'
			)));
		} else {
			$this->output->set_status_header(200);

			$this->output->set_content_type('application/json');
	
			$this->output->set_output(json_encode(array(
				'status' => true,
				'userId' => $userId	
			)));
		}
	}

}




