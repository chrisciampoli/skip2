import { Component } from 'react-class-helper';

const React = require('react');

class CompanyTable extends Component {
    constructor(props) {
        super(props);
        this.state =  {
            active: this.props.active,
            included: this.props.included
        };
    }

    render() {
        return (
          <div className="starter-template">
              <h1>Companies</h1>
              <div className="bs-example" data-example-id="bordered-table">
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

                      </tbody>
                  </table>
              </div>
          </div>
        );
    }
}

module.exports = CompanyTable;
