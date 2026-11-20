# PowerShell Native Web Server for Glamour Runway 3D
param (
    [int]$Port = 3000
)

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$publicDir = Join-Path $scriptDir "public"

$mimeMap = @{
    ".html" = "text/html; charset=utf-8"
    ".htm"  = "text/html; charset=utf-8"
    ".css"  = "text/css; charset=utf-8"
    ".js"   = "application/javascript; charset=utf-8"
    ".json" = "application/json; charset=utf-8"
    ".png"  = "image/png"
    ".jpg"  = "image/jpeg"
    ".svg"  = "image/svg+xml"
    ".ico"  = "image/x-icon"
}

$listener = [System.Net.Sockets.TcpListener]::new([System.Net.IPAddress]::Loopback, $Port)
try {
    $listener.Start()
} catch {
    $Port = 8080
    $listener = [System.Net.Sockets.TcpListener]::new([System.Net.IPAddress]::Loopback, $Port)
    $listener.Start()
}

Write-Host "====================================================" -ForegroundColor Cyan
Write-Host "✨ Glamour Runway 3D is live!" -ForegroundColor Green
Write-Host "👗 Local URL: http://localhost:$Port" -ForegroundColor Yellow
Write-Host "🎮 Mode: Dressing Room & Catwalk Simulation" -ForegroundColor Magenta
Write-Host "Press Ctrl+C to stop the server." -ForegroundColor Gray
Write-Host "====================================================" -ForegroundColor Cyan

while ($true) {
    $client = $listener.AcceptTcpClient()
    $stream = $client.GetStream()
    $reader = [System.IO.StreamReader]::new($stream)
    $writer = [System.IO.StreamWriter]::new($stream)

    $requestLine = $reader.ReadLine()
    if ([string]::IsNullOrWhiteSpace($requestLine)) {
        $client.Close()
        continue
    }

    $tokens = $requestLine.Split(" ")
    if ($tokens.Length -lt 2) {
        $client.Close()
        continue
    }

    $method = $tokens[0]
    $urlPath = $tokens[1].Split("?")[0]

    # Read remaining headers
    while ($true) {
        $line = $reader.ReadLine()
        if ([string]::IsNullOrEmpty($line)) { break }
    }

    # Normalize path
    if ($urlPath -eq "/" -or [string]::IsNullOrEmpty($urlPath)) {
        $urlPath = "/index.html"
    }

    $localFilePath = Join-Path $publicDir ($urlPath.TrimStart("/").Replace("/", [System.IO.Path]::DirectorySeparatorChar))

    if (Test-Path $localFilePath -PathType Leaf) {
        $ext = [System.IO.Path]::GetExtension($localFilePath).ToLower()
        $contentType = if ($mimeMap.ContainsKey($ext)) { $mimeMap[$ext] } else { "application/octet-stream" }
        $contentBytes = [System.IO.File]::ReadAllBytes($localFilePath)

        $header = "HTTP/1.1 200 OK`r`n" +
                  "Content-Type: $contentType`r`n" +
                  "Content-Length: $($contentBytes.Length)`r`n" +
                  "Connection: close`r`n" +
                  "Access-Control-Allow-Origin: *`r`n`r`n"
        $headerBytes = [System.Text.Encoding]::UTF8.GetBytes($header)
        $stream.Write($headerBytes, 0, $headerBytes.Length)
        $stream.Write($contentBytes, 0, $contentBytes.Length)
    } else {
        $notFoundMsg = "404 Not Found"
        $header = "HTTP/1.1 404 Not Found`r`n" +
                  "Content-Type: text/plain`r`n" +
                  "Content-Length: $($notFoundMsg.Length)`r`n" +
                  "Connection: close`r`n`r`n" +
                  $notFoundMsg
        $headerBytes = [System.Text.Encoding]::UTF8.GetBytes($header)
        $stream.Write($headerBytes, 0, $headerBytes.Length)
    }

    $writer.Flush()
    $client.Close()
}
