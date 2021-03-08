<?php
require_once 'contact.php';

$id = preg_replace('/[^0-9]/', '', $_GET['id']);

if ($id !== null && $id > 0) {
    if (Contact::delete($id)) {
        http_response_code(204);
    } else {
        return http_response_code(422);
    }
} else {
    return http_response_code(400);
}
