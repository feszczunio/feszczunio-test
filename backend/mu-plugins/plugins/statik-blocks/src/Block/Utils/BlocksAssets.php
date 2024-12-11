<?php

declare(strict_types=1);

namespace Statik\Blocks\Block\Utils;

use Statik\Blocks\DI;

/**
 * Class BlocksAssets.
 */
class BlocksAssets
{
    /**
     * Register global block assets.
     */
    public static function registerGlobalBlockAssets(): void
    {
        foreach (\glob(DI::dir('build/*'), \GLOB_ONLYDIR) as $directory) {
            $directory = \basename($directory);

            \add_action(
                \str_contains($directory, '-editor-') ? 'admin_enqueue_scripts' : 'wp_enqueue_scripts',
                static function () use ($directory): void {
                    self::enqueueScript($directory);
                    self::enqueueStyle($directory);
                }
            );
        }
    }

    /**
     * Enqueue script index.js file.
     */
    public static function enqueueScript(string $directory): void
    {
        $scriptPath = "build/{$directory}/index.min.js";
        $scriptDir = DI::dir($scriptPath);

        if (false === \file_exists($scriptDir)) {
            return;
        }

        $assetPath = DI::dir("build/{$directory}/index.min.asset.php");
        $assetFile = \file_exists($assetPath) ? require($assetPath) : null;

        \wp_enqueue_script(
            $directory,
            DI::url($scriptPath),
            $assetFile['dependencies'] ?? [],
            $assetFile['version'] ?? \filemtime($scriptDir)
        );
    }

    /**
     * Enqueue style index.css file.
     */
    public static function enqueueStyle(string $directory): void
    {
        $stylePath = "build/{$directory}/index.min.css";
        $styleDir = DI::dir($stylePath);

        if (false === \file_exists($styleDir)) {
            return;
        }

        \wp_enqueue_style($directory, DI::url($stylePath), [], \filemtime($styleDir));
    }
}
