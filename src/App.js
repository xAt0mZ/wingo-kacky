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
import { ALL_DAYS } from './models/filters';

const ErrorScreen = () =>
  <Container className="d-flex align-items-center text-center" style={{ width: "100vh", height: "100vh" }}>
    <ErrorMessage />
  </Container>

const LoadingScreen = () =>
  <Container className="d-flex justify-content-center align-items-center" style={{ width: "100vh", height: "100vh" }}>
    <LoadingSpinner></LoadingSpinner>
  </Container>

function extractOptions(groupedMaps) {
  const options = {};

  for (const streamer in groupedMaps) {
    const maps = groupedMaps[streamer];
    const dates = _.chain(maps)
      .filter({ finished: true })
      .sortBy('date.date')
      .map('date.localeDateString')
      .uniq();
    options[streamer] = _.concat([ALL_DAYS], ...dates);
  }
  return options;
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.onMapSelection = this.onMapSelection.bind(this);
    this.onOrderChange = this.onOrderChange.bind(this);
    this.onDateChange = this.onDateChange.bind(this);

    this.state = {};
  }

  async componentDidMount() {
    try {
      const res = await API.get();
      const allMaps = extractMaps(res.data);

      const maps = _.groupBy(allMaps, 'streamer');
      const options = extractOptions(maps);
      const streamers = Object.keys(maps);
      const selectedStreamer = streamers[0];

      //TODO: fetch filters from localstorage
      this.setState({
        maps,
        options,
        streamers,
        selectedStreamer
      });
    } catch (err) {
      this.setState({ err })
    }
  }

  onStreamerChange(selectedStreamer) {
    const options = this.state.options[selectedStreamer];
    const selectedDate = _.includes(options, this.state.selectedDate) ? this.state.selectedDate : ALL_DAYS;

    this.setState({
      selectedMapId: 0,
      selectedStreamer,
      options,
      selectedDate
    });
  }

  onDateChange(selectedDate) {
    this.setState({ selectedDate });
  }

  onOrderChange(orderByDate) {
    this.setState({ orderByDate });
  }

  onMapSelection(selectedMapId) {
    this.setState({ selectedMapId });
  }

  filterAndOrderMaps() {
    const allMaps = this.state.maps[this.state.selectedStreamer] || [];
    let filteredMaps = allMaps;

    if (this.state.orderByDate) {
      filteredMaps = _.orderBy(filteredMaps, 'date.date');
    }
    if (this.state.selectedDate && this.state.selectedDate !== ALL_DAYS) {
      filteredMaps = _.filter(filteredMaps, (m) => m.finished && m.date.localeDateString === this.state.selectedDate)
    }
    return [allMaps, filteredMaps];
  }

  render() {
    if (this.state.err) {
      return <ErrorScreen />
    }

    if (_.isEmpty(this.state.maps)) {
      return <LoadingScreen />
    }

    const [allMaps, filteredMaps] = this.filterAndOrderMaps();

    const finishedMapsCount = _.filter(allMaps, { finished: true }).length;
    const totalMapsCount = allMaps.length;

    const selectedMapId = this.state.selectedMapId;

    const selectedMap = _.find(allMaps, { id: selectedMapId });
    const options = this.state.options[this.state.selectedStreamer];

    return (
      <Container className="vstack gap-2 p-0 pb-2 text-center" style={{ minHeight: "100vh" }}>
        <Header finished={finishedMapsCount} total={totalMapsCount} />
        <Filters options={options} onDateChange={this.onDateChange} onOrderChange={this.onOrderChange} />
        <MapsRow maps={filteredMaps} selectedId={selectedMapId} onMapSelection={this.onMapSelection} />
        <Footer selectedMap={selectedMap} />
      </Container>
    )
  }
}
