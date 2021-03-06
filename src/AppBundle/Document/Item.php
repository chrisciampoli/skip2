<?php
namespace AppBundle\Document;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ODM\MongoDB\Mapping\Annotations as MongoDB;

/**
 * @MongoDB\Document
 */
class Item
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
    protected $allergen;

    /**
     * @MongoDB\String
     */
    protected $calories;

    /**
     * @MongoDB\EmbedMany(targetDocument="AppBundle\Document\Ingredient")
     */
    protected $ingredients = [];

    public function __construct()
    {
        $this->ingredients = new ArrayCollection();
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
     * Add ingredient
     *
     * @param AppBundle\Document\Ingredient $ingredient
     */
    public function addIngredient(\AppBundle\Document\Ingredient $ingredient)
    {
        $this->ingredients[] = $ingredient;
    }

    /**
     * Remove ingredient
     *
     * @param AppBundle\Document\Ingredient $ingredient
     */
    public function removeIngredient(\AppBundle\Document\Ingredient $ingredient)
    {
        $this->ingredients->removeElement($ingredient);
    }

    /**
     * Get ingredients
     *
     * @return \Doctrine\Common\Collections\Collection $ingredients
     */
    public function getIngredients()
    {
        return $this->ingredients;
    }

    /**
     * @return mixed
     */
    public function getAllergen()
    {
        return $this->allergen;
    }

    /**
     * @param mixed $allergen
     */
    public function setAllergen($allergen)
    {
        $this->allergen = $allergen;
    }

    /**
     * @return mixed
     */
    public function getCalories()
    {
        return $this->calories;
    }

    /**
     * @param mixed $calories
     */
    public function setCalories($calories)
    {
        $this->calories = $calories;
    }
}
