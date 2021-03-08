<?php
require_once 'connect.php';

class contact
{
    private int $id;
    private string $email = '';
    private int $status;
    private string $date;

    /**
     * contact constructor.
     * @param string $email
     */
    public function __construct(string $email)
    {
        $this->setEmail($email);
    }

    /**
     * @param bool $result
     * @return array
     */
    public static function format(object $result): array
    {
        $contacts = [];
        $cr = 0;
        while ($row = $result->fetch_assoc()) {
            $contacts[$cr]['id'] = $row['id'];
            $contacts[$cr]['email'] = $row['email'];
            $contacts[$cr]['status'] = $row['status'];
            $contacts[$cr]['date'] = $row['date'];
            $cr++;
        }
        return $contacts;
    }

    public function save(): int
    {
        $con = Connect::create();
        $qry = $con->prepare('INSERT INTO contacts (email) VALUES (?)');
        $qry->bind_param('s', $this->email);
        if ($qry->execute()) {
            $qry->close();
            $con->close();
            return 1; //responseCode
        } else {
            return 10; //responseCode
        }
    }

    public static function delete($id): bool
    {
        $con = Connect::create();
        $qry = $con->prepare('DELETE FROM contacts WHERE id=?');
        $qry->bind_param('i', $id);
        if ($qry->execute()) {
            $qry->close();
            $con->close();
            return true;
        } else {
            return false;
        }
    }

    public static function getContactsByIds(object $request): ?array
    {
        $con = Connect::create();
        $placeholders = str_repeat('?,', count($request->ids) - 1) . '?';
        $qry = $con->prepare('SELECT * FROM contacts WHERE id IN (' . $placeholders . ')');
        $type = str_repeat('i', count($request->ids));
        $qry->bind_param($type, ...$request->ids);
        $qry->execute();
        $result = $qry->get_result();
        $contacts = self::format($result);
        $qry->close();
        $con->close();
        return $contacts;
    }

    public static function getContactsByFilters(string $filter, string $search): ?array
    {
        $con = Connect::create();
        $qry = $con->prepare('SELECT * FROM contacts WHERE email LIKE ? AND email LIKE ?');
        $filter = '%' . $filter;
        $search = '%' . $search . '%';
        $qry->bind_param('ss', $filter, $search);
        $qry->execute();
        $result = $qry->get_result();
        $contacts = self::format($result);
        $qry->close();
        $con->close();
        return $contacts;
    }

    public static function sort(array $contacts, string $sortOrder, string $sortAttribute): array
    {
        if ($sortAttribute === 'name') {
            $sortAttribute = 'email';
        } else {
            $sortAttribute = 'date';
        }
        if ($sortOrder === 'DESC') {
            usort($contacts, function ($a, $b) use ($sortAttribute) {
                return $b[$sortAttribute] <=> $a[$sortAttribute];
            });
        } else {
            usort($contacts, function ($a, $b) use ($sortAttribute) {
                return $a[$sortAttribute] <=> $b[$sortAttribute];
            });
        }
        return $contacts;
    }

    public static function paginate(array $contacts, int $pagination): array
    {
        $paginatedContacts = [];
        if ($pagination > 0) {
            $cp = 1;
            $cr = 1;
            foreach ($contacts as $contact) {
                $paginatedContacts[$cp][] = $contact;
                if ($cr++ % $pagination == 0) {
                    $cp++;
                }
            }
        }
        return $paginatedContacts;
    }

    /**
     * @return int
     */
    public function getId(): int
    {
        return $this->id;
    }


    /**
     * @return string
     */
    public function getEmail(): string
    {
        return $this->email;
    }

    /**
     * @param string $email
     */
    public function setEmail(string $email): void
    {
        $this->email = $email;
    }

    /**
     * @return int
     */
    public function getStatus(): int
    {
        return $this->status;
    }

    /**
     * @param int $status
     */
    public function setStatus(int $status): void
    {
        $this->status = $status;
    }

    /**
     * @return string
     */
    public function getDate(): string
    {
        return $this->date;
    }


}