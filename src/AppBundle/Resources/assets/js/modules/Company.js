import CompanyTable from '../components/CompanyTable';
import CompanyModal from '../components/Modal/CompanyModal';

const React = require('react');

module.exports = () => {
  var companyTable = document.getElementById('companyTable'),
      companyModal = document.getElementById('companyModal');

  if (companyTable !== null) {
    React.render(<CompanyTable />, companyTable);
  }

  if (companyModal !== null) {
    React.render(<CompanyModal />, companyModal);
  }

};
