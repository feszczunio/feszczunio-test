<?php

declare(strict_types=1);

namespace Statik\Search\Search\Client;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;
use GuzzleHttp\RequestOptions;
use Psr\Http\Message\ResponseInterface;
use Statik\Search\DI;
use Statik\Search\Search\PostFilter;
use Statik\Search\Search\SearchManager;

use const Statik\Search\VERSION;

/**
 * Class SearchClient.
 */
class SearchClient implements ClientInterface
{
    private string $prefix;

    private Client $client;

    /**
     * ElasticSearchClient constructor.
     *
     * @throws ClientException
     */
    public function __construct(private string $environment)
    {
        $clientKey = DI::Config()->getValue('search.client_key');
        $endpointUrl = DI::Config()->getValue('search.endpoint_url');

        if (null === $clientKey) {
            throw new ClientException('Not found API token value in the search configuration', 400);
        }

        if (null === $endpointUrl) {
            throw new ClientException('Not found API endpoint URL value in the search configuration', 400);
        }

        $this->prefix = SearchManager::getSitePrefix();
        $this->client = new Client([
            'base_uri' => \trailingslashit($endpointUrl),
            RequestOptions::CONNECT_TIMEOUT => 3,
            RequestOptions::TIMEOUT => 5,
            RequestOptions::VERSION => 3,
            RequestOptions::SYNCHRONOUS => true,
            RequestOptions::HEADERS => [
                'Authorization' => \sprintf('Bearer %s', $clientKey),
                'User-Agent' => self::getUserAgent(\trailingslashit($endpointUrl)),
            ],
        ]);
    }

    /**
     * Prepare and insert Post data into API.
     *
     * @throws ClientException
     */
    public function insertPostData(array $posts): array
    {
        $postFilter = new PostFilter($posts);

        return $this->insertData(['data' => $postFilter->getPreparedPosts()]);
    }

    /**
     * Insert data into API.
     *
     * @throws ClientException
     */
    public function insertData(array $data): array
    {
        try {
            $rawResponse = $this->client->put(
                'bulk',
                [
                    RequestOptions::JSON => $data,
                    RequestOptions::QUERY => ['prefix' => $this->prefix, 'frontend_id' => $this->environment],
                ]
            );
            $response = $this->getResponseArray($rawResponse);
        } catch (GuzzleException $e) {
            $message = \method_exists($e, 'getResponse')
                ? $e->getResponse()?->getBody()?->getContents() ?: $e->getMessage()
                : $e->getMessage();

            $maybeJsonMessage = \json_decode($message, true);

            throw new ClientException(
                \wp_strip_all_tags($maybeJsonMessage['message'] ?? $message, true),
                $e->getCode() ?: 500,
                $e
            );
        }

        return $response;
    }

    /**
     * Remove index from API.
     *
     * @throws ClientException
     */
    public function removeIndex(): array
    {
        try {
            $rawResponse = $this->client->delete(
                '',
                [RequestOptions::QUERY => ['prefix' => $this->prefix, 'frontend_id' => $this->environment]]
            );
            $response = $this->getResponseArray($rawResponse);
        } catch (GuzzleException $e) {
            $message = \method_exists($e, 'getResponse')
                ? $e->getResponse()?->getBody()?->getContents() ?: $e->getMessage()
                : $e->getMessage();

            $maybeJsonMessage = \json_decode($message, true);

            throw new ClientException(
                \wp_strip_all_tags($maybeJsonMessage['message'] ?? $message, true),
                $e->getCode() ?: 500,
                $e
            );
        }

        return $response;
    }

    /**
     * Save engine settings.
     *
     * @throws ClientException
     */
    public function updateSettings(): array
    {
        $toRetrieve = DI::Config()->getValue('engine.attributes_to_retrieve', '');
        $searchable = DI::Config()->getValue('engine.searchable_attributes', '');
        $filterable = DI::Config()->getValue('engine.attributes_for_faceting', '');

        try {
            $rawResponse = $this->client->put(
                'settings',
                [
                    RequestOptions::JSON => [
                        'attributes_to_retrieve' => (array) \preg_split("/\r\n|\n|\r/", $toRetrieve),
                        'searchable_attributes' => (array) \preg_split("/\r\n|\n|\r/", $searchable),
                        'attributes_for_faceting' => \array_map(
                            static fn ($string): string => "filterOnly({$string})",
                            (array) \preg_split("/\r\n|\n|\r/", $filterable)
                        ),
                    ],
                    RequestOptions::QUERY => ['prefix' => $this->prefix, 'frontend_id' => $this->environment],
                ]
            );
            $response = $this->getResponseArray($rawResponse);
        } catch (GuzzleException $e) {
            $message = \method_exists($e, 'getResponse')
                ? $e->getResponse()?->getBody()?->getContents() ?: $e->getMessage()
                : $e->getMessage();

            $maybeJsonMessage = \json_decode($message, true);

            throw new ClientException(
                \wp_strip_all_tags($maybeJsonMessage['message'] ?? $message, true),
                $e->getCode() ?: 500,
                $e
            );
        }

        return $response;
    }

    /**
     * Get array from the Response.
     *
     * @throws ClientException
     */
    private function getResponseArray(ResponseInterface $response): array
    {
        $body = $response->getBody()->getContents();

        if (400 <= $response->getStatusCode()) {
            throw new ClientException($body, $response->getStatusCode());
        }

        return \json_decode($body, true);
    }

    /**
     * Generate User-Agent header for request.
     */
    protected static function getUserAgent(string $url = null): string
    {
        /** This filter is documented in wp-includes/http.php */
        return \apply_filters(
            'http_headers_useragent',
            \sprintf(
                'WordPress/%s; %s; StatikSearch/%s',
                \get_bloginfo('version'),
                \get_bloginfo('url'),
                VERSION
            ),
            $url
        );
    }
}
