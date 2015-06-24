import { Component } from 'react-class-helper';

const React = require('react');

class CompanyModal extends Component {
    constructor(props) {
        super(props);
        this.state =  {
            company: skip.data.get('company')
        };
    }

    render() {
        return (
            <div className="modal fade" id="menuModal" role="dialog" aria-labelledby="myModalLabel">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 className="modal-title" id="myModalLabel">Add Menu</h4>
                        </div>
                        <div className="modal-body">
                          <form method="post" action="/company/create">
                            <div className="form-group">
                              <label htmlFor="companyName">Company Name:</label>
                              <input className="form-control" name="companyName" id="companyName" type="text" placeholder="Subway"/>
                            </div>
                            <div className="form-group">
                              <label htmlFor="companyName">Food Type:</label>
                              <input className="form-control" name="foodType" id="foodType" type="text" placeholder="Sandwhiches"/>
                            </div>
                            <div className="form-group">
                              <label htmlFor="companyName">Contact:</label>
                              <input className="form-control" name="contact" id="contact" type="text" placeholder="http://www.subway.com"/>
                            </div>
                            <button type="submit" class="btn btn-default">Submit</button>
                          </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

module.exports = CompanyModal;
