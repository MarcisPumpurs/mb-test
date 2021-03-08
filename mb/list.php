<?php
require_once 'contact.php';

$sort = preg_replace('/\W/', '', $_GET['sort']);
$asc = preg_replace('/\W/', '', $_GET['asc']);
$filter = preg_replace('/\W\./', '', $_GET['filter']);
$search = preg_replace('/[^\w.@-]/', '', $_GET['search']);
$pagination = preg_replace('/[^0-9]/', '', $_GET['pag']);

if ($asc === 'false') {
    $sortOrder = 'DESC';
} else {
    $sortOrder = 'ASC';
}
$contacts = Contact::getContactsByFilters($filter, $search);

if (count($contacts) > 0) {
    $contacts = Contact::sort($contacts, $sortOrder, $sort);
    $contacts = Contact::paginate($contacts, $pagination);
    echo json_encode(['dataset' => $contacts]);
} else {
    http_response_code(404);
}
