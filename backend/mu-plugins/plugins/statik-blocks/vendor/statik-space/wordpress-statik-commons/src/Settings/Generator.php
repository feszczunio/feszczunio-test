<?php

declare(strict_types=1);

namespace Statik\Blocks\Common\Settings;

use Statik\Blocks\Common\Common;
use Statik\Blocks\Common\Config\ConfigInterface;
use Statik\Blocks\Common\Settings\Field\BreakLine;
use Statik\Blocks\Common\Settings\Field\Editor;
use Statik\Blocks\Common\Settings\Field\Heading;
use Statik\Blocks\Common\Settings\Field\Input;
use Statik\Blocks\Common\Settings\Field\InputCheckbox;
use Statik\Blocks\Common\Settings\Field\Repeater;
use Statik\Blocks\Common\Settings\Field\Select;
use Statik\Blocks\Common\Settings\Field\SelectMultiple;
use Statik\Blocks\Common\Settings\Field\Textarea;
use Statik\Blocks\Common\Utils\Callback;

/**
 * Class Generator.
 */
class Generator implements GeneratorInterface
{
    private array $registeredFields = [];

    /**
     * Generator constructor.
     */
    public function __construct(
        private ConfigInterface $config,
        private string $namespace,
        private ?string $apiNamespace = null
    ) {
        \add_action('admin_print_styles', [$this, 'enqueueDashboardStyles']);
        \add_action('admin_print_scripts', [$this, 'enqueueDashboardScripts']);
    }

    /**
     * Enqueue required Styles for dashboard.
     */
    public function enqueueDashboardStyles(): void
    {
        \wp_enqueue_style(
            'statik_common_settings',
            \sprintf(
                '%s/stylesheets/settings.%s',
                Common::url('assets'),
                Common::development() && \file_exists(Common::dir('assets/stylesheets/settings.css')) ? 'css' : 'min.css'
            ),
            [],
            Common::development() ? \mt_rand() : Common::version()
        );
    }

    /**
     * Enqueue required JavaScript scripts for dashboard.
     */
    public function enqueueDashboardScripts(): void
    {
        \wp_enqueue_script(
            'statik_common_settings',
            \sprintf(
                '%s/javascripts/settings.%s',
                Common::url('assets'),
                Common::development() && \file_exists(Common::dir('assets/javascripts/settings.js')) ? 'js' : 'min.js'
            ),
            ['jquery', 'wp-polyfill'],
            Common::development() ? \mt_rand() : Common::version(),
            true
        );

        \wp_localize_script(
            'statik_common_settings',
            'statikCommon = window.statikCommon || {}; statikCommon.config',
            [
                'nonce' => \wp_create_nonce('wp_rest'),
                'debug' => (int) Common::development(),
                'assetsUrl' => Common::url('assets'),
            ]
        );
    }

    public function registerFields(string $key, array $fields): ?array
    {
        $this->registeredFields[$key] = $fields;

        return $this->registeredFields;
    }

    /**
     * Initialize fields values.
     */
    public function initializeFields(bool $saveDefault = true): void
    {
        foreach ($this->registeredFields as $key => $fields) {
            \array_walk($fields, [$this, 'initField'], $saveDefault);
            $this->registeredFields[$key] = $fields;
        }

        $this->config->save();
    }

    public function getNamespace(): string
    {
        return $this->namespace;
    }

    public function getApiNamespace(): ?string
    {
        return $this->apiNamespace;
    }

    public function getConfig(): ConfigInterface
    {
        return $this->config;
    }

    public function generateStructure(string $group): string
    {
        $this->initializeFields();

        $structureHtml = '';

        foreach ($this->registeredFields[$group] ?? [] as $fieldName => $fieldStructure) {
            switch ($fieldStructure['type'] ?? '') {
                case 'input':
                    $field = new Input($fieldName, $fieldStructure, $this);
                    break;
                case 'input:checkbox':
                    $field = new InputCheckbox($fieldName, $fieldStructure, $this);
                    break;
                case 'editor':
                    $field = new Editor($fieldName, $fieldStructure, $this);
                    break;
                case 'textarea':
                    $field = new Textarea($fieldName, $fieldStructure, $this);
                    break;
                case 'select':
                    $field = new Select($fieldName, $fieldStructure, $this);
                    break;
                case 'select:multiple':
                    $field = new SelectMultiple($fieldName, $fieldStructure, $this);
                    break;
                case 'repeater':
                    $field = new Repeater($fieldName, $fieldStructure, $this);
                    break;
                case 'break':
                    $field = new BreakLine($fieldName, $fieldStructure, $this);
                    break;
                case 'heading':
                    $field = new Heading($fieldName, $fieldStructure, $this);
                    break;
                default:
                    continue 2;
            }

            $structureHtml .= $field->generateFieldsetHtml();
        }

        return $this->minifyHtml(
            \sprintf(
                '<div class="statik-settings-grid statik-generator" data-namespace="%s">%s</div>',
                $this->namespace,
                $structureHtml
            )
        );
    }

    /**
     * Initialize single field.
     */
    private function initField(array &$field, string $key, bool $saveDefault): void
    {
        if (isset($field['value'])) {
            $field['value'] = Callback::getResults($field['value']);

            return;
        }

        $field['value'] = $this->config->get("{$key}.value");

        if (null === $field['value'] && ($field['default'] ?? null)) {
            $field['value'] = Callback::getResults($field['default']);
        }

        if ($saveDefault && $this->config->get("{$key}.value") !== $field['value']) {
            $this->config->set("{$key}.value", $field['value']);
        }
    }

    /**
     * Minify HTML.
     */
    private function minifyHtml(string $html): string
    {
        return \preg_replace(
            ['/\>[^\S ]+/s', '/[^\S ]+\</s', '/(\s)+/s', '/<!--(.|\s)*?-->/'],
            ['>', '<', '\\1', ''],
            $html
        );
    }
}
