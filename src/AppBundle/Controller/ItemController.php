<?php

namespace AppBundle\Controller;

use AppBundle\Document\Item;
use AppBundle\Document\Menu;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class ItemController extends Controller
{
    /**
     * @Route("/item/{id}", name="view_item")
     * @Template()
     */
    public function indexAction(Request $request, $id)
    {
        $repo = $this->get('doctrine_mongodb')
            ->getManager()
            ->getRepository('AppBundle:Item');

        $menu = $repo->find($id);
        return ['item' => $repo->find($id)];
    }

    /**
     * @Route("/item/create/{id}", name="create_item")
     * @param Request $request
     * @return Response
     */
    public function createAction(Request $request, $id)
    {
        if ($request->isMethod('post')) {

            $repo = $this->get('doctrine_mongodb')
                ->getManager()
                ->getRepository('AppBundle:Menu');
            $menu = $repo->find($id);

            if (null != $menu) {
                $dm = $this->get('doctrine_mongodb')->getManager();
                $item = new Item();
                $dm->persist($item);
                $dm->flush();
                $item->setName($request->request->get('itemName'));
                $item->setCalories($request->request->get('calories'));
                $item->setAllergen($request->request->get('allergen'));
                $menu->addItem($item);
                $dm->persist($menu);
                $dm->flush();
                return $this->redirect($this->generateUrl('view_menu',['id'=>$menu->getId()]));
            }
        }

        return $this->redirect($this->generateUrl('company'));
    }

}
