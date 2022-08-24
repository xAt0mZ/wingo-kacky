import { toPairs } from 'lodash';
import { useEffect, useState } from 'react';
import { Button, ButtonGroup, Col, Row, Spinner } from 'react-bootstrap';

import { VStack } from '../components/VStack';

import { getLeaderboard, LeaderboardEntry, ServerData } from './leaderboard.service';

const pageSize = 10;

export function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<ServerData | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [selectedPlayer, setSelectedPlayer] = useState<LeaderboardEntry | null>(null);

  useEffect(() => {
    async function fetchData() {
      const res = await getLeaderboard();
      setLeaderboard(res);
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <VStack className="gap-3 p-0 pb-2 text-center flex-fill h-100">
      {!isLoading && leaderboard && (
        <Row>
          <span>
            Afin de respecter les ressources des serveurs de{' '}
            <a href="https://trackmania.io/" className="text-info text-decoration-none fw-lighter">
              trackmania.io
            </a>
            , le leaderboard est mis à jour progressivement sur 15 minutes (5 maps / minute).
          </span>
        </Row>
      )}
      <Row>
        {isLoading && (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}
        {!isLoading && leaderboard && (
          <ButtonGroup size="sm" className="btn-group-justified flex-fill">
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
        )}
      </Row>
      <Row className="flex-fill">
        <div className="hstack gap-2">
          <VStack>
            {!isLoading &&
              leaderboard &&
              leaderboard.slice(page * pageSize, page * pageSize + pageSize).map((player, idx) => (
                <Row key={idx} className="flex-fill justify-content-center align-items-center">
                  <Col>{page * pageSize + idx + 1}</Col>
                  <Col>{player.name}</Col>
                  <Col>{player.count}</Col>
                  <Col>
                    <Button variant="outline-white" className="mx-1 fw-bolder" onClick={() => setSelectedPlayer(player)}>
                      Terminées
                    </Button>
                  </Col>
                </Row>
              ))}
          </VStack>
          <VStack>
            {selectedPlayer && (
              <Row className="pt-3 justify-content-center align-items-center">
                <Col>{selectedPlayer.name}</Col>
                <Col>{selectedPlayer.count} / 75</Col>
                <ButtonGroup size="sm" className="pt-3 btn-group-justified flex-fill flex-wrap btn-group-leaderboard">
                  {toPairs(selectedPlayer.maps).map(([mapId, finished], idx) => (
                    <Button key={`${idx}-${mapId}`} variant={finished ? 'outline-finished' : 'outline-not-finished'} disabled className="m-1 fw-bolder w-10">
                      {mapId}
                    </Button>
                  ))}
                </ButtonGroup>
              </Row>
            )}
          </VStack>
        </div>
      </Row>
    </VStack>
  );
}
