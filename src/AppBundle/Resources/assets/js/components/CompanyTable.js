import { Component } from 'react-class-helper';

const React = require('react');

class CompanyTable extends Component {
    constructor(props) {
        super(props);
        this.state =  {
            companies: skip.data.get('companies')
        };
    }

    render() {
      var rows = $.map(this.state.companies, (item, index) => {
          var url = '/company/'+item.id+'';
          return (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.food_type}</td>
              <td>{item.contact}</td>
              <td><a href={url}>View</a></td>
            </tr>
          );
        });

        return (
          <div className="template">
              <h1>Companies</h1>
              <div className="companyForm" data-example-id="bordered-table">
                  <button type="button" className="btn pull-right btn-primary btn-sm" data-toggle="modal" data-target="#menuModal">
                      Add Company
                  </button>
                  <table className="table table-bordered">
                      <thead>
                      <tr>
                          <th>Company Name</th>
                          <th>Food Type</th>
                          <th>Contact</th>
                          <th>Controls</th>
                      </tr>
                      </thead>
                      <tbody>
                        {rows}
                      </tbody>
                  </table>
              </div>
          </div>
        );
    }
}

module.exports = CompanyTable;
