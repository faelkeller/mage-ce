<?php
/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

/**
 * Enable, adjust and copy this code for each store you run
 *
 * Store #0, default one
 *
 * if (isHttpHost("example.com")) {
 *    $_SERVER["MAGE_RUN_CODE"] = "default";
 *    $_SERVER["MAGE_RUN_TYPE"] = "store";
 * }
 *
 * @param string $host
 * @return bool
 */
function isHttpHost(string $host)
{
    if (!isset($_SERVER['HTTP_HOST'])) {
        return false;
    }
    return $_SERVER['HTTP_HOST'] === $host;
}

/**
 *  For each Environments must have a new line
 *  with key as Host and Value as storeView Code
 */
$envHosts = [
    'luma-dev.magesimple.com.br' => 'luma',
    'luma.local.magesimple' => 'luma',
];
foreach($envHosts as $host => $code) {
    if (isHttpHost($host)) {
        $_SERVER["MAGE_RUN_CODE"] = $code;
        $_SERVER["MAGE_RUN_TYPE"] = "store";
        break;
    }
}
