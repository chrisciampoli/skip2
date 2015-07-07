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
            $company->setName($request->request->get('companyName'));
            $company->setFoodType($request->request->get('foodType'));
            $company->setContact($request->request->get('contact'));
            $company->setAddress($request->request->get('address'));
            $company->setStreet($request->request->get('street'));
            $company->setCity($request->request->get('city'));
            $company->setState($request->request->get('state'));
            $company->setPhone($request->request->get('phone'));
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

        $company = $repo->find($id);
        return ['company' => $repo->find($id)];
    }

    public function deleteAction(Request $request, $id)
    {

    }

    public function updateAction(Request $request, $id)
    {

    }
}