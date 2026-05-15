<?php
declare(strict_types=1);

// Bng2latlongConverter SDK base feature

class Bng2latlongConverterBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(Bng2latlongConverterContext $ctx, array $options): void {}
    public function PostConstruct(Bng2latlongConverterContext $ctx): void {}
    public function PostConstructEntity(Bng2latlongConverterContext $ctx): void {}
    public function SetData(Bng2latlongConverterContext $ctx): void {}
    public function GetData(Bng2latlongConverterContext $ctx): void {}
    public function GetMatch(Bng2latlongConverterContext $ctx): void {}
    public function SetMatch(Bng2latlongConverterContext $ctx): void {}
    public function PrePoint(Bng2latlongConverterContext $ctx): void {}
    public function PreSpec(Bng2latlongConverterContext $ctx): void {}
    public function PreRequest(Bng2latlongConverterContext $ctx): void {}
    public function PreResponse(Bng2latlongConverterContext $ctx): void {}
    public function PreResult(Bng2latlongConverterContext $ctx): void {}
    public function PreDone(Bng2latlongConverterContext $ctx): void {}
    public function PreUnexpected(Bng2latlongConverterContext $ctx): void {}
}
