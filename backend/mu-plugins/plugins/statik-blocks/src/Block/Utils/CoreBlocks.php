<?php

declare(strict_types=1);

namespace Statik\Blocks\Block\Utils;

/**
 * Class Blocks.
 */
class CoreBlocks
{
    /**
     * Prevent load Core Gutenberg blocks.
     */
    public static function preventInitCoreBlocks(): void
    {
        global $wp_filter;

        \remove_action('init', 'register_core_block_types_from_metadata');
        \remove_action('init', 'gutenberg_register_legacy_social_link_blocks');
        \remove_action('init', 'gutenberg_reregister_core_block_types');
        \remove_action('init', 'gutenberg_register_legacy_query_loop_block');

        foreach (\array_keys($wp_filter['init'][10] ?? []) as $name) {
            if (false === \str_starts_with($name, 'register_block_core_')) {
                continue;
            }

            \remove_action('init', $name);
        }
    }
}
