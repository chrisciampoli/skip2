<?php
namespace AppBundle\Document;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ODM\MongoDB\Mapping\Annotations as MongoDB;

/**
 * @MongoDB\Document
 */
class Menu
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
     * @MongoDB\EmbedMany(targetDocument="AppBundle\Document\Item")
     */
    protected $items = [];

    public function __construct()
    {
        $this->items = new ArrayCollection();
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
     * Add item
     *
     * @param AppBundle\Document\Item $item
     */
    public function addItem(\AppBundle\Document\Item $item)
    {
        $this->items[] = $item;
    }

    /**
     * Remove item
     *
     * @param AppBundle\Document\Item $item
     */
    public function removeItem(\AppBundle\Document\Item $item)
    {
        $this->items->removeElement($item);
    }

    /**
     * Get items
     *
     * @return \Doctrine\Common\Collections\Collection $items
     */
    public function getItems()
    {
        return $this->items;
    }
}
