<?php
require_once 'contact.php';

//Get data
$postdata = file_get_contents("php://input");

if (isset($postdata) && !empty($postdata)) {
    //Decode and sanitize data
    $request = json_decode($postdata);
    $email = strtolower(filter_var($request->email, FILTER_SANITIZE_EMAIL));
    $responseCode = 0;

    //Check if checkbox checked
    if ($request->checkbox) {
        $checkboxStatus = true;
    } else {
        $checkboxStatus = false;
    }

    /* Validate email and prepare responseCode to identify error
     * 1 - No error encountered
     * 2 - No Email entered
     * 4 - Invalid email format
     * 5 - Colombia email
     */
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
        //If no errors detected - save contact and return responseCode 1
        $responseCode = (new Contact($email))->save();
        if ($responseCode == 1) {
            http_response_code(201);
        } elseif ($responseCode == 10) {
            //If unable to save contact responseCode 10 returned and appropriate header prepared
            return http_response_code(422);
        }
    }
    //If no error or client relevant error detected return result
    if ($responseCode != 10) {
        $submitResponse = [
            'email' => $email,
            'responseCode' => $responseCode,
            'checkbox' => $checkboxStatus
        ];
        echo json_encode(['dataset' => $submitResponse]);
    }
}


