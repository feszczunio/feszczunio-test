<?php

declare(strict_types=1);

namespace Statik\Deploy\Common\Tests\Utils;

use PHPUnit\Framework\TestCase;
use Statik\Deploy\Common\Utils\Callback;

/**
 * Class CallbackTest.
 *
 * @internal
 *
 * @coversNothing
 */
final class CallbackTest extends TestCase
{
    public function testCanIgnoreSimpleArray(): void
    {
        $data = ['value1', 'value2'];
        $this->assertEquals($data, Callback::getResults($data));
    }

    public function testCanGetFromClosure(): void
    {
        $function = static fn () => ['value1', 'value2'];

        $this->assertEquals(['value1', 'value2'], Callback::getResults($function));
    }

    public function testCanGetFromObject(): void
    {
        $this->assertEquals(['value1', 'value2'], Callback::getResults([DumpCallback::class, 'getStaticData']));
        $this->assertEquals(['value1', 'value2'], Callback::getResults([new DumpCallback(), 'getData']));

        $this->assertEquals(
            ['value1', 'value2', 'extra1'],
            Callback::getResults([DumpCallback::class, 'getStaticData', ['extra1']])
        );
        $this->assertEquals(
            ['value1', 'value2', 'extra1'],
            Callback::getResults([new DumpCallback(), 'getData', ['extra1']])
        );
    }
}
