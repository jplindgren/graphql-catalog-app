import React, { Component } from 'react';
import { Dropdown, Grid } from 'semantic-ui-react';

class DropdownSearch extends Component {
  constructor() {
    super();
    console.log(this.props);
    const { items = [] } = this.props;
    //   {
    //       "key": "Benedict Reinger",
    //           "text": "Benedict Reinger",
    //               "value": "benedict_reinger"
    //   },
    this.state = {
      isFetching: false,
      searchQuery: null,
      value: [],
      options: items,
    };
  }

  handleChange = (e, { value }) => this.setState({ value });

  handleSearchChange = (e, { searchQuery }) => this.setState({ searchQuery });

  render() {
    const { options, isFetching, value } = this.state;

    return (
      <Grid>
        <Grid.Column width={8}>
          <Dropdown
            fluid
            selection
            multiple
            search
            options={options}
            value={value}
            placeholder="Add Tags"
            onChange={this.handleChange}
            onSearchChange={this.handleSearchChange}
            disabled={isFetching}
            loading={isFetching}
          />
        </Grid.Column>
      </Grid>
    );
  }
}

export default DropdownSearch;
