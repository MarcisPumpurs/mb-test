<?php
require_once 'provider.php';

$providerList = [];
$providers = Provider::getProviders();

if (count($providers) > 0) {
    $cr = 0;
    foreach ($providers as $address => $name) {
        $providerList[$cr]['name'] = $name;
        $providerList[$cr++]['address'] = $address;
    }
    echo json_encode(['dataset' => $providerList]);

} else {
    http_response_code(404);
}