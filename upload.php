<?php
// Simple APK Upload Script
$uploadDir = 'uploads/';
$allowedTypes = ['application/vnd.android.package-archive', 'application/octet-stream'];

// Create uploads directory if it doesn't exist
if (!file_exists($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

$response = ['success' => false, 'message' => ''];

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['apk'])) {
    $file = $_FILES['apk'];
    
    // Basic validation
    if ($file['error'] !== UPLOAD_ERR_OK) {
        $response['message'] = 'Upload failed with error code: ' . $file['error'];
    } elseif (!in_array($file['type'], $allowedTypes) || 
              pathinfo($file['name'], PATHINFO_EXTENSION) !== 'apk') {
        $response['message'] = 'Please upload a valid APK file';
    } else {
        // Delete old APK if exists
        array_map('unlink', glob($uploadDir . '*.apk'));
        
        // Save new APK
        $targetPath = $uploadDir . 'app-latest.apk';
        if (move_uploaded_file($file['tmp_name'], $targetPath)) {
            $response = [
                'success' => true,
                'message' => 'Upload successful!',
                'downloadUrl' => 'download.php',
                'version' => $_POST['version'] ?? '1.0',
                'size' => filesize($targetPath)
            ];
            
            // Save version info
            file_put_contents($uploadDir . 'version.txt', $response['version']);
        } else {
            $response['message'] = 'Failed to save file';
        }
    }
} else {
    $response['message'] = 'Invalid request';
}

header('Content-Type: application/json');
echo json_encode($response);
