<?php
declare(strict_types=1);

// Bng2latlongConverter SDK exists test

require_once __DIR__ . '/../bng2latlongconverter_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = Bng2latlongConverterSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
