<?php

namespace AppBundle\Controller;

use AppBundle\Document\Item;
use AppBundle\Document\Ingredient;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class IngredientController extends Controller
{
    /**
     * @Route("/ingredient/{id}", name="view_ingredient")
     * @Template()
     */
    public function indexAction(Request $request, $id)
    {
        $repo = $this->get('doctrine_mongodb')
            ->getManager()
            ->getRepository('AppBundle:Ingredient');

        $menu = $repo->find($id);
        return ['ingredient' => $repo->find($id)];
    }

    /**
     * @Route("/ingredient/create/{id}", name="create_ingredient")
     * @param Request $request
     * @return Response
     */
    public function createAction(Request $request, $id)
    {
        if ($request->isMethod('post')) {

            $repo = $this->get('doctrine_mongodb')
                ->getManager()
                ->getRepository('AppBundle:Item');
            $item = $repo->find($id);

            if (null != $item) {
                $dm = $this->get('doctrine_mongodb')->getManager();
                $ingredient = new Ingredient();
                $dm->persist($ingredient);
                $dm->flush();
                $ingredient->setName($request->request->get('itemName'));
                $item->addIngredient($ingredient);
                $dm->persist($item);
                $dm->flush();
                return $this->redirect($this->generateUrl('view_item',['id'=>$item->getId()]));
            }
        }

        return $this->redirect($this->generateUrl('company'));
    }

}
