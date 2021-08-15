import React from 'react';
import _ from 'lodash-es';

import Container from 'react-bootstrap/Container';

import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';

import Header from './components/header'
import Filters from './components/body/Filters';
import MapsRow from './components/body/MapsRow';
import Footer from './components/footer';

import { extractMaps } from './models/map';
import API from './api';
import { ALL_DAYS, LOCALE_DATE_OPTIONS, LOCALE_LANG } from './models/filters';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.onMapSelection = this.onMapSelection.bind(this);
    this.onOrderChange = this.onOrderChange.bind(this);
    this.onFilterChange = this.onFilterChange.bind(this);

    this.state = {
      maps: [],
    };
  }

  async componentDidMount() {
    try {
      const res = await API.get();
      const maps = extractMaps(res.data);

      const finishedMaps = _.filter(maps, { finished: true });
      const orderedMaps = _.sortBy(finishedMaps, (m) => m.date.getDate());
      const dates = _.uniq(
        orderedMaps.map((m) => m.date.toLocaleDateString(LOCALE_LANG, LOCALE_DATE_OPTIONS))
      );

      const options = _.concat([ALL_DAYS], ...dates);
      this.setState({ maps, options });
    } catch (err) {
      this.setState({ err })
    }
  }

  onFilterChange(filter) {
    this.setState({ filter });
  }

  onOrderChange(orderByDate) {
    this.setState({ orderByDate });
  }

  onMapSelection(id) {
    this.setState({
      selectedMap: _.find(this.state.maps, { id: id })
    });
  }

  filterAndOrderMaps() {
    let maps = this.state.maps;
    if (this.state.orderByDate) {
      maps = _.orderBy(maps, 'date');
    }
    if (this.state.filter && this.state.filter !== ALL_DAYS) {
      maps = _.filter(maps, (m) => m.finished && m.date.toLocaleDateString(LOCALE_LANG, LOCALE_DATE_OPTIONS) === this.state.filter)
    }
    return maps;
  }

  render() {
    const selectedId = this.state.selectedMap ? this.state.selectedMap.id : 0;
    const finishedMapsCount = _.filter(this.state.maps, { finished: true }).length;
    const totalMapsCount = this.state.maps.length;
    const filteredMaps = this.filterAndOrderMaps();

    if (!this.state.maps.length && !this.state.err) {
      return (
        <Container className="d-flex justify-content-center align-items-center" style={{ width: "100vh", height: "100vh" }}>
          <LoadingSpinner></LoadingSpinner>
        </Container>
      );
    }

    if (this.state.err) {
      return (
        <Container className="d-flex align-items-center text-center" style={{ width: "100vh", height: "100vh" }}>
          <ErrorMessage />
        </Container>
      )
    }

    return (
      <Container className="vstack gap-2 p-0 pb-2 text-center" style={{ minHeight: "100vh" }}>
        <Header finished={finishedMapsCount} total={totalMapsCount} />
        <Filters options={this.state.options} onFilterChange={this.onFilterChange} onOrderChange={this.onOrderChange} />
        <MapsRow maps={filteredMaps} selectedId={selectedId} onMapSelection={this.onMapSelection} />
        <Footer selectedMap={this.state.selectedMap} />
      </Container>
    )
  }
}
