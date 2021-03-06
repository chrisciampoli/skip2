<?php

namespace AppBundle\Controller;

use AppBundle\Document\Company;
use AppBundle\Document\Menu;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class MenuController extends Controller
{
    /**
     * @Route("/menu/{id}", name="view_menu")
     * @Template()
     */
    public function indexAction(Request $request, $id)
    {
        $repo = $this->get('doctrine_mongodb')
            ->getManager()
            ->getRepository('AppBundle:Menu');

        $menu = $repo->find($id);
        return ['menu' => $repo->find($id)];
    }

    /**
     * @Route("/menu/create/{id}", name="create_menu")
     * @param Request $request
     * @return Response
     */
    public function createAction(Request $request, $id)
    {
        if ($request->isMethod('post')) {

            $repo = $this->get('doctrine_mongodb')
                ->getManager()
                ->getRepository('AppBundle:Company');
            $company = $repo->find($id);

            if (null != $company) {
                $dm = $this->get('doctrine_mongodb')->getManager();
                $menu = new Menu();
                $dm->persist($menu);
                $dm->flush();
                $menu->setName($request->request->get('menuName'));
                $menus = $company->getMenus();
                $menus[] = $menu;
                $company->setMenus($menus);
                $dm->persist($company);
                $dm->flush();
                return $this->redirect($this->generateUrl('view_company',['id'=>$company->getId()]));
            }
        }

        return $this->redirect($this->generateUrl('company'));
    }

}
