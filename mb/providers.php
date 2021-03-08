<?php
require_once 'provider.php';


//Request array of email providers
$providers = Provider::getProviders();

if (count($providers) > 0) {
    //Format and return email provider list to client
    $providerArray = Provider::format($providers);
    echo json_encode(['dataset' => $providerArray]);
} else {
    //No records returned
    http_response_code(404);
}