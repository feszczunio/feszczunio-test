<?php

declare(strict_types=1);

namespace Statik\Menu\Common\Tests\Config;

use PHPUnit\Framework\TestCase;
use Statik\Menu\Common\Config\AbstractConfig;
use Statik\Menu\Common\Config\ConfigInterface;

/**
 * Class ConfigTest.
 *
 * @internal
 *
 * @coversNothing
 */
final class ConfigTest extends TestCase
{
    private Driver\Driver $driver;

    private ConfigInterface $config;

    private array $defaultSettings;

    protected function setUp(): void
    {
        parent::setUp();

        $this->driver = new Driver\Driver('example_namespace');
        $this->config = Config::Instance('example_namespace', $this->driver);

        /* The same values are set in DEFAULT_SETTINGS constant in Config class. */
        $this->defaultSettings = [
            'defaultKey1' => 'value1',
            'defaultKey2' => [
                'subKey1' => 123,
                'subKey2' => false,
            ],
        ];
    }

    public function testCanCheckIfKeyIsDefaultSettings(): void
    {
        $this->assertEquals($this->defaultSettings, $this->config::getDefaultSettings());

        $this->assertTrue($this->config::isDefaultSettings('defaultKey1'));
        $this->assertTrue($this->config::isDefaultSettings('defaultKey2.subKey2'));
        $this->assertNotTrue($this->config::isDefaultSettings('defaultKey2.subKey3'));
        $this->assertNotTrue($this->config::isDefaultSettings('defaultKey1.subKey1'));
    }

    public function testCanCreateInstances(): void
    {
        $otherDriver = new Driver\Driver('other_namespace');
        $otherConfig = Config::Instance('other_namespace', $otherDriver);

        $this->assertInstanceOf(AbstractConfig::class, $otherConfig);
        $this->assertEquals($otherConfig, Config::Instance('other_namespace', $otherDriver));
        $this->assertEquals($otherConfig, Config::Instance('other_namespace', $this->driver));

        $this->assertEquals(
            ['example_namespace' => $this->config, 'other_namespace' => $otherConfig],
            Config::getInstances()
        );
    }

    public function testCanInsertData(): void
    {
        $this->assertEquals($this->defaultSettings, $this->config->toArray());

        $this->assertFalse($this->config->has('offset1'));
        $this->assertNull($this->config->get('offset1'));
        $this->assertEquals('Default value', $this->config->get('offset1', 'Default value'));

        $this->assertTrue($this->config->set('offset1.value', 'New value'));
        $this->assertTrue($this->config->has('offset1'));
        $this->assertEquals('New value', $this->config->get('offset1.value'));
        $this->assertEquals(['value' => 'New value'], $this->config->get('offset1'));
    }

    public function testCanDeleteOffset(): void
    {
        $this->assertFalse($this->config->has('offset2'));

        $this->config->set('offset2', 123);

        $this->assertTrue($this->config->has('offset2'));
        $this->assertTrue($this->config->delete('offset2'));
        $this->assertFalse($this->config->has('offset2'));
    }

    public function testCanCheckLastKey(): void
    {
        $this->config->set('offset3', ['key1' => 'value1', 'key2' => 'value2']);

        $this->assertEquals('value2', $this->config->last('offset3'));

        $this->config->set('offset3.key3', 'value3');

        $this->assertEquals('value3', $this->config->last('offset3'));
    }

    public function testCanPrependData(): void
    {
        $this->config->set('offset4', ['value1', 'value2']);

        $this->config->prepend('offset4', 'value0');

        $this->assertEquals(['value0', 'value1', 'value2'], $this->config->get('offset4'));
    }

    public function testCanGetOffsetKeys(): void
    {
        $this->config->set('offset5', ['key1' => 'value1', 'key2' => 'value2']);

        $this->assertEquals(['key1', 'key2'], $this->config->getKeys('offset5'));
        $this->assertNull($this->config->getKeys('offset5.key1'));
    }
}
