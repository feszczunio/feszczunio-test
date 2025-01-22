<?php

declare(strict_types=1);

namespace Statik\Blocks\CustomBlocks\Statik\Accordion;

use Statik\Blocks\Block\Block;
use Statik\Blocks\BlockType\AbstractBlockType;
use Statik\Blocks\BlockType\InlineDataInterface;

/**
 * Class Accordion.
 */
class Accordion extends AbstractBlockType implements InlineDataInterface
{
    public function getInlineData(): array
    {
        return [
            'attributes' => static fn (Block $block) => $block->attributes,
        ];
    }
}
