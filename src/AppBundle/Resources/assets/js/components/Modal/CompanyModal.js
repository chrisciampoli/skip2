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
                          <form>
                            <div className="form-group">
                              <label htmlFor="companyName">Company Name:</label>
                              <input className="form-control" name="companyName" type="text" placeholder="Subway"/>
                            </div>
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
