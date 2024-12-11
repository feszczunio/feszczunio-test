<?php

declare(strict_types=1);

namespace Statik\Deploy\Common\Tests\Config\Driver;

use PHPUnit\Framework\TestCase;

/**
 * Class DriverTest.
 *
 * @internal
 *
 * @coversNothing
 */
final class DriverTest extends TestCase
{
    public function testCanReadAndSaveInSource(): void
    {
        $driver = new Driver('example_namespace');
        $data = [
            [123, 'data', ['value1', 'value2']],
            ['key' => ['subKey' => 123, 'subKey2' => 'value']],
        ];

        foreach ($data as $datum) {
            $this->assertTrue($driver->setInSource($datum));
            $this->assertEquals([$datum, []], $driver->getFromSource());
        }
    }
}
