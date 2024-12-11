<?php

declare(strict_types=1);

namespace Statik\Blocks\CustomBlocks\Statik\TeamMemberCards;

use GraphQL\Deferred;
use GraphQL\Type\Definition\ResolveInfo;
use Illuminate\Support\Arr;
use Statik\Blocks\Block\Block;
use Statik\Blocks\BlockType\AbstractBlockType;
use Statik\Blocks\BlockType\DependencyInterface;
use Statik\Blocks\BlockType\DynamicBlockInterface;
use Statik\Blocks\BlockType\GraphQlConnectionsInterface;
use Statik\Blocks\BlockType\GraphQlExtraAttributesInterface;
use Statik\Blocks\BlockType\InlineDataInterface;
use Statik\Blocks\Utils\PostType;
use Statik\GraphQL\GraphQL\Model\GutenbergBlockModel;
use WPGraphQL\AppContext;
use WPGraphQL\Data\Connection\PostObjectConnectionResolver;

/**
 * Class TeamMemberCards.
 */
class TeamMemberCards extends AbstractBlockType implements
    GraphQlExtraAttributesInterface,
    DependencyInterface,
    GraphQlConnectionsInterface,
    InlineDataInterface,
    DynamicBlockInterface
{
    public function haveDependencies(): bool
    {
        return \get_post_type_object('person') instanceof \WP_Post_Type;
    }

    public function getInlineData(): array
    {
        return [
            'attributes' => static fn (Block $block) => $block->attributes,
            'currentPostId' => static fn (Block $block) => $block->getContext('post.ID'),
        ];
    }

    public function getGraphQlExtraAttributes(): array
    {
        return [
            'posts' => static fn (Block $block): array => PostType::getPosts(
                'person',
                $block->getAttributes('query', []),
                $block->getAttributes('excludeCurrentPost', false) ? $block->getContext('post.ID') : null
            ),
        ];
    }

    public function getGraphQLConnections(): array
    {
        return [
            'posts' => [
                'toType' => 'ContentNode',
                'resolve' => static function (
                    GutenbergBlockModel $block,
                    array $args,
                    AppContext $context,
                    ResolveInfo $info
                ): Deferred {
                    $posts = \json_decode(Arr::get($block->attributes, 'posts.value'));
                    $resolver = new PostObjectConnectionResolver($block->postId, $args, $context, $info);
                    $resolver->set_query_arg('post__in', $posts ?: [\PHP_INT_MAX]);
                    $resolver->set_query_arg('orderby', 'post__in');

                    return $resolver->get_connection();
                },
            ],
        ];
    }
}
