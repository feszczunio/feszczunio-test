<?php

declare(strict_types=1);

namespace Statik\Menu\Common\Tests\Settings;

use PHPUnit\Framework\TestCase;
use Statik\Menu\Common\Settings\Generator;
use Statik\Menu\Common\Tests\Config\Config;
use Statik\Menu\Common\Tests\Config\Driver\Driver;

/**
 * Class GeneratorTest.
 *
 * @internal
 *
 * @coversNothing
 */
final class GeneratorTest extends TestCase
{
    private Generator $generator;

    protected function setUp(): void
    {
        parent::setUp();

        $driver = new Driver('generator_namespace');
        $config = new Config($driver);

        $this->generator = new Generator($config, 'generator_namespace', 'statik');
    }

    public function testCanRegisterFieldsGroup(): void
    {
        $fields = [
            'field1' => [
                'type' => 'input:text',
                'label' => 'Input',
            ],
        ];

        $generator = clone $this->generator;

        $this->assertEquals(
            ['example_fields_group' => $fields],
            $generator->registerFields('example_fields_group', $fields)
        );
    }

    public function testCanGenerateEmptyHtmlStructure(): void
    {
        $this->assertEquals(
            '<div class="statik-settings-grid statik-generator" data-namespace="generator_namespace"></div>',
            $this->generator->generateStructure('')
        );
    }

    public function testCanGenerateInputField(): void
    {
        $generator = clone $this->generator;
        $generator->registerFields(
            'group',
            [
                'field_1' => [
                    'type' => 'input',
                    'label' => 'Input field',
                    'description' => 'Input field description',
                    'attrs' => [
                        'class' => 'example-class',
                        'required' => 'required',
                        'disabled' => 'disabled',
                        'other' => 'Other data value',
                    ],
                ],
            ]
        );

        $generator->initializeFields();

        $this->assertEquals(
            '<div class="statik-settings-grid statik-generator" data-namespace="generator_namespace"> <div class="statik-grid-row" > <div class="statik-grid-col"> <label for="generator_namespace-field_1"> Input field <sup>*</sup> </label> <span class="desc">Input field description</span> </div> <div class="statik-grid-col input"> <div> <input id="generator_namespace-field_1" name="generator_namespace[field_1.value]" value="" class="example-class" required="required" disabled="disabled" data-other="Other data value" type="text" > </div> </div> </div> </div>',
            $generator->generateStructure('group')
        );
    }

    public function testCanGenerateInputCheckboxField(): void
    {
        $generator = clone $this->generator;
        $generator->registerFields(
            'group',
            [
                'field_1' => [
                    'type' => 'input:checkbox',
                    'label' => 'Input checkbox field',
                    'description' => 'Input checkbox field description',
                    'values' => [
                        'value1' => 'Value 1',
                        'value2' => 'Value 2',
                        'value3' => 'Value 3',
                    ],
                    'attrs' => [
                        'class' => 'example-class',
                        'required' => 'required',
                        'disabled' => 'disabled',
                        'other' => 'Other data value',
                    ],
                ],
            ]
        );

        $generator->initializeFields();

        $this->assertEquals(
            '<div class="statik-settings-grid statik-generator" data-namespace="generator_namespace"> <div class="statik-grid-row" > <div class="statik-grid-col"> <label for="generator_namespace-field_1"> Input checkbox field <sup>*</sup> </label> <span class="desc">Input checkbox field description</span> </div> <div class="statik-grid-col input"> <div><input type="hidden" name="generator_namespace[field_1.value]" disabled="disabled"> <label for="generator_namespace-field_1-value1"> <input type="checkbox" value="value1" name="generator_namespace[field_1.value][]" id="generator_namespace-field_1-value1" class="example-class" required="required" disabled="disabled" data-other="Other data value" > Value 1 </label> <label for="generator_namespace-field_1-value2"> <input type="checkbox" value="value2" name="generator_namespace[field_1.value][]" id="generator_namespace-field_1-value2" class="example-class" required="required" disabled="disabled" data-other="Other data value" > Value 2 </label> <label for="generator_namespace-field_1-value3"> <input type="checkbox" value="value3" name="generator_namespace[field_1.value][]" id="generator_namespace-field_1-value3" class="example-class" required="required" disabled="disabled" data-other="Other data value" > Value 3 </label> </div> </div> </div> </div>',
            $generator->generateStructure('group')
        );
    }

    public function testCanGenerateTextareaField(): void
    {
        $generator = clone $this->generator;
        $generator->registerFields(
            'group',
            [
                'field_1' => [
                    'type' => 'textarea',
                    'label' => 'Textarea field',
                    'description' => 'Textarea field description',
                    'attrs' => [
                        'class' => 'example-class',
                        'required' => 'required',
                        'disabled' => 'disabled',
                        'other' => 'Other data value',
                    ],
                ],
            ]
        );

        $generator->initializeFields();

        $this->assertEquals(
            '<div class="statik-settings-grid statik-generator" data-namespace="generator_namespace"> <div class="statik-grid-row" > <div class="statik-grid-col"> <label for="generator_namespace-field_1"> Textarea field <sup>*</sup> </label> <span class="desc">Textarea field description</span> </div> <div class="statik-grid-col input"> <div> <textarea id="generator_namespace-field_1" name="generator_namespace[field_1.value]" class="example-class" required="required" disabled="disabled" data-other="Other data value" type="text" ></textarea> </div> </div> </div> </div>',
            $generator->generateStructure('group')
        );
    }

    public function testCanGenerateSelectField(): void
    {
        $generator = clone $this->generator;
        $generator->registerFields(
            'group',
            [
                'field_1' => [
                    'type' => 'select',
                    'label' => 'Select field',
                    'description' => 'Select field description',
                    'values' => [
                        'value1' => 'Value 1',
                        'value2' => 'Value 2',
                        'value3' => 'Value 3',
                    ],
                    'attrs' => [
                        'class' => 'example-class',
                        'required' => 'required',
                        'disabled' => 'disabled',
                        'other' => 'Other data value',
                    ],
                ],
            ]
        );

        $generator->initializeFields();

        $this->assertEquals(
            '<div class="statik-settings-grid statik-generator" data-namespace="generator_namespace"> <div class="statik-grid-row" > <div class="statik-grid-col"> <label for="generator_namespace-field_1"> Select field <sup>*</sup> </label> <span class="desc">Select field description</span> </div> <div class="statik-grid-col input"> <div> <select id="generator_namespace-field_1" name="generator_namespace[field_1.value]" class="example-class" required="required" disabled="disabled" data-other="Other data value" > <option value selected hidden>Select...</option><option value="value1" >Value 1</option><option value="value2" >Value 2</option><option value="value3" >Value 3</option> </select> </div> </div> </div> </div>',
            $generator->generateStructure('group')
        );
    }
}
