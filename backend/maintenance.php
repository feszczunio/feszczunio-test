<?php
/**
 * Plugin Name: Statik Maintenance
 * Plugin URI:  https://statik.space/
 * Description: Statik drop-in plugin for handle Maintenance message.
 * Version:     1.0.0
 * Text domain: statik-maintenance
 * Author:      Statik LTD
 * Author URI:  https://statik.space/
 * License:     GPLv3 or later.
 */

declare(strict_types=1);

\defined('ABSPATH') || exit('Direct access is not permitted!');

/**
 * This is a custom maintenance page. This page is displaying when the WordPress
 * maintenance mode is enabled - for example when plugins are updating.
 */
require __DIR__ . '/mu-plugins/themes/statik/maintenance.php';
