<?php
require_once 'contact.php';

//Get data
$postdata = file_get_contents("php://input");

if (isset($postdata) && !empty($postdata)) {
    //Decode received data and request contact array from DB
    $request = json_decode($postdata);
    $contacts = Contact::getContactsByIds($request);
    //If records received, return them to client
    if (count($contacts) > 0) {
        //Set headers for csv
        header("Content-Disposition: attachment");
        header("Content-Transfer-Encoding: binary");
        header("Content-type: text/csv");
        //Construct string for csv body using ';' as seperator
        echo implode(';', array_keys(reset($contacts))) . "\n";
        foreach ($contacts as $contact) {
            echo implode(';', $contact) . "\n";
        }

    }

}

