<?php
require_once 'contact.php';

//Sanitize data
$sort = preg_replace('/\W/', '', $_GET['sort']);
$asc = preg_replace('/\W/', '', $_GET['asc']);
$filter = preg_replace('/\W\./', '', $_GET['filter']);
$search = preg_replace('/[^\w.@-]/', '', $_GET['search']);
$pagination = preg_replace('/[^0-9]/', '', $_GET['pag']);

//translate sort direction
if ($asc === 'false') {
    $sortOrder = 'DESC';
} else {
    $sortOrder = 'ASC';
}
//Request contacts using filers
$contacts = Contact::getContactsByFilters($filter, $search);

if (count($contacts) > 0) {
    //If records returned, sort, paginate and return to client.
    $contacts = Contact::sort($contacts, $sortOrder, $sort);
    $contacts = Contact::paginate($contacts, $pagination);
    echo json_encode(['dataset' => $contacts]);
} else {
    //If no records returned appropriate header
    http_response_code(404);
}
