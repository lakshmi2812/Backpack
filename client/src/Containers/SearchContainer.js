import React, { Component } from "react";
import { connect } from "react-redux";
import Search from "../Components/Search";
import actions from "../actions";
import { getUser } from "../actions/userActions";
import { setCurrentPouch } from "../actions/pouchActions";

import {
  InputGroup,
  Label,
  Form,
  FormGroup,
  Button,
  Dropdown,
  DropdownToggle,
  DropdownMenu
} from "reactstrap";

let search = actions.search;

class SearchContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false,
      value: 0
    };
  }

  toggleDropdown = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  };

  onSubmit = input => {
    let data = { userInput: input.value, filter: this.state.value };
    this.props.search(data);
  };

  dropdownChange = e => {
    this.setState({
      value: e.currentTarget.value
    });
  };

  render() {
    return (
      <div>
        <Search
          onSubmit={this.onSubmit}
          dropdownOpen={this.props.dropdownOpen}
          toggleDropdown={this.toggleDropdown}
          currentPouches={this.props.currentPouches}
          {...this.state}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentPouches: state.pouches
  };
};

const mapDispatchToProps = dispatch => {
  return {
    search: data => {
      dispatch(search(data));
    },
    getUser: () => {
      dispatch(getUser());
    },
    setCurrentPouch: id => {
      dispatch(setCurrentPouch({ _id: id }));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer);
