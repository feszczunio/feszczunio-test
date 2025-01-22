<?php

declare(strict_types=1);

namespace Statik\Blocks\Common\Tests\Config\Driver;

use Statik\Blocks\Common\Config\Driver\AbstractDriver;

/**
 * Class Driver.
 */
class Driver extends AbstractDriver
{
    private array $source = [];

    /**
     * {@inheritdoc}
     */
    public function getConfig(): array
    {
        return [$this->source, []];
    }

    /**
     * {@inheritdoc}
     */
    public function setConfig(array $data, array $expiration = []): bool
    {
        $this->source = $data;

        return true;
    }
}
