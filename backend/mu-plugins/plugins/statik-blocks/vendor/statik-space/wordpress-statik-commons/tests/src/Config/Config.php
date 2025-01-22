<?php

declare(strict_types=1);

namespace Statik\Blocks\Common\Tests\Config;

use Illuminate\Support\Arr;
use Statik\Blocks\Common\Config\AbstractConfig;

/**
 * Class Config.
 */
class Config extends AbstractConfig
{
    public const DEFAULT_SETTINGS = [
        'defaultKey1' => 'value1',
        'defaultKey2' => [
            'subKey1' => 123,
            'subKey2' => false,
        ],
    ];

    /**
     * {@inheritdoc}
     */
    public static function isDefaultSettings(?string $offset): bool
    {
        return Arr::has(self::DEFAULT_SETTINGS, $offset);
    }

    /**
     * {@inheritdoc}
     */
    public static function getDefaultSettings(): array
    {
        return self::DEFAULT_SETTINGS;
    }
}
