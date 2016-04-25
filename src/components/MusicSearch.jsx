const React = require('react');
const MusicListing = require('./MusicListing');
const ReactCSS = require("react-addons-css-transition-group");

const MusicSearch = React.createClass({
  getInitialState: function() {
    return {searchTerm: '', results: []}
  },
  onChange: function(e) {
    this.setState({searchTerm: e.target.value});
  },
  search: function(e) {
    e.preventDefault();
    this.setState({results: []});
    fetch(`/api/search?term=${this.state.searchTerm}`)
      .then(response => {
        response.json().then(data => {
          this.setState({results: data.results});
        });
      }).catch(error => {
        this.setState({results: []});
      });
  },
  render: function() {
    const listings = this.state.results.map((listing, idx) => {
      return <MusicListing key={idx} listing={listing} />
    });

    return (
      <div>
        <h1>iTunes Search</h1>
        <form onSubmit={this.search}>
          <div className="form-group">
            <input type="text"
                   value={this.state.searchTerm}
                   onChange={this.onChange}
                   placeholder="Search for Music"
                   className="form-control" />
            </div>
          <input type="submit" className="btn btn-primary" />
        </form>
        <ReactCSS
          transitionName="listing"
          transtionEnterTimeout={500}
          transitionLeaveTimeout={500}>
          {listings}
        </ReactCSS>
      </div>
    );
  }
})

module.exports = MusicSearch;
