<?php
require_once 'connect.php';

class provider
{
    private string $name;
    private string $address;

    /**
     * provider constructor.
     * @param string $name
     * @param string $address
     */
    public function __construct(string $name, string $address)
    {
        $this->setName($name);
        $this->setAddress($address);
    }

    public static function getProviders(): array
    {
        $con = Connect::create();
        $qry = $con->prepare("SELECT email FROM contacts");
        $qry->execute();
        $result = $qry->get_result();
        $providers = self::format($result);
        $qry->close();
        $con->close();
        return $providers;
    }

    public static function format(object $result): array
    {
        $providers = [];
        while ($row = $result->fetch_assoc()) {
            $provider = substr($row['email'], strpos($row['email'], '@') + 1);
            $providers [$provider] = ucfirst(substr($provider, 0, strrpos($provider, '.')));
        }
        return $providers;
    }


    /**
     * @return string
     */
    public function getName(): string
    {
        return $this->name;
    }

    /**
     * @param string $name
     */
    public function setName(string $name): void
    {
        $this->name = $name;
    }

    /**
     * @return string
     */
    public function getAddress(): string
    {
        return $this->address;
    }

    /**
     * @param string $address
     */
    public function setAddress(string $address): void
    {
        $this->address = $address;
    }


}