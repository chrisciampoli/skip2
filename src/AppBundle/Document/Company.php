<?php
namespace AppBundle\Document;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ODM\MongoDB\Mapping\Annotations as MongoDB;

/**
 * @MongoDB\Document(repositoryClass="AppBundle\Repository\CompanyRepository")
 */
class Company
{
    /**
     * @MongoDB\Id
     */
    protected $id;

    /**
     * @MongoDB\String
     */
    protected $name;

    /**
     * @MongoDB\String
     */
    protected $foodType;

    /**
     * @MongoDB\String
     */
    protected $contact;

    /**
     * @MongoDB\Integer
     */
    protected $address;

    /**
     * @MongoDB\String
     */
    protected $street;

    /**
     * @MongoDB\String
     */
    protected $city;

    /**
     * @MongoDB\String
     */
    protected $state;

    /**
     * @MongoDB\String
     */
    protected $phone;

    /**
     * @return mixed
     */
    public function getPhone()
    {
        return $this->phone;
    }

    /**
     * @param mixed $phone
     */
    public function setPhone($phone)
    {
        $this->phone = $phone;
    }

    /**
     * @MongoDB\EmbedMany(targetDocument="AppBundle\Document\Menu")
     */
    protected $menus = [];

    public function __construct()
    {
        $this->menus = new ArrayCollection();
    }

    /**
     * Get id
     *
     * @return id $id
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set name
     *
     * @param string $name
     * @return self
     */
    public function setName($name)
    {
        $this->name = $name;
        return $this;
    }

    /**
     * Get name
     *
     * @return string $name
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set foodType
     *
     * @param string $foodType
     * @return self
     */
    public function setFoodType($foodType)
    {
        $this->foodType = $foodType;
        return $this;
    }

    /**
     * Get foodType
     *
     * @return string $foodType
     */
    public function getFoodType()
    {
        return $this->foodType;
    }

    /**
     * Set contact
     *
     * @param string $contact
     * @return self
     */
    public function setContact($contact)
    {
        $this->contact = $contact;
        return $this;
    }

    /**
     * Get contact
     *
     * @return string $contact
     */
    public function getContact()
    {
        return $this->contact;
    }

    /**
     * @return mixed
     */
    public function getMenus()
    {
        return $this->menus;
    }

    /**
     * @param mixed $menus
     */
    public function setMenus($menus)
    {
        $this->menus = $menus;
    }

    /**
     * Add menu
     *
     * @param AppBundle\Document\Menu $menu
     */
    public function addMenu(\AppBundle\Document\Menu $menu)
    {
        $this->menus[] = $menu;
    }

    /**
     * Remove menu
     *
     * @param AppBundle\Document\Menu $menu
     */
    public function removeMenu(\AppBundle\Document\Menu $menu)
    {
        $this->menus->removeElement($menu);
    }

    /**
     * @return mixed
     */
    public function getAddress()
    {
        return $this->address;
    }

    /**
     * @param mixed $address
     */
    public function setAddress($address)
    {
        $this->address = $address;
    }

    /**
     * @return mixed
     */
    public function getStreet()
    {
        return $this->street;
    }

    /**
     * @param mixed $street
     */
    public function setStreet($street)
    {
        $this->street = $street;
    }

    /**
     * @return mixed
     */
    public function getCity()
    {
        return $this->city;
    }

    /**
     * @param mixed $city
     */
    public function setCity($city)
    {
        $this->city = $city;
    }

    /**
     * @return mixed
     */
    public function getState()
    {
        return $this->state;
    }

    /**
     * @param mixed $state
     */
    public function setState($state)
    {
        $this->state = $state;
    }
}
