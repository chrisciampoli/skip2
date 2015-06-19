<?php
namespace AppBundle\Controller;

use AppBundle\Document\Company;
use AppBundle\Document\Ingredient;
use AppBundle\Document\Item;
use AppBundle\Document\Menu;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class CompanyController extends Controller
{
    /**
     * @Route("/company", name="company")
     * @Template()
     */
    public function indexAction()
    {
        $repo = $this->get('doctrine_mongodb')
            ->getManager()
            ->getRepository('AppBundle:Company');

        return [ 'companies' => $repo->findAll() ];
    }

    /**
     * @Route("/company/create", name="create_company")
     * @param Request $request
     * @return Response
     */
    public function createAction(Request $request)
    {
        if ($request->isMethod('post')) {
            $dm = $this->get('doctrine_mongodb')->getManager();
            $company = new Company();

            $menu = new Menu();
            $menu->setName('main');
            $hamburger = new Item();
            $hamburger->setName('Hamburger');
            $patty = new Ingredient();
            $patty->setName('beef patty');
            $hamburger->addIngredient($patty);
            $menu->addItem($hamburger);
            $company->addMenu($menu);
            $company->setName($request->request->get('companyName'));
            $company->setFoodType($request->request->get('foodType'));
            $company->setContact($request->request->get('contact'));

            $dm->persist($company);
            $dm->flush();
        }

        return $this->redirect($this->generateUrl('company'));
    }

    /**
     * @Route("/company/{id}", name="view_company")
     * @Template()
     * @param Request $request
     * @param $id
     */
    public function viewAction(Request $request, $id)
    {
        $repo = $this->get('doctrine_mongodb')
            ->getManager()
            ->getRepository('AppBundle:Company');

        return ['company' => $repo->find($id)];
    }

    public function deleteAction(Request $request, $id)
    {

    }

    public function updateAction(Request $request, $id)
    {

    }
}