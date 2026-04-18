<?php
// Simple APK Download Script
$file = 'uploads/app-latest.apk';

if (file_exists($file)) {
    header('Content-Description: File Transfer');
    header('Content-Type: application/vnd.android.package-archive');
    header('Content-Disposition: attachment; filename="' . basename($file) . '"');
    header('Content-Length: ' . filesize($file));
    header('Pragma: public');
    header('Cache-Control: must-revalidate');
    header('Expires: 0');
    
    readfile($file);
    exit;
} else {
    http_response_code(404);
    echo 'APK file not found';
}
