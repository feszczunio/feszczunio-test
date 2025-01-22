<?php

declare(strict_types=1);

namespace Statik\Deploy\Common\Tests\Utils;

/**
 * Class DumpCallback.
 */
class DumpCallback
{
    public static function getStaticData(array $customData = []): array
    {
        return \array_merge(['value1', 'value2'], $customData);
    }

    public function getData(array $customData = []): array
    {
        return \array_merge(['value1', 'value2'], $customData);
    }
}
