<?php
header('Content-Type: application/json; charset=utf-8');
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $subscriptionData = json_decode(file_get_contents('php://input'), true);

    $response = ['message' => 'Abonnement enregistré avec succès'];
    echo json_encode($response);
} else {

    http_response_code(405); // Méthode non autorisée
    $errorResponse = ['error' => 'Méthode non autorisée'];
    echo json_encode($errorResponse);
}