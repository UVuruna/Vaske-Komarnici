<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description"
        content="Izrada i montaža rolo, plisiranih i fiksnih komarnika po meri u Beogradu. Brza ugradnja i servis komarnika - zamena mreže i kanapa." />
    <meta name="keywords"
        content="komarnici po meri, izrada komarnika, montaža komarnika, rolo komarnici, plise komarnici, fiksni komarnici, komarnici Beograd, ugradnja komarnika, popravka komarnika, zamena kanapa, zamena mreže, servis komarnika Beograd" />
    <meta name="author" content="UV-Uros Vuruna" />

    <title><?php echo $title ?? 'Vaske Komarnici'; ?></title>

    <link rel="icon" href="../img/logo/favicon.svg" type="image/svg+xml" />
    <link rel="icon" href="../img/logo/favicon-32x32.png" sizes="32x32" type="image/png" />
    <link rel="icon" href="../img/logo/favicon-16x16.png" sizes="16x16" type="image/png" />
    <link rel="apple-touch-icon" href="../img/logo/favicon-180x180.png" />

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">

    <link rel="stylesheet" href="../css/root.css" />
    <link rel="stylesheet" href="../css/header.css" />
    <link rel="stylesheet" href="../css/footer.css" />
    <?php if (!empty($styles)) {
        foreach ($styles as $css) {
            echo "<link rel='stylesheet' href='$css' />";
        }
    } ?>

    <script type="module" src="../js/init.js"></script>
</head>