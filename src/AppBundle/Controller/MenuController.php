<?php

namespace AppBundle\Controller;

use AppBundle\Document\Company;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class MenuController extends Controller
{
    /**
     * @Route("/menu", name="menu")
     * @Template()
     */
    public function indexAction(Request $request)
    {
        return [];
    }

}
