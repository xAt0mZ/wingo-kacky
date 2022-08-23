import { useEffect, useState } from 'react';
import { Button, ButtonGroup, Col, Row, Spinner } from 'react-bootstrap';

import { VStack } from '../components/VStack';

import { getLeaderboard, ServerData } from './leaderboard.service';

const pageSize = 10;

export function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<ServerData | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [page, setPage] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const res = await getLeaderboard();
      setLeaderboard(res);
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <VStack>
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
            <Button variant="outline-white" className="mx-1 fw-bolder" onClick={() => setPage(Math.floor(leaderboard.length / pageSize))} disabled={page === Math.floor(leaderboard.length / pageSize)}>
              Fin
            </Button>
          </ButtonGroup>
        )}
      </Row>
      {!isLoading &&
        leaderboard &&
        leaderboard.slice(page * pageSize, page * pageSize + pageSize).map((player, idx) => (
          <Row key={idx} className="flex-fill justify-content-center align-items-center">
            <Col md={{ offset: 2 }}>{page * pageSize + idx + 1}</Col>
            <Col>{player.name}</Col>
            <Col>{player.count}</Col>
            <Col md={2} />
          </Row>
        ))}
    </VStack>
  );
}
