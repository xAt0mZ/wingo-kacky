import React from 'react';
import _ from 'lodash-es';

import Container from 'react-bootstrap/Container';

import LoadingSpinner from './components/LoadingSpinner';
import Header from './components/header'
import MapsRow from './components/body/MapsRow';
import Footer from './components/footer';

import { extractMaps } from './models/map';
import axios from 'axios';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.onMapSelection = this.onMapSelection.bind(this);

    this.state = {
      maps: [],
      selectedMap: undefined,
    };
  }

  async fetchData() {
    try {
      const baseURL = 'https://sheets.googleapis.com/v4/spreadsheets/1Yqkhv4ayhwFkV39W0W7GLt1FnpHLUUXtpgGvRklnDnI/values:batchGet';
      const key = `key=${process.env.REACT_APP_GOOGLE_API_KEY}`;
      const ranges = 'ranges=WINGO!A2:F33&ranges=WINGO!G2:L33&ranges=WINGO!M2:R12';
      const options = 'valueRenderOption=FORMULA&dateTimeRenderOption=FORMATTED_STRING'
      const url = `${baseURL}?${key}&${ranges}&${options}`;
      const res = await axios.get(url);
      const maps = extractMaps(res.data);

      this.setState({ maps })
    } catch (err) {
      console.log(err)
    }
  }

  componentDidMount() {
    this.fetchData();
  }

  onMapSelection(id) {
    this.setState({
      selectedMap: _.find(this.state.maps, { id: id })
    });
  }

  render() {
    const selectedId = this.state.selectedMap ? this.state.selectedMap.id : 0;
    const finishedMapsCount = _.filter(this.state.maps, { finished: true }).length;
    const totalMapsCount = this.state.maps.length;

    if (!this.state.maps.length) {
      return (
        <Container className="d-flex justify-content-center align-items-center" style={{ width: "100vh", height: "100vh" }}>
          <LoadingSpinner></LoadingSpinner>
        </Container>
      );
    }

    return (
      <Container className="vstack gap-2 m-auto text-center " style={{ minHeight: "100vh" }}>
        <Header finished={finishedMapsCount} total={totalMapsCount} />

        <MapsRow
          rows={5}
          cols={15}
          maps={this.state.maps}
          selectedId={selectedId}
          onMapSelection={this.onMapSelection} />

        <Footer selectedMap={this.state.selectedMap} />
      </Container>
    )
  }
}
