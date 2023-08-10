export default function generateFullListHTML(linkListHTML) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tailwindcss/forms@0.5.4/dist/tailwind.min.css">
    <style>
        body {
            background-color: #1E2127;
            color: rgb(226 232 240);
        }
    </style>
</head>
<body>
    <div class="flex items-center justify-center">
    <div class="max-w-xs w-80">

        <!-- BEGIN EXPORTED LIST -->
        ${linkListHTML}
    <!-- END EXPORTED LIST -->

</div>
</div>
    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/forms@0.5.4/src/index.min.js"></script>
</body>
</html>`
}