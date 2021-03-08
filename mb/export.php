<?php
require_once 'contact.php';


$postdata = file_get_contents("php://input");
if (isset($postdata) && !empty($postdata)) {
    $request = json_decode($postdata);
    $contacts = Contact::getContactsByIds($request);
    if (count($contacts) > 0) {
        header("Content-Disposition: attachment");
        header("Content-Transfer-Encoding: binary");
        header("Content-type: text/csv");

        echo implode(';', array_keys(reset($contacts))) . "\n";
        foreach ($contacts as $contact) {
            echo implode(';', $contact) . "\n";
        }

    }

}

