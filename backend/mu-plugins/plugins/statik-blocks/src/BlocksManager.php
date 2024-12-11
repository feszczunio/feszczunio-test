<?php

declare(strict_types=1);

namespace Statik\Blocks;

use Statik\Blocks\Block\Utils\BlocksAssets;
use Statik\Blocks\Block\Utils\CoreBlocks;
use Statik\Blocks\BlockType\AbstractBlockType;
use Statik\Blocks\BlockType\BlockTypeInterface;
use Statik\Blocks\BlockType\Exception\BlockException;
use Statik\Blocks\BlockType\SettingsInterface;
use Symfony\Component\Filesystem\Exception\IOException;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\Finder\Exception\DirectoryNotFoundException;
use Symfony\Component\Finder\Finder;

/**
 * Class BlocksManager.
 */
class BlocksManager
{
    /** @var AbstractBlockType[] */
    private array $blockTypesRegistry = [];

    /**
     * BlocksManager constructor.
     */
    public function __construct()
    {
        $this->registerBlockTypesDirectory(DI::dir('blocks/statik'));
        \add_action('save_post', [static::class, 'clearBlocksCache']);

        if (DI::coreBlocksEnabled()) {
            $this->registerBlockTypesDirectory(DI::dir('blocks/core'));
            \add_action('init', [CoreBlocks::class, 'preventInitCoreBlocks'], 0);
        }

        BlocksAssets::registerGlobalBlockAssets();
    }

    /**
     * Register whole directory with block types.
     */
    public function registerBlockTypesDirectory(string ...$directories): void
    {
        foreach ($directories as $directory) {
            foreach (\glob("{$directory}/**/*.php") as $file) {
                $classes = \get_declared_classes();

                \ob_start();
                include_once $file;
                \ob_clean();

                $foundClasses = \array_diff(\get_declared_classes(), $classes);
                $foundClasses && $this->registerBlockType(\reset($foundClasses));
            }
        }
    }

    /**
     * Register single block type.
     */
    public function registerBlockType(string ...$classes): void
    {
        foreach ($classes as $class) {
            if (false === \is_a($class, AbstractBlockType::class, true)) {
                continue;
            }

            try {
                /** @var AbstractBlockType $blockType */
                $blockType = new $class();

                $this->blockTypesRegistry[$blockType->getConfig('name')] = $blockType;
            } catch (BlockException $exception) {
                \trigger_error(
                    \sprintf('%s: %s', \__('Block type register error', 'statik-blocks'), $exception->getMessage()),
                    \E_USER_WARNING
                );
            }
        }
    }

    /**
     * Clear Twig cache directory.
     */
    public static function clearBlocksCache(): bool
    {
        try {
            $directories = (new Finder())->in(DI::dir('cache'))->directories();
            (new Filesystem())->remove($directories);
        } catch (DirectoryNotFoundException|IOException) {
            return false;
        }

        return true;
    }

    /**
     * Get block types registry.
     */
    public function getBlockTypesRegistry(): array
    {
        return $this->blockTypesRegistry;
    }

    /**
     * Get block type from blocks registry.
     */
    public function getBlockType(string $name): ?BlockTypeInterface
    {
        return $this->blockTypesRegistry[$name] ?? null;
    }

    /**
     * Get settings for block types.
     */
    public function getSettingsSchema(): array
    {
        $blockTypes = \array_filter(
            $this->getBlockTypesRegistry(),
            static fn (AbstractBlockType $blockType): bool => $blockType instanceof SettingsInterface
        );

        $settings = [];

        foreach ($blockTypes as $blockType) {
            /** @var SettingsInterface $blockType */
            $settings = \array_merge($settings ?? [], $blockType->getSettingsSchema());
        }

        \array_pop($settings);

        return $settings;
    }
}
