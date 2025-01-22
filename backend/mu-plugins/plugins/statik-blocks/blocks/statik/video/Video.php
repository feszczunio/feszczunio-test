<?php

declare(strict_types=1);

namespace Statik\Blocks\CustomBlocks\Statik\Video;

use Statik\Blocks\Block\Block;
use Statik\Blocks\BlockType\AbstractBlockType;
use Statik\Blocks\BlockType\InlineDataInterface;

/**
 * Class Video.
 */
class Video extends AbstractBlockType implements InlineDataInterface
{
    public function getInlineData(): array
    {
        return [
            'attributes' => static fn (Block $block) => $block->attributes,
        ];
    }
}
