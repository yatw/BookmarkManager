import React, { Component } from 'react';
import InsertModal from '../Modals/insertModal';
import PropTypes from 'prop-types';


class Nav extends Component {
  constructor() {
    super();
    this.state = {
      linksTotal : 0,
      categoryTotal : 0,
      insertModalShown: false
    };
  }
  
  componentWillReceiveProps(newprops) {
    
    fetch('/getLinksCount')
      .then(res => res.json())
      .then(res => this.setState({
        
        linksTotal: res[0].count,
        categoryTotal: 3
      
      
      }, () => console.log('LinksCount fetched...', res)));
  }

  componentDidMount() {
    fetch('/getLinksCount')
      .then(res => res.json())
      .then(res => this.setState({
        
        linksTotal: res[0].count,
        categoryTotal: 3
      
      
      }, () => console.log('LinksCount fetched...', res)));

  }

  handleInsertLink = (urlInput, titleInput, descInput) => {
    
    fetch("/insertLink", {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({title : titleInput, url : urlInput, detail : descInput})
    }).then(
      
      this.setState({insertModalShown:false}),
      this.props.updateTable() // table component need update after the insert

    )
    .catch((error) => {
      console.log(error);
    });
    

  }

  handleOpen = () => {
    this.setState({insertModalShown:true});
  }

  handleClose = () => {
    this.setState({insertModalShown: false});
  }

  render() {
    return (  

    <div className="sticky-top">

        <div className="banner">
            <p className="center">Information storage, embededd as links</p>
        </div> 

        <nav className="navbar navbar-expand-lg">

            
            <a className="navbar-brand" style={{cursor: 'pointer'}} onClick={() => window.open('https://github.com/yatw/Bookmark')}>
                <img src="images/logo.jpg" width="60" height="60" alt=""/>
            </a>
            
            <button className="navbar-toggler" type="button">
              <span className="navbar-toggler-icon"></span>
            </button>

            <span className="navbar-text ml-3">
            Stored {this.state.linksTotal} entries in {this.state.categoryTotal} categories
            </span>
            
            <form className="row ml-5">
                <input type="text" className="form-control search-query bar-size" placeholder="Search" id="searchBox"/>
                <button className="btn btn-success my-2 ml-sm-2 my-sm-0" type="submit">Search</button>
            </form>
            
            <button type="button" className="btn btn-outline-primary ml-5 mx-auto" onClick={this.handleOpen}>Add a new entry</button>
            
            <div className="navbar-nav">
                <a className="nav-item nav-link active" href="#">Home <span className="sr-only">(current)</span></a>
                <a className="nav-item nav-link" href="#">About</a>
                <a className="nav-item nav-link" href="#">Pricing</a>
                <a className="nav-item nav-link disabled" href="#">Disabled</a>
            </div>
        </nav>

        <InsertModal isShown={this.state.insertModalShown} handleInsertLink={this.handleInsertLink} handleClose={this.handleClose}/>
      </div>  

    );
  }
}

// PropTypes
Nav.propTypes = {
  updateTable: PropTypes.func.isRequired,
  needUpdate: PropTypes.bool.isRequired

}


export default Nav;