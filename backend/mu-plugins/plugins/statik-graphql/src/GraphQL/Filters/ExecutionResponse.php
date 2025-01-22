<?php

declare(strict_types=1);

namespace Statik\GraphQL\GraphQL\Filters;

use GraphQL\Executor\ExecutionResult;
use Statik\GraphQL\GraphQL\Utils\Hookable;

/**
 * Class ExecutionResponse.
 */
class ExecutionResponse implements Hookable
{
    public function registerHooks(): void
    {
        \add_filter('graphql_request_results', [$this, 'filterExecuteResponse']);
    }

    /**
     * Filter production assets domain in the response.
     */
    public function filterExecuteResponse(array|ExecutionResult $result): array|ExecutionResult
    {
        $responseIsArray = false === ($result instanceof ExecutionResult);
        $resultData = \json_encode($responseIsArray ? $result['data'] : $result->data, \JSON_UNESCAPED_SLASHES);

        $replaceAssets = \defined('STATIK_ASSETS_URL') && \filter_var(STATIK_ASSETS_URL, \FILTER_VALIDATE_URL);
        $uploadsUrlTemp = 'https://temp-assets-j4hg8skj4u.com/wp-content/uploads';
        $uploadsUrl = \wp_upload_dir()['baseurl'] ?? WP_CONTENT_URL . '/uploads';

        $resultData = \str_replace(
            [
                $replaceAssets ? \untrailingslashit($uploadsUrl) : null,
                \untrailingslashit(\home_url('', 'http')),
                \untrailingslashit(\home_url('', 'https')),
                $replaceAssets ? $uploadsUrlTemp : '/wp-content/uploads',
            ],
            [
                $replaceAssets ? $uploadsUrlTemp : null,
                null,
                null,
                $replaceAssets ? \untrailingslashit(STATIK_ASSETS_URL) : '/static/uploads',
            ],
            $resultData
        );

        $resultData = \json_decode($resultData, true);

        if (\JSON_ERROR_NONE !== \json_last_error()) {
            return $result;
        }

        $responseIsArray ? ($result['data'] = $resultData) : ($result->data = $resultData);

        return $result;
    }
}
