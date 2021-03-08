<?php
require_once 'contact.php';
//Sanitize data
$id = preg_replace('/[^0-9]/', '', $_GET['id']);

if ($id !== null && $id > 0) {
    //Call delete function and return appropriate header
    if (Contact::delete($id)) {
        http_response_code(204);
    } else {
        return http_response_code(422);
    }
} else {
    return http_response_code(400);
}
