<?php
namespace AppBundle\Document;

use Doctrine\ODM\MongoDB\Mapping\Annotations as MongoDB;

/**
 * @MongoDB\Document()
 */
class Item
{
   /**
    * @MongoDB\Id
    */
    protected $id;
    protected $name;
    protected $ingredients;
}
