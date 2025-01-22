<?php

declare(strict_types=1);

namespace Statik\Blocks\Utils;

class Path
{
    /**
     * Return relative path between two sources.
     */
    public static function relativePath(string $from, string $to, string $separator = \DIRECTORY_SEPARATOR): string
    {
        $from = \str_replace(['/', '\\'], $separator, $from);
        $to = \str_replace(['/', '\\'], $separator, $to);

        $arrayFrom = \explode($separator, \rtrim($from, $separator));
        $arrayTo = \explode($separator, \rtrim($to, $separator));

        while (\count($arrayFrom) && \count($arrayTo) && ($arrayFrom[0] == $arrayTo[0])) {
            \array_shift($arrayFrom);
            \array_shift($arrayTo);
        }

        return \str_pad('', \count($arrayFrom) * 3, '..' . $separator) . \implode($separator, $arrayTo);
    }
}
