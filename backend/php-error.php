<?php
/**
 * Plugin Name: Statik PHP Error
 * Plugin URI:  https://statik.space/
 * Description: Statik drop-in plugin for handle PHP errors.
 * Version:     1.0.0
 * Text domain: statik-php-error
 * Author:      Statik LTD
 * Author URI:  https://statik.space/
 * License:     GPLv3 or later.
 */

declare(strict_types=1);

\defined('ABSPATH') || exit('Direct access is not permitted!');

/**
 * This is a custom PHP error handler. Instead of displaying a full error
 * user should see a message, that the website is temporarily unavailable.
 */
require __DIR__ . '/mu-plugins/themes/statik/php-error.php';
