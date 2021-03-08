<?php
require_once 'contact.php';


$postdata = file_get_contents("php://input");

if (isset($postdata) && !empty($postdata)) {
    $request = json_decode($postdata);
    $email = filter_var($request->email, FILTER_SANITIZE_EMAIL);
    $responseCode = 0;

    if ($request->checkbox) {
        $checkboxStatus = true;
    } else {
        $checkboxStatus = false;
    }

    if ($email === '') {
        $responseCode = 2;
        $email = '';
    } else {
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $responseCode = 4;
        } elseif (substr($email, -3) === '.co') {
            $responseCode = 5;
        }
    }

    if ($responseCode == 0 && $checkboxStatus) {
        $responseCode = (new Contact($email))->save();
        if ($responseCode == 1) {
            http_response_code(201);
        } elseif ($responseCode == 10) {
            http_response_code(422);
        }
    }

    if ($responseCode != 10) {
        $submitResponse = [
            'email' => $email,
            'responseCode' => $responseCode,
            'checkbox' => $checkboxStatus
        ];
        echo json_encode(['dataset' => $submitResponse]);
    }
}


