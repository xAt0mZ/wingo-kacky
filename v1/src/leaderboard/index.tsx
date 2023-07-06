import { includes, toLower, toPairs } from 'lodash';
import { useEffect, useMemo, useState } from 'react';
import { Button, ButtonGroup, ButtonToolbar, Col, Container, Form, InputGroup, Row, Spinner } from 'react-bootstrap';

import { VStack } from '../components/VStack';

import { getLeaderboard, LeaderboardEntry, ServerData } from './leaderboard.service';

const pageSize = 10;

export function Leaderboard() {
  const [rawLeaderboard, setLeaderboard] = useState<ServerData | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [selectedPlayer, setSelectedPlayer] = useState<LeaderboardEntry | null>(null);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    async function fetchData() {
      const res = await getLeaderboard();
      setLeaderboard(res);
      setLoading(false);
    }
    fetchData();
  }, []);

  const leaderboard = useMemo(() => rawLeaderboard?.filter((entry) => includes(toLower(entry.name), toLower(searchText))), [rawLeaderboard, searchText]);

  return (
    <VStack className="gap-3 p-0 pb-2 text-center flex-fill h-100">
      {!isLoading && leaderboard && (
        <Row>
          <span>
            Afin de respecter les ressources des serveurs de{' '}
            <a href="https://trackmania.io/" className="text-blue text-decoration-none fw-lighter">
              trackmania.io
            </a>
            , le leaderboard est mis à jour progressivement sur 15 minutes (5 maps / minute).
          </span>
          <span>La 199 est buggée, aucun finish n&apos;est disponible. Les joueurs ayant terminé la 199 ne l&apos;ont donc pas comptabilisée dans ce leaderboard.</span>
        </Row>
      )}
      <Row>
        {isLoading && (
          <Container className="justify-content-center align-items-center">
            <Spinner animation="border" role="status" className="loading-screen">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </Container>
        )}
        {!isLoading && leaderboard && (
          <ButtonToolbar>
            <InputGroup className="me-2 flex-fill">
              <Form.Control
                type="text"
                placeholder="Rechercher..."
                onChange={(e) => {
                  setSearchText(e.target.value);
                  setPage(0);
                }}
              />
            </InputGroup>
            <ButtonGroup size="sm" className="flex-fill">
              <Button variant="outline-white" className="mx-1 fw-bolder" onClick={() => setPage(0)} disabled={page === 0}>
                Début
              </Button>
              <Button variant="outline-white" className="mx-1 fw-bolder" onClick={() => setPage(page - 1)} disabled={page === 0}>
                Précédent
              </Button>
              <Button variant="white" className="mx-1 fw-bolder" disabled>
                {page + 1} / {Math.ceil(leaderboard.length / pageSize)}
              </Button>
              <Button variant="outline-white" className="mx-1 fw-bolder" onClick={() => setPage(page + 1)} disabled={page === Math.floor(leaderboard.length / pageSize)}>
                Suivant
              </Button>
              <Button
                variant="outline-white"
                className="mx-1 fw-bolder"
                onClick={() => setPage(Math.floor(leaderboard.length / pageSize))}
                disabled={page === Math.floor(leaderboard.length / pageSize)}
              >
                Fin
              </Button>
            </ButtonGroup>
          </ButtonToolbar>
        )}
      </Row>
      <Row className="flex-fill">
        <Col>
          <VStack className="gap-2 p-0 pb-2 pt-3 text-center flex-fill h-100">
            {!isLoading &&
              leaderboard &&
              leaderboard.slice(page * pageSize, page * pageSize + pageSize).map((player, idx) => (
                <Row key={idx} className="align-items-center justify-content-start">
                  <Col>{player.rank + 1}</Col>
                  <Col>{player.name}</Col>
                  <Col>{player.count}</Col>
                  <Col>
                    <Button variant="outline-white" className="mx-1 fw-lighter" onClick={() => setSelectedPlayer(player)}>
                      Terminées
                    </Button>
                  </Col>
                </Row>
              ))}
          </VStack>
        </Col>
        <Col>
          <VStack>
            {selectedPlayer && (
              <Row className="pt-3 justify-content-center align-items-center">
                <Col className="fs-5">{selectedPlayer.name}</Col>
                <Col className="fs-5">{selectedPlayer.count} / 75</Col>
                <ButtonGroup size="sm" className="pt-3 flex-fill flex-wrap">
                  {toPairs(selectedPlayer.maps).map(([mapId, finished], idx) => (
                    <Button
                      key={`${idx}-${mapId}`}
                      variant={finished ? 'outline-finished-leaderboard' : 'outline-not-finished-leaderboard'}
                      disabled
                      className="m-1 fw-bolder mw-10"
                    >
                      {mapId}
                    </Button>
                  ))}
                </ButtonGroup>
              </Row>
            )}
          </VStack>
        </Col>
      </Row>
    </VStack>
  );
}
