import CompanyTable from '../components/CompanyTable';

const React = require('react');

module.exports = () => {
  React.render(<CompanyTable />, document.getElementById('companyTable'));
};
