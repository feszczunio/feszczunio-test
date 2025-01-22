<?php

declare(strict_types=1);

/**
 * @param mixed $text
 *
 * @return mixed
 */
function esc_html($text)
{
    return $text;
}

/**
 * @param mixed $text
 *
 * @return mixed
 */
function esc_attr($text)
{
    return $text;
}

function add_action(): void
{
}

/**
 * @param mixed $text
 *
 * @return mixed
 */
function __($text)
{
    return $text;
}

/**
 * @param mixed $selected
 * @param bool  $current
 * @param bool  $echo
 *
 * @return string
 */
function selected($selected, $current = true, $echo = true)
{
    if ((string) $selected === (string) $current) {
        $result = ' selected="selected"';
    } else {
        $result = '';
    }

    if ($echo) {
        echo $result;
    }

    return $result;
}

/**
 * @param mixed $selected
 * @param bool  $current
 * @param bool  $echo
 * @param mixed $checked
 *
 * @return string
 */
function checked($checked, $current = true, $echo = true)
{
    if ((string) $checked === (string) $current) {
        $result = ' checked="checked"';
    } else {
        $result = '';
    }

    if ($echo) {
        echo $result;
    }

    return $result;
}

/**
 * @param mixed $disabled
 * @param bool  $current
 * @param bool  $echo
 *
 * @return string
 */
function disabled($disabled, $current = true, $echo = true)
{
    if ((string) $disabled === (string) $current) {
        $result = ' disabled="disabled"';
    } else {
        $result = '';
    }

    if ($echo) {
        echo $result;
    }

    return $result;
}
