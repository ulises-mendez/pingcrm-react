<!DOCTYPE html>
<html class="h-full bg-gray-200">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
    <link href="{{ mix('css/app.css') }}" rel="stylesheet">
    <script src="{{ mix('js/manifest.js') }}" defer></script>
    <script src="{{ mix('js/vendor.js') }}" defer></script>
    <script src="{{ mix('js/app.js') }}" defer></script>
    @routes
</head>
<body class="font-sans antialiased leading-none text-gray-800">

@inertia
@if (app()->isLocal())
<script src="http://localhost:3000/browser-sync/browser-sync-client.js"></script>
@endif
</body>
</html>
